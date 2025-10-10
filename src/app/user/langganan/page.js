"use client";

import { useState, useEffect } from "react";
// FIX: Menggunakan absolute path alias (@/) untuk mengatasi Module not found
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur"; 
import Footer from "@/app/componen/landingpage/Footer";
import KenapaLangganan from "@/app/componen/langgananpage/KenapaLangganan";
import LanggananSection2 from "@/app/componen/langgananpage/LanggananSection2";
// LanggananSection dari Home juga diimpor, asumsikan ini adalah versi utama
import LanggananSection from "@/app/componen/HomePage/LanggananSection"; 

export default function Langganan() {
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

  // Jika user belum login, arahkan atau tampilkan pesan (Akses tetap dibuka, tetapi konten disesuaikan)
  // Untuk halaman Langganan, kita asumsikan halaman ini bisa diakses publik tetapi Navbar disesuaikan.

  // Tentukan Navbar yang akan digunakan (jika user sudah login)
  let NavbarComponent = <NavbarAll />;
  if (user) {
    if (user.role === "donatur") {
      NavbarComponent = <NavbarDonatur user={user} />;
    } else { // Termasuk penanam dan sekolah
      NavbarComponent = <NavbarAll user={user} />;
    }
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Tampilkan Navbar sesuai status login dan role */}
      {NavbarComponent}
      
      <main className="container mx-auto p-4 space-y-8">
        <KenapaLangganan />
        
        {/* Tampilkan bagian Langganan hanya untuk user yang terdaftar sebagai Penanam */}
        {user && user.role === "penanam" ? (
            <LanggananSection2 />
        ) : (
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                <h3 className="text-xl font-bold text-green-700 mb-2">Tertarik Berlangganan?</h3>
                <p className="text-gray-600 mb-4">Fitur langganan eksklusif untuk komunitas penanam kami. Silakan masuk sebagai **Penanam** untuk melihat detail paket.</p>
                {!user && (
                    <a href="/login" className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Masuk Sekarang
                    </a>
                )}
            </div>
        )}

      </main>
      
      <Footer />
    </div>
  );
}
