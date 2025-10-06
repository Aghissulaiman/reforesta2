import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware() {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});

    const {
        data: {user},
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));  
    }

    return res
}