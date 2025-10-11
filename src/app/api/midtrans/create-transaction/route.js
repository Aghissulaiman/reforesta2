import { NextResponse } from "next/server";
import midtransClient from "midtrans-client";

export async function POST(req) {
  try {
    const body = await req.json();
    const { order_id, gross_amount, customer_name, email } = body;

    // 🔹 Pastikan key di .env
    const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;
    const MIDTRANS_CLIENT_KEY = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    if (!MIDTRANS_SERVER_KEY || !MIDTRANS_CLIENT_KEY) {
      return NextResponse.json({ error: "Midtrans key not found" }, { status: 500 });
    }

    // 🔹 Inisialisasi Snap
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
      clientKey: MIDTRANS_CLIENT_KEY,
    });

    // 🔹 Data transaksi
    const parameter = {
      transaction_details: {
        order_id,
        gross_amount,
      },
      customer_details: {
        first_name: customer_name,
        email,
      },
    };

    // 🔹 Request token
    const transaction = await snap.createTransaction(parameter);

    if (!transaction?.token) {
      return NextResponse.json({ error: "Failed to get token" }, { status: 500 });
    }

    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    console.error("MIDTRANS ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Transaction failed" },
      { status: 500 }
    );
  }
}
