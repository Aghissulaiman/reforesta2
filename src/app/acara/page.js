"use client";

import { useState, useEffect, useRef } from "react";
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import Footer from "@/app/componen/landingpage/Footer";
import AcaraHijau2 from "@/app/componen/Acarapage/AcaraHijau2";
import DaftarAcara from "@/app/componen/Acarapage/DaftarAcara";
import DetailAcara from "@/app/componen/Acarapage/DetailAcara";

export default function Acara() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAcara, setSelectedAcara] = useState(null);

  const detailRef = useRef(null); // ✅ referensi ke detail acara

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

  // ✅ Saat selectedAcara berubah → scroll ke bagian detail
  useEffect(() => {
    if (selectedAcara && detailRef.current) {
      setTimeout(() => {
        detailRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // beri jeda biar animasi muncul dulu
    }
  }, [selectedAcara]);

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

  let NavbarComponent;
  if (user) {
    NavbarComponent =
      user.role === "donatur" ? (
        <NavbarDonatur user={user} />
      ) : (
        <NavbarAll user={user} />
      );
  } else {
    NavbarComponent = <NavbarAll />;
  }

  return (
    <div className="min-h-screen bg-green-50 relative">
      {NavbarComponent}

      <main className="container mx-auto p-4 space-y-8">
        <AcaraHijau2 />

        
        <DaftarAcara onSelectAcara={(acara) => setSelectedAcara(acara)} />

          {/* ✅ DetailAcara muncul + auto scroll */}
        {selectedAcara && (
          <div ref={detailRef} className="transition-all duration-300 ease-in-out">
            <DetailAcara acara={selectedAcara} />
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
