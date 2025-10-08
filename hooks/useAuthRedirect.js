"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      // 🔹 kalau sudah login dan buka halaman login/register/landing → pindah ke /home
      if (session && ["/", "/login", "/register"].includes(pathname)) {
        router.replace("/home");
        return;
      }

      // 🔹 kalau belum login dan buka halaman private → redirect ke login
      if (!session && ["/home", "/riwayat", "/profile"].includes(pathname)) {
        router.replace("/login");
        return;
      }
    };

    checkSession();
  }, [pathname, router]);
}
