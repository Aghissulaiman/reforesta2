import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(req) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data } = await supabase.auth.getSession();
  const session = data?.session;

  const { pathname } = req.nextUrl;

  if (!session && pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && ["/", "/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/home/:path*"],
};
