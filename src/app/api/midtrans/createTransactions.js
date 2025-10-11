import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function POST(req) {
  try {
    const { order_id, amount, name, plan } = await req.json();

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id,
        gross_amount: amount,
      },
      customer_details: {
        first_name: name,
        email: name,
      },
      item_details: [
        {
          id: plan,
          price: amount,
          quantity: 1,
          name: plan,
        },
      ],
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
