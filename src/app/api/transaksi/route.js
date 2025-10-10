import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ message: "Anda harus login untuk melanjutkan pembayaran" }), {
      status: 401,
    });
  }

  const body = await req.json();

  const { error } = await supabase.from("transaksi").insert([
  {
    id_user: user.id,
    id_komunitas: body.id_komunitas, // ✅ sesuai dari body
    total_harga: parseInt(body.gross_amount),
    status: body.transaction_status,
    metode_bayar: body.payment_type,
    tanggal: body.transaction_time,
    detail_pesanan: body.order_id,
  },
]);

  if (error) {
    console.error("⚠️ SUPABASE ERROR:", error.message);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: "Transaksi tersimpan" }), { status: 200 });
}
