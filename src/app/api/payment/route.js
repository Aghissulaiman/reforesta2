import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    // 🔹 Ambil token Bearer dari header
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      console.warn("⚠️ Token tidak ada di header Authorization");
      return NextResponse.json({ error: "Token missing" }, { status: 401 });
    }

    // 🔹 Buat Supabase client dengan token user
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        global: { headers: { Authorization: `Bearer ${token}` } },
      }
    );

    // 🔹 Ambil user dari token
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("❌ Gagal ambil user:", userError);
      return NextResponse.json(
        { error: "Auth session missing!" },
        { status: 401 }
      );
    }

    // 🔹 Ambil data dari body
    const body = await req.json();

    if (!body.gross_amount || !body.order_id) {
      return NextResponse.json(
        { error: "Data transaksi tidak lengkap" },
        { status: 400 }
      );
    }

    // 🔹 Simpan transaksi ke tabel
    const { error: insertError } = await supabase.from("transaksi").insert([
      {
        id_komunitas: user.id,
        total_harga: parseInt(body.gross_amount, 10),
        status: body.transaction_status || "pending",
        metode_bayar: body.payment_type || "unknown",
        tanggal: body.transaction_time || new Date().toISOString(),
        detail_pesanan: body.order_id,
      },
    ]);

    if (insertError) {
      console.error("❌ Error insert ke Supabase:", insertError);
      return NextResponse.json(
        { error: insertError.message },
        { status: 500 }
      );
    }

    console.log(`✅ Transaksi berhasil disimpan untuk user ${user.email}`);

    return NextResponse.json({
      success: true,
      message: "Transaksi berhasil disimpan",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.error("🔥 Error di /api/payments:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
