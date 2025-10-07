"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // 🔹 Kalau udah login, dan buka halaman login/register/landing → redirect ke /home
      if (session && ["/", "/login", "/register"].includes(pathname)) {
        router.replace("/home");
      }

      // 🔹 Kalau belum login dan mau ke halaman private (misal /home) → balik ke login
      if (!session && ["/home", "/riwayat", "/profile"].includes(pathname)) {
        router.replace("/login");
      }
    };

    checkSession();
  }, [pathname, router]);
}
