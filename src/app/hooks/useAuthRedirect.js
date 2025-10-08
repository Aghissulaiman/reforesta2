"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useAuthRedirect(protect = true) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;
      console.log("🔍 Session:", session);

      if (protect) {
        // Untuk halaman yang butuh login
        if (!session) {
          router.push("/login");
        }
      } else {
        // Untuk halaman login/register
        if (session) {
          router.push("/home");
        }
      }
    };

    checkUser();
  }, [router, pathname, protect]);
}
