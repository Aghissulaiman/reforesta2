"use client";
import NavbarAll from "../componen/HomePage/NavbarAll";
import TanamPohon from "../componen/Tanampage/TanamPohon";
import TanamPohonPage from "../componen/Tanampage/TanamPohonPage";
import Footer from "../componen/landingpage/Footer";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function TanamPage() {
  const session = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAll />
      <main className="flex-grow">
        <TanamPohon />
        <TanamPohonPage user={user} />
      </main>
      <Footer />
    </div>
  );
}
