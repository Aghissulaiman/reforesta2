"use client";

import Image from "next/image";

export default function AcaraHijau() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-6 md:px-12">
      {/* Gambar kiri */}
      <div className="relative w-full md:w-1/2 h-[280px] md:h-[360px] rounded-2xl overflow-hidden shadow-sm">
        <Image
          src="/AcaraHijau2.png" // ubah sesuai path gambar kamu
          alt="Acara Hijau"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* Teks kanan */}
      <div className="flex-1 md:ml-10 mt-8 md:mt-0 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Acara Hijau
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
          Mau tahu kapan dan di mana aksi tanam pohon berlangsung? Di sini kamu
          bisa dapetin update acara penghijauan terbaru di seluruh Indonesia.
          <br />
          <span className="block mt-1">Stay green, stay updated!</span>
        </p>

        <button className="mt-6 px-6 py-3 bg-[#047857] text-white font-semibold rounded-lg hover:bg-[#069b67] transition">
          Jelajahi
        </button>
      </div>
    </section>
  );
}
