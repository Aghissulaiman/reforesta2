import { supabase } from "lib/supabaseClient";
import { NextResponse } from "next/server";

// === Simpan transaksi baru ===
export async function POST(req) {
  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from("transaksi")
      .insert([body])
      .select();

    if (error) throw error;
    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// === Update status transaksi ===
export async function PUT(req) {
  try {
    const { order_id, status } = await req.json();
    const { error } = await supabase
      .from("transaksi")
      .update({ status })
      .eq("order_id", order_id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
