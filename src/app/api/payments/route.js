import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

export async function POST(req) {
  try {
    const body = await req.json();

    const midtrans = new midtransClient.Snap({
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
    });

    const transactionData = {
      transaction_details: {
        order_id: body.order_id,
        gross_amount: body.gross_amount,
      },
      item_details: body.items || [],
      customer_details: {
        email: body.customer_details?.email || "user@tokov.id",
        name: body.customer_details?.name || "User TOKOV",
      },
      custom_field1: body.metadata?.lokasi_tanam || "",
      custom_field2: body.metadata?.user_email || "",
    };

    const transaction = await midtrans.createTransaction(transactionData);

    return NextResponse.json({ token: transaction.token }, { status: 200 });
  } catch (error) {
    console.error("⚠️ MIDTRANS ERROR:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
