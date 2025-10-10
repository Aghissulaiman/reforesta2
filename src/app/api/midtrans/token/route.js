import midtransClient from "midtrans-client";

export async function POST(req) {
  try {
    const body = await req.json();

    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const parameter = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}`, // unik setiap transaksi
        gross_amount: body.total, // total harga
      },
      customer_details: {
        email: body.email,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    return new Response(
      JSON.stringify({ snapToken: transaction.token }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Gagal buat token:", err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
