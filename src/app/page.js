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
