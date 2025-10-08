"use client";

import { useEffect, useState } from "react";
import DukungOleh from "../componen/HomePage/DukungOleh";
import LanggananSection from "../componen/HomePage/LanggananSection";
import NavbarAll from "../componen/HomePage/NavbarAll";
import SekarangSection from "../componen/HomePage/SekarangSection";
import AcaraHijau from "../componen/landingpage/AcaraHijau";
import Footer from "../componen/landingpage/Footer";
import Komunitas from "../componen/landingpage/Komunitas";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

export default function Home() {
  useAuthRedirect();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Memuat data pengguna...</p>
      </div>
    );
  }

  return (
    <div>
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
