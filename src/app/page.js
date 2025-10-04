import AcaraHijau from "./componen/landingpage/AcaraHijau";
import CaraKerja from "./componen/landingpage/CaraKerja";
import Hero from "./componen/landingpage/Hero";
import Komunitas from "./componen/landingpage/Komunitas";
import Navbar from "./componen/landingpage/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Komunitas/>
      <CaraKerja/>
      <AcaraHijau/>
    </div>
  );
}
