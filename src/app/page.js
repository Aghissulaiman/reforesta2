"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AcaraHijau from "./componen/landingpage/AcaraHijau";
import BenefitSection from "./componen/landingpage/BenefitSection";
import CaraKerja from "./componen/landingpage/CaraKerja";
import Footer from "./componen/landingpage/Footer";
import Hero from "./componen/landingpage/Hero";
import HubungiKami from "./componen/landingpage/HubungiKami";
import Komunitas from "./componen/landingpage/Komunitas";
import Navbar from "./componen/landingpage/Navbar";
import CarouselRegion from "./componen/landingpage/CarouselRegion";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  const [role, setRole] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUserAndRole = async () => {
      // ambil user yang login
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      // ambil role dari tabel user
      const { data, error } = await supabase
        .from("user") // pastikan nama tabel sesuai (bukan "users")
        .select("role")
        .eq("id", user.id)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Gagal ambil role:", error.message);
        return;
      }

      setRole(data?.role);

      // redirect sesuai role
      if (data?.role === "admin") {
        window.location.href = "/user/dashboard";
      } else if (data?.role === "komunitas") {
        window.location.href = "/home";
      } else if (data?.role === "sekolah") {
        window.location.href = "/home";
      } else {
        window.location.href = "/";
      }
    };

    getUserAndRole();
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Komunitas />
      <CaraKerja />
      <BenefitSection />
      <CarouselRegion />
      <AcaraHijau />
      <HubungiKami />
      <Footer />
    </div>
  );
}
