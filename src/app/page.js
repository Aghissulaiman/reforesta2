import AcaraHijau from "./componen/landingpage/AcaraHijau";
import BenefitSection from "./componen/landingpage/BenefitSection";
import CaraKerja from "./componen/landingpage/CaraKerja";
import Footer from "./componen/landingpage/Footer";
import Hero from "./componen/landingpage/Hero";
import HubungiKami from "./componen/landingpage/HubungiKami";
import Komunitas from "./componen/landingpage/Komunitas";
import Navbar from "./componen/landingpage/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Komunitas />
      <CaraKerja />
      <AcaraHijau />
      <BenefitSection />
      <HubungiKami />
      <Footer />
    </div>
  );
}
