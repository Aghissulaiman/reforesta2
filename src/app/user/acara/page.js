"use client";

import { useState, useEffect } from "react";
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import Footer from "@/app/componen/landingpage/Footer";

// Acara
import AcaraHijau2 from "@/app/componen/Acarapage/AcaraHijau2";
import DaftarAcara from "@/app/componen/Acarapage/DaftarAcara";
import DetailAcara from "@/app/componen/Acarapage/DetailAcara";
import { AcaraProvider } from "@/app/componen/Acarapage/AcaraContext";

export default function Acara() {
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

  let NavbarComponent = <NavbarAll />;
  if (user) {
    // 💡 LOGIKA BARU: NavbarDonatur digunakan untuk role 'donatur' dan 'sekolah'
    NavbarComponent =
      user.role === "donatur" || user.role === "sekolah" ? (
        <NavbarDonatur user={user} />
      ) : (
        <NavbarAll user={user} />
      );
  }

  return (
    <div className="min-h-screen bg-green-50">
      {NavbarComponent}

      {/* Bungkus semua komponen acara dengan Provider */}
      <AcaraProvider>
        <main className="container mx-auto p-4 space-y-8">
          <AcaraHijau2 />
          <div id="daftar-acara">
            <DaftarAcara />
          </div>
          <DetailAcara />
        </main>
      </AcaraProvider>

      <Footer />
    </div>
  );
}