"use client";

import { useState, useEffect } from "react";
// Menggunakan absolute path alias (@/) untuk konsistensi
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur"; 
import TanamPohon from "@/app/componen/Tanampage/TanamPohon";
import TanamPohonPage from "@/app/componen/Tanampage/TanamPohonPage";
import Footer from "@/app/componen/landingpage/Footer";

// Menghapus import Supabase yang tidak terpakai
// import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function TanamPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Memastikan role yang valid ada sebelum set user
        if (parsed.email && (parsed.role === "penanam" || parsed.role === "donatur" || parsed.role === "sekolah")) {
          setUser(parsed);
        }
      } catch (err) {
        console.error("Gagal memuat user:", err);
      }
    }
    setLoading(false);
  }, []);

  // Tampilkan loading screen saat data sedang dimuat
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-4 animate-pulse">Memuat data pengguna...</p>
      </div>
    );
  }

  // Jika user belum login, tolak akses karena ini halaman inti
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <p className="text-gray-700 mb-3">Akses ditolak. Silakan login untuk memulai penanaman. 🔒</p>
        <a
          href="/user/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  }

  // Tentukan Navbar berdasarkan role
  const SelectedNavbar = (user.role === "penanam" || user.role === "sekolah") 
    ? NavbarAll 
    : NavbarDonatur;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar sesuai role */}
      <SelectedNavbar user={user} />
      
      <main className="flex-grow">
        {/* Mengirimkan data user ke komponen yang mungkin memerlukannya */}
        <TanamPohon user={user} />
        <TanamPohonPage user={user} />
      </main>
      
      <Footer />
    </div>
  );
}
