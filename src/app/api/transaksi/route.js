import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // 🔒 Cek user login
    if (!user) {
      return NextResponse.json(
        { message: "Anda harus login untuk melanjutkan pembayaran" },
        { status: 401 }
      );
    }

    const body = await req.json();

    // ✅ Validasi input minimal
    if (!body.order_id || !body.gross_amount) {
      return NextResponse.json(
        { message: "Data transaksi tidak lengkap" },
        { status: 400 }
      );
    }

    // 🟢 Simpan ke tabel transaksi
    const { error } = await supabase.from("transaksi").insert([
      {
        id_user: user.id,
        id_komunitas: body.id_komunitas || null,
        total_harga: parseInt(body.gross_amount),
        status: body.transaction_status || "pending",
        metode_bayar: body.payment_type || "unknown",
        tanggal: body.transaction_time || new Date().toISOString(),
        detail_pesanan: body.order_id,
      },
    ]);

    if (error) throw error;

    return NextResponse.json(
      { message: "Transaksi berhasil disimpan!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("⚠️ SUPABASE ERROR:", error.message);
    return NextResponse.json(
      { message: error.message || "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("transaksi")
      .select("*")
      .eq("id_user", user.id)
      .order("tanggal", { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error("❌ Gagal ambil transaksi:", error.message);
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}