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
      customer_details: {
        email: body.email,
        name: body.user_name || "User Refroresta",
      },
    };

    const token = await midtrans.createTransaction(transactionData);

    return NextResponse.json({ token: token.token }, { status: 200 });
  } catch (error) {
    console.error("⚠️ MIDTRANS ERROR:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
