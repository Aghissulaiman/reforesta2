import midtransClient from "midtrans-client";

export async function POST(req) {
  try {
    const body = await req.json();

    // ✅ Validasi umum
    if (!body.amount || body.amount <= 0) {
      return new Response(JSON.stringify({ error: "Nominal tidak valid" }), { status: 400 });
    }

    // ✅ Buat client Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    // ✅ Tentukan tipe transaksi berdasarkan body
    const type = body.type || "donasi"; // bisa: donasi, langganan, sekolah, dst

    // ✅ Parameter transaksi
    const parameter = {
      transaction_details: {
        order_id: `${type.toUpperCase()}-${Date.now()}`, // contoh: DONASI-173930123
        gross_amount: body.amount,
      },
      item_details: body.items || [
        {
          id: `${type}-${Date.now()}`,
          price: body.amount,
          quantity: 1,
          name:
            type === "donasi"
              ? "Donasi Tanam Pohon"
              : type === "langganan"
              ? "Langganan Premium"
              : type === "sekolah"
              ? "Pembayaran Sekolah"
              : "Transaksi Umum",
        },
      ],
      customer_details: {
        first_name: body.name || "Pengguna",
        email: body.email || "user@example.com",
      },
    };

    // ✅ Buat transaksi di Midtrans
    const transaction = await snap.createTransaction(parameter);

    return new Response(JSON.stringify({ token: transaction.token }), { status: 200 });
  } catch (err) {
    console.error("❌ Gagal buat token Midtrans:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Gagal membuat transaksi" }),
      { status: 500 }
    );
  }
}
