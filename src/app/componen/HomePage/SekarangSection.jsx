// components/SekarangSection.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function SekarangSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto px-6 py-16 gap-10">
      
      {/* Teks kiri */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4 leading-snug">
          Kami membantu anda untuk <br />
          ikut serta dalam kegiatan penghijauan
        </h2>
        <p className="text-[#111827 ] mb-6 text-base leading-relaxed">
          Cara paling sederhana bagi warga negara dan perusahaan untuk menanam pohon 
          di seluruh dunia dan mengimbangi emisi CO2 mereka.
        </p>

        <Link
          href="/tanam"
          className="px-12  py-1.5 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all"
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
