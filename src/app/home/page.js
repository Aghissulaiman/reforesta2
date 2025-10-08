"use client";

import { useState, useEffect } from "react";
import NavbarAll from "../componen/HomePage/NavbarAll";
import SekarangSection from "../componen/HomePage/SekarangSection";
import DukungOleh from "../componen/HomePage/DukungOleh";
import LanggananSection from "../componen/HomePage/LanggananSection";
import Komunitas from "../componen/landingpage/Komunitas";
import AcaraHijau from "../componen/landingpage/AcaraHijau";
import Footer from "../componen/landingpage/Footer";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

export default function Home() {
  useAuthRedirect();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Ambil data user dari localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed);
      }
    } catch (err) {
      console.error("Gagal memuat user:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🌀 Tampilan loading (lebih cepat dan smooth)
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

  // ❌ Kalau belum login
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

  // ✅ Kalau sudah login
  return (
    <div className="bg-green-50 min-h-screen">
      <NavbarAll />
      <SekarangSection />
      <DukungOleh />
      <Komunitas />
      {user.role === "komunitas" && user.subRole === "penanam" && (
        <LanggananSection />
      )}
      <AcaraHijau />
      <Footer />
    </div>
  );
}
