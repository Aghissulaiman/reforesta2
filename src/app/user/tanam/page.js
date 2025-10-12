"use client";

import { useState, useEffect } from "react";
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import TanamPohon from "@/app/componen/Tanampage/TanamPohon";
import TanamPohonPage from "@/app/componen/Tanampage/TanamPohonPage";
import Footer from "@/app/componen/landingpage/Footer";
import TanamPohonPageS from "@/app/componen/Tanampage/TanamPohonPageS";

export default function TanamPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (
          parsed.email &&
          (parsed.role === "penanam" ||
            parsed.role === "donatur" ||
            parsed.role === "sekolah")
        ) {
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
        <p className="text-gray-600 mt-4 animate-pulse">
          Memuat data pengguna...
        </p>
      </div>
    );
  } 

  // Jika user belum login, tolak akses
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <p className="text-gray-700 mb-3">
          Akses ditolak. Silakan login untuk memulai penanaman. 🔒
        </p>
        <a
          href="/user/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  } 

  // Tentukan Navbar: 'donatur' dan 'sekolah' -> NavbarDonatur, 'penanam' -> NavbarAll
  const SelectedNavbar =
    (user.role === "donatur" || user.role === "sekolah") 
    ? NavbarDonatur
    : NavbarAll;

  // Tentukan Konten Utama berdasarkan role
  let MainContentComponent; 

  if (user.role === "sekolah") {
    MainContentComponent = <TanamPohonPageS user={user} />;
  } else if (user.role === "penanam" || user.role === "donatur") {
    // Role komunitas (penanam/donatur) menampilkan TanamPohonPage
    MainContentComponent = <TanamPohonPage user={user} />;
  } else {
    // Fallback jika ada role lain yang valid diizinkan masuk
    MainContentComponent = <TanamPohon user={user} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar sesuai role */}
      <SelectedNavbar user={user} />
      
    <div className="h-28"></div>

      <main className="flex-grow">
        {/* Menampilkan Komponen Konten Utama berdasarkan role (hanya satu) */}
        {MainContentComponent}
      </main>
      
      <Footer />
    </div>
  );
}