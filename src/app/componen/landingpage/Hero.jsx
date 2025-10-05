// components/Hero.jsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-16 w-full h-screen overflow-x-hidden"> 
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <div className="px-60"> 
          <div className="flex justify-center items-center">  
          <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 fill-white" viewBox="0 0 24 24"><path d="M5.998 3a7 7 0 0 1 6.913 5.895A6.48 6.48 0 0 1 17.498 7h4.5v2.5a6.5 6.5 0 0 1-6.5 6.5h-2.5v5h-2v-8h-2a7 7 0 0 1-7-7V3zm14 6h-2.5a4.5 4.5 0 0 0-4.5 4.5v.5h2.5a4.5 4.5 0 0 0 4.5-4.5zm-14-4h-2v1a5 5 0 0 0 5 5h2v-1a5 5 0 0 0-5-5"/></svg>
          </div>
        <div className="text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">REFORESTACIA</h1>
          <p className="text-sm md:text-base text-gray-100 leading-relaxed max-w-sm">
            Cara paling sederhana Untuk Menyalurkan dana untuk penghijauan.
          </p>
          <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-green-100 transition">
            Mulai Sekarang
          </button>
        </div>
        </div>

<div className="mr-75">
        <div className="flex flex-col items-center relative">
          <div className="relative w-120 rounded-xl overflow-hidden shadow-lg">
          <img
          src="LHero.png"
          />
          </div>

          <div className="absolute -bottom-8 flex gap-6">
            <div className="bg-[#FFDD55] text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-2xl mb-1">👥</span>
              <p className="text-lg font-bold leading-none">3</p>
              <p className="text-xs">Komunitas</p>
            </div>

            {/* Bibit Ditanam */}
            <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-2xl mb-1">🌱</span>
              <p className="text-lg font-bold leading-none">1000</p>
              <p className="text-xs">Bibit Ditanam</p>
            </div>
          </div>
</div>
        </div>
      </div>
    </section>
  );
}
