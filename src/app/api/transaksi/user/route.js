import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return new Response(JSON.stringify({ message: "User belum login" }), { status: 401 });
  }

  // 🔹 Ambil semua transaksi yang terkait user ini (baik donatur maupun komunitas)
  const { data, error } = await supabase
    .from("transaksi")
    .select("*")
    .or(`id_user.eq.${user.id},id_komunitas.eq.${user.id}`)
    .order("tanggal", { ascending: false });

    console.log(data)
  if (error) {
    console.error("Gagal ambil transaksi:", error.message);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
