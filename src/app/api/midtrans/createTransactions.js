import midtransClient from "midtrans-client";

export async function POST(req) {
  const body = await req.json();
  const { planName, amount } = body;

  const snap = new midtransClient.Snap({
    isProduction: false, // ganti true kalau udah live
    serverKey: process.env.MIDTRANS_SERVER_KEY,
  });

  const parameter = {
    transaction_details: {
      order_id: `ORDER-${Date.now()}`,
      gross_amount: amount,
    },
    item_details: [
      {
        id: planName,
        price: amount,
        quantity: 1,
        name: planName,
      },
    ],
    customer_details: {
      email: "user@example.com", // bisa ambil dari localStorage/session
    },
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    return Response.json({ token: transaction.token });
  } catch (error) {
    console.error("Midtrans error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
