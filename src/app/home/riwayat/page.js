"use client";

import { useState, useEffect } from "react";
// Menggunakan absolute path alias (@/) untuk mengatasi Module not found
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import Footer from "@/app/componen/landingpage/Footer"; // Menambahkan Footer yang hilang
import HistoryPembayaran from "@/app/componen/historypage/History";


// Hapus import Navbar karena sudah ada NavbarAll dan NavbarDonatur
// import Navbar from "@/app/componen/landingpage/Navbar"; 

export default function riwayat() {
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

  // Jika user belum login, tolak akses karena ini halaman sensitif (riwayat pembayaran)
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <p className="text-gray-700 mb-3">Akses ditolak. Silakan login untuk melihat riwayat pembayaran Anda. 🔒</p>
        <a
          href="/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar sesuai role */}
      {/* Role "penanam" dan "sekolah" menggunakan NavbarAll */}
      {(user.role === "penanam" || user.role === "sekolah") && <NavbarAll user={user} />}
      {user.role === "donatur" && <NavbarDonatur user={user} />}
      
      <main className="container mx-auto p-4 space-y-8">
        {/* Konten utama riwayat pembayaran */}
        <HistoryPembayaran user={user} />
      </main>
      
      <Footer />
    </div>
  );
}
