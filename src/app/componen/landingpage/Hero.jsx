"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* === BAGIAN KIRI === */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
          
          {/* Logo + Judul */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/logo.png"
              alt="Logo Reforestacia"
              width={80}
              height={80}
              className="mb-2 select-none"
            />
            <h1 className="text-4xl font-extrabold text-[#059669] tracking-wide">
              REFORESTACIA
            </h1>
          </div>

          {/* Deskripsi */}
          <p className="text-gray-600 text-lg max-w-sm leading-relaxed">
            Cara paling sederhana untuk menyalurkan dana untuk penghijauan.
          </p>

          {/* Tombol */}
          <button className="px-8 py-2 border-2 border-[#059669] text-[#059669] font-semibold rounded-full hover:bg-[#059669] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
            Mulai Sekarang
          </button>
        </div>

        {/* === BAGIAN KANAN === */}
        <div className="flex flex-col items-center md:items-end relative">
          {/* Video Hero */}
          <div className="rounded-xl overflow-hidden shadow-lg w-[360px] sm:w-[420px] md:w-[500px] aspect-[16/9]">
            <video
              src="/heroVideo.mp4" // ganti dengan video kamu
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Kotak Statistik */}
          <div className="flex gap-4 mt-[-35px]">
            
            {/* Komunitas */}
            <div className="bg-[#059669] text-white px-5 py-3 rounded-xl shadow-md flex flex-col items-center min-w-[120px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 mb-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3s1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4zM8 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm-4 2c2.21 0 6 1.104 6 3v2H0v-2c0-1.896 3.79-3 6-3z" />
              </svg>
              <p className="text-lg font-semibold leading-none">3</p>
              <p className="text-xs">Komunitas</p>
            </div>

            {/* Bibit Ditanam */}
            <div className="bg-[#047857] text-white px-5 py-3 rounded-xl shadow-md flex flex-col items-center min-w-[120px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 mb-1"
                viewBox="0 0 36 36"
                fill="currentColor"
              >
                <path d="M18 2C10.8 1.7 4.8 7.3 4.5 14.5S9.8 27.7 17 28v-5.2l-5.2-5.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L17 20v-6.2l-2.7-2.7c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L19 13v3l3.3-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4L19 18.8V28c7.2-.3 12.8-6.3 12.5-13.5S25.2 1.7 18 2" />
              </svg>
              <p className="text-lg font-semibold leading-none">1000</p>
              <p className="text-xs">Bibit Ditanam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
