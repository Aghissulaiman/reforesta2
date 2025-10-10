"use client";

import { useState, useEffect } from "react";
// Menggunakan absolute path alias (@/) untuk mengatasi Module not found
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur"; 
import Footer from "@/app/componen/landingpage/Footer";
import AcaraHijau2 from "@/app/componen/Acarapage/AcaraHijau2";
import DaftarAcara from "@/app/componen/Acarapage/DaftarAcara";
import DetailAcara from "@/app/componen/Acarapage/DetailAcara";

export default function Acara() {
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

  // Tentukan Navbar yang akan digunakan (jika user sudah login)
  let NavbarComponent;

  if (user) {
    // Jika user login, tentukan Navbar berdasarkan role
    if (user.role === "donatur") {
      NavbarComponent = <NavbarDonatur user={user} />;
    } else { // Termasuk penanam dan sekolah
      NavbarComponent = <NavbarAll user={user} />;
    }
  } else {
    // Jika user belum login, gunakan NavbarAll sebagai default public
    NavbarComponent = <NavbarAll />;
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Tampilkan Navbar sesuai status login dan role */}
      {NavbarComponent}
      
      <main className="container mx-auto p-4 space-y-8">
        <AcaraHijau2 />
        <DetailAcara />
        <DaftarAcara />
      </main>
      
      <Footer />
    </div>
  );
}
