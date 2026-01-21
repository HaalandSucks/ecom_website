import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data, error } = await supabase
      .from("orders")
      .insert({
        items: body.items,
        total: body.total,
      })
      .select()
      .single();

    if (error) {
      console.error(error);
      throw error;
    }

    return NextResponse.json({
      success: true,
      order: data,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Order creation failed" },
      { status: 500 }
    );
  }
}
