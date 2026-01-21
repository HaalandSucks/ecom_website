import { sql } from "@vercel/postgres";

export type OrderData = {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    pinCode: string;
    subtotal: number;
    shipping: number;
    total: number;
    items: Array<{
        productId: string;
        productName: string;
        size: string;
        color: string;
        price: number;
        quantity: number;
    }>;
};

export type Order = OrderData & {
    id: number;
    createdAt: string;
};

/**
 * Create a new order in the database
 * @param orderData Order information
 * @returns The ID of the created order
 */
export async function createOrder(orderData: OrderData): Promise<number> {
    const result = await sql`
        INSERT INTO orders (
            first_name, 
            last_name, 
            email, 
            address, 
            city, 
            pin_code, 
            subtotal, 
            shipping, 
            total, 
            items
        )
        VALUES (
            ${orderData.firstName},
            ${orderData.lastName},
            ${orderData.email},
            ${orderData.address},
            ${orderData.city},
            ${orderData.pinCode},
            ${orderData.subtotal},
            ${orderData.shipping},
            ${orderData.total},
            ${JSON.stringify(orderData.items)}::jsonb
        )
        RETURNING id
    `;

    return result.rows[0].id;
}

/**
 * Get an order by ID
 * @param orderId Order ID
 * @returns Order object or null if not found
 */
export async function getOrder(orderId: number): Promise<Order | null> {
    const result = await sql`
        SELECT 
            id,
            first_name as "firstName",
            last_name as "lastName",
            email,
            address,
            city,
            pin_code as "pinCode",
            subtotal,
            shipping,
            total,
            items,
            created_at as "createdAt"
        FROM orders
        WHERE id = ${orderId}
    `;

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows[0];
    return {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        address: row.address,
        city: row.city,
        pinCode: row.pinCode,
        subtotal: row.subtotal,
        shipping: row.shipping,
        total: row.total,
        items: row.items,
        createdAt: row.createdAt.toISOString(),
    };
}

/**
 * Get all orders (for admin purposes)
 * @returns Array of all orders
 */
export async function getAllOrders(): Promise<Order[]> {
    const result = await sql`
        SELECT 
            id,
            first_name as "firstName",
            last_name as "lastName",
            email,
            address,
            city,
            pin_code as "pinCode",
            subtotal,
            shipping,
            total,
            items,
            created_at as "createdAt"
        FROM orders
        ORDER BY created_at DESC
    `;

    return result.rows.map((row) => ({
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        address: row.address,
        city: row.city,
        pinCode: row.pinCode,
        subtotal: row.subtotal,
        shipping: row.shipping,
        total: row.total,
        items: row.items,
        createdAt: row.createdAt.toISOString(),
    }));
}
