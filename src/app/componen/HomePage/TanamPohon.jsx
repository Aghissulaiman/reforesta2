// components/TanamPohon.jsx
"use client";

import Image from "next/image";

export default function TanamPohon() {
  return (
    <section className="flex flex-col items-center text-center py-10">
      {/* Gambar utama */}
      <div className="w-full max-w-md rounded-xl overflow-hidden shadow-md">
        <Image
          src="/Tanampohon.png" // ganti sesuai path gambarmu
          alt="Tanam Pohon"
          width={800}
          height={500}
          className="object-cover w-full h-auto"
        />
      </div>

      {/* Teks dan tombol */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold text-white drop-shadow-md">
          Tanam Pohon Sekarang
        </h2>
        <p className="text-white text-sm mt-2 max-w-sm mx-auto drop-shadow-sm">
          Setiap pohon yang tumbuh hari ini adalah warisan terbaik untuk generasi mendatang
        </p>

        <button className="mt-4 bg-white text-green-600 font-medium px-6 py-2 rounded-lg hover:bg-green-100 transition">
          Mulai Sekarang
        </button>
      </div>
    </section>
  );
}
