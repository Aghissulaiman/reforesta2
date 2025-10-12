"use client";

import { useState, useEffect } from "react";
// Menggunakan absolute path untuk konsistensi
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import SekarangSection from "@/app/componen/HomePage/SekarangSection";
import DukungOleh from "@/app/componen/HomePage/DukungOleh";
import LanggananSection from "@/app/componen/HomePage/LanggananSection";
import Komunitas from "@/app/componen/landingpage/Komunitas";
import AcaraHijau from "@/app/componen/landingpage/AcaraHijau";
import Footer from "@/app/componen/landingpage/Footer";
import DetailAcara from "@/app/componen/Acarapage/DetailAcara";
import AcaraDetail from "@/app/componen/Acarapage/AcaraDetail";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Pastikan role "sekolah" juga ditangani di navbar jika perlu
        if (parsed.email && (parsed.role === "penanam" || parsed.role === "donatur" || parsed.role === "sekolah")) {
          setUser(parsed);
        }
      } catch (err) {
        console.error("Gagal memuat user:", err);
      }
    }
    setLoading(false);
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-4 animate-pulse">Memuat data pengguna...</p>
      </div>
    );
  }

  // Belum login
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <p className="text-gray-700 mb-3">Kamu belum login 😢</p>
        <a
          href="/user/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  }
  
  // Tentukan Navbar yang akan digunakan (Perbaikan Logic)
  // Jika role-nya donatur ATAU sekolah, gunakan NavbarDonatur. Selain itu (penanam), gunakan NavbarAll.
  const SelectedNavbar = 
    (user.role === "donatur" || user.role === "sekolah") 
    ? NavbarDonatur 
    : NavbarAll;

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navbar sesuai role: 'donatur' dan 'sekolah' menggunakan NavbarDonatur, 'penanam' menggunakan NavbarAll */}
      <SelectedNavbar user={user} />

      <SekarangSection />
      <Komunitas />

      {/* LanggananSection hanya muncul jika role adalah "penanam" */}
      {user.role === "penanam" && (
        <LanggananSection />
      )}

      <AcaraHijau />
     
      
      <DukungOleh />
      <Footer />
    </div>
  );
}