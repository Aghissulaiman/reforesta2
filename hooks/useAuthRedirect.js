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
      
    };

    checkSession();
  }, [pathname, router]);
}
