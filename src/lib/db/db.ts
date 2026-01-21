import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const dbDir = join(process.cwd(), "src", "lib", "db");
const ordersFile = join(dbDir, "orders.json");

// Ensure directory exists (only at runtime, not during build)
function ensureDbDir() {
    try {
        if (!existsSync(dbDir)) {
            mkdirSync(dbDir, { recursive: true });
        }
    } catch (error) {
        // Ignore errors during build time
        console.error("Failed to create db directory:", error);
    }
}

type Order = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    pinCode: string;
    subtotal: number;
    shipping: number;
    total: number;
    createdAt: string;
    items: Array<{
        productId: string;
        productName: string;
        size: string;
        color: string;
        price: number;
        quantity: number;
    }>;
};

type OrdersDatabase = {
    orders: Order[];
    nextId: number;
};

function loadDatabase(): OrdersDatabase {
    if (!existsSync(ordersFile)) {
        return { orders: [], nextId: 1 };
    }
    const data = readFileSync(ordersFile, "utf-8");
    return JSON.parse(data);
}

function saveDatabase(db: OrdersDatabase) {
    ensureDbDir();
    writeFileSync(ordersFile, JSON.stringify(db, null, 2));
}

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

export function createOrder(orderData: OrderData): number {
    const db = loadDatabase();

    const order: Order = {
        id: db.nextId,
        ...orderData,
        createdAt: new Date().toISOString(),
    };

    db.orders.push(order);
    db.nextId++;

    saveDatabase(db);

    return order.id;
}

export function getOrder(orderId: number): Order | null {
    const db = loadDatabase();
    return db.orders.find((o) => o.id === orderId) || null;
}

export function getAllOrders(): Order[] {
    const db = loadDatabase();
    return db.orders;
}
