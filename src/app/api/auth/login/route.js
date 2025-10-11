// src/app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    return NextResponse.json({ message: "Login berhasil" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: err.message || "Login gagal" }, { status: 401 });
  }
}
