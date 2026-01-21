import { NextRequest, NextResponse } from "next/server";
import { createOrder, type OrderData } from "@/lib/db/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (
            !body.firstName ||
            !body.lastName ||
            !body.email ||
            !body.address ||
            !body.city ||
            !body.pinCode ||
            typeof body.subtotal !== "number" ||
            typeof body.shipping !== "number" ||
            typeof body.total !== "number" ||
            !Array.isArray(body.items) ||
            body.items.length === 0
        ) {
            return NextResponse.json(
                { error: "Missing or invalid required fields" },
                { status: 400 }
            );
        }

        // Validate items
        for (const item of body.items) {
            if (
                !item.productId ||
                !item.productName ||
                !item.size ||
                !item.color ||
                typeof item.price !== "number" ||
                typeof item.quantity !== "number"
            ) {
                return NextResponse.json(
                    { error: "Invalid item data" },
                    { status: 400 }
                );
            }
        }

        const orderData: OrderData = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            address: body.address,
            city: body.city,
            pinCode: body.pinCode,
            subtotal: body.subtotal,
            shipping: body.shipping,
            total: body.total,
            items: body.items,
        };

        const orderId = createOrder(orderData);

        return NextResponse.json(
            { success: true, orderId },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
