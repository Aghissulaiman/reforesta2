"use client";

import { useState, useEffect } from "react";
import NavbarAll from "../../componen/HomePage/NavbarAll";
import NavbarDonatur from "../../componen/HomePage/NavbarDonatur";
import SekarangSection from "../../componen/HomePage/SekarangSection";
import DukungOleh from "../../componen/HomePage/DukungOleh";
import LanggananSection from "../../componen/HomePage/LanggananSection";
import Komunitas from "../../componen/landingpage/Komunitas";
import AcaraHijau from "../../componen/landingpage/AcaraHijau";
import Footer from "../../componen/landingpage/Footer";

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
          href="/login"
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  }

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navbar sesuai role */}
      {/* Asumsi: Role "penanam" dan "sekolah" menggunakan NavbarAll */}
      {(user.role === "penanam" || user.role === "sekolah") && <NavbarAll user={user} />}
      {user.role === "donatur" && <NavbarDonatur user={user} />}

      <SekarangSection />
      <Komunitas />

      {/* FIX: LanggananSection hanya muncul jika role adalah "penanam" */}
      {user.role === "penanam" && (
        <LanggananSection />
      )}

      <AcaraHijau />
      <DukungOleh />
      <Footer />
    </div>
  );
}
