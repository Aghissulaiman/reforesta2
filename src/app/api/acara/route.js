import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 🔹 Setup client Supabase (gunakan env)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // pake SERVICE KEY biar bisa insert data
);

export async function POST(req) {
  try {
    const body = await req.json();
    const { id_user, judul_acara, lokasi, tanggal, waktu, deskripsi, status, gambar } = body;

    // Validasi data
    if (!id_user || !judul_acara || !lokasi || !tanggal || !waktu) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // Insert ke Supabase
    const { data, error } = await supabase
      .from("acara_penanaman")
      .insert([
        {
          id_user,
          judul_acara,
          lokasi,
          tanggal,
          waktu,
          deskripsi,
          status,
          gambar,
        },
      ])
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (err) {
    console.error("❌ Error insert acara:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
