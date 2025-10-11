"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export function SupabaseProvider({ children }) {
  // ✅ Buat Supabase client untuk sisi browser
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    // ✅ Provider Supabase biar useSession() bisa kebaca di semua halaman
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}
