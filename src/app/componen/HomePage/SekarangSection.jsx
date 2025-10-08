"use client";

import Image from "next/image";
import Link from "next/link";

export default function SekarangSection() {
  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto px-6 py-16 gap-10">
      {/* Bagian kiri - teks */}
      <div className="flex-1 text-center md:text-left space-y-6">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 leading-snug">
          Hijaukan Bumi,<br />
          Mulai Sekarang 🌱
        </h2>

        <p className="text-gray-600 max-w-md mx-auto md:mx-0 text-lg leading-relaxed">
          Kami membantu Anda ikut serta dalam gerakan penghijauan dengan cara
          sederhana: menanam pohon dan menjaga lingkungan sekitar.
        </p>

        <div className="mt-6">
          <Link
            href="/tanam"
            className="inline-block bg-green-600 text-white px-10 py-3 rounded-full font-semibold text-lg 
                       hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md"
          >
            Tanam Sekarang
          </Link>
        </div>
      </div>

      {/* Bagian kanan - gambar */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/Tanaman1.png"
          alt="Kegiatan penghijauan"
          width={430}
          height={320}
          className="rounded-2xl object-cover shadow-lg hover:scale-105 transition-transform duration-500"
        />
      </div>
    </section>
  );
}
