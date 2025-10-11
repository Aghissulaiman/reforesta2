"use client";
import AcaraHijau from "./componen/landingpage/AcaraHijau";
import BenefitSection from "./componen/landingpage/BenefitSection";
import CaraKerja from "./componen/landingpage/CaraKerja";
import Footer from "./componen/landingpage/Footer";
import Hero from "./componen/landingpage/Hero";
import HubungiKami from "./componen/landingpage/HubungiKami";
import Komunitas from "./componen/landingpage/Komunitas";
import Navbar from "./componen/landingpage/Navbar";
import CarouselRegion from "./componen/landingpage/CarouselRegion";
import useAuthRedirect from "../../hooks/useAuthRedirect";

export default function Home() {
   useAuthRedirect()
  return (
    <div>
      <Navbar />
      <div id = "hero-section">
      <Hero />
      </div>
      <Komunitas />
      <CaraKerja />
      <BenefitSection />
      <CarouselRegion />

      {/* Tambahkan ID di sini */}
      <div id="acara-section">
        <AcaraHijau />
      </div>
      <div id = "contactus-section">
      <HubungiKami />
      </div>
      <Footer />
    </div>
  );
}
