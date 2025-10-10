import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // pakai service role
);

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("🔔 Notifikasi Midtrans:", body);

    const { order_id, transaction_status, payment_type, transaction_time } = body;

    const { error } = await supabase
      .from("transaksi")
      .update({
        status: transaction_status,
        metode_bayar: payment_type,
        tanggal: transaction_time,
      })
      .eq("detail_pesanan", order_id);

    if (error) throw error;

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Gagal proses notifikasi:", err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
