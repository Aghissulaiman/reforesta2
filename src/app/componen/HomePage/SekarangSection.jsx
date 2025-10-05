// components/SekarangSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function SekarangSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto px-6 py-16 gap-10">
      
      {/* Teks kiri */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
          Kami membantu anda untuk <br />
          ikut serta dalam kegiatan penghijauan
        </h2>
        <p className="text-white mb-6 text-base leading-relaxed">
          Cara paling sederhana bagi warga negara dan perusahaan untuk menanam pohon 
          di seluruh dunia dan mengimbangi emisi CO2 mereka.
        </p>

        <Link
          href="/tanam"
          className="border-2 border-white bg-white text-green-600 font-semibold px-8 py-2 rounded-full shadow-sm transition hover:shadow-[0_0_15px_3px_rgba(255,255,255,0.8)]"
        >
          Tanam
        </Link>
      </div>

      {/* Gambar kanan */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/Tanaman1.png"
          alt="Kegiatan penghijauan"
          width={400}
          height={260}
          className="rounded-xl object-cover shadow-lg"
        />
      </div>
    </section>
  );
}
