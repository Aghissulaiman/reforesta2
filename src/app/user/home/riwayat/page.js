"use client";

import { useState, useEffect } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import Footer from "@/app/componen/landingpage/Footer";
import HistoryPembayaran from "@/app/componen/historypage/History";

export default function Riwayat() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ambilRole = async () => {
      // kalau belum login, hentikan aja
      if (!session?.user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();

        if (error) throw error;
        setRole(data?.role || "donatur");
      } catch (err) {
        console.error("Gagal ambil role:", err.message);
      } finally {
        setLoading(false);
      }
    };

    ambilRole();
  }, [session, supabase]);

  // 🌀 Loading screen
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-4 animate-pulse">
          Memuat data pengguna...
        </p>
      </div>
    );
  }

  // 🔒 Jika belum login
  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <p className="text-gray-700 mb-3">
          Akses ditolak. Silakan login untuk melihat riwayat pembayaran Anda. 🔒
        </p>
        <a
          href="/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  }

  // 🧾 Tampilan utama riwayat
  return (
    <div className="min-h-screen bg-green-50">
      {role === "donatur" ? (
        <NavbarDonatur user={session.user} />
      ) : (
        <NavbarAll user={session.user} />
      )}

      <main className="container mx-auto p-4 space-y-8">
        <HistoryPembayaran />
      </main>

      <Footer />
    </div>
  );
}
