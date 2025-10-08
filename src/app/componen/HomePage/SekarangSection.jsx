"use client";

import Image from "next/image";
import Link from "next/link";

export default function SekarangSection() {
  return (
    // Menghilangkan 'min-h-screen' agar tidak terlalu tinggi. Menggunakan padding vertikal yang moderat.
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Kontainer Utama: Fokus pada keselarasan dan celah yang moderat */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">

          {/* Bagian kiri - teks dan CTA */}
          <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6">
            
            {/* Judul: Lebih fokus, warna yang lebih cerah */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-snug">
              Hijaukan Bumi,{" "}
              <span className="text-[#047857]">
                Mulai Sekarang
              </span>
              <span className="text-green-500">
                {" "}
              </span>
            </h2>

            {/* Paragraf: Font lebih ringan dan ringkas */}
            <p className="text-gray-500 max-w-md mx-auto md:mx-0 text-base md:text-lg leading-relaxed font-light">
              Kami membantu Anda ikut serta dalam gerakan penghijauan dengan cara
              sederhana: menanam pohon dan menjaga lingkungan sekitar.
            </p>

            {/* Tombol CTA: Desain minimalis dan efek hover yang halus */}
            <div className="pt-2">
              <Link
                href="/tanam"
                className="inline-block bg-[#047857] text-white px-8 py-3 rounded-lg font-semibold text-base md:text-lg 
                           shadow-md shadow-green-200 
                           transition-all duration-300 
                           hover:bg-green-600 hover:shadow-lg hover:shadow-green-300
                           transform hover:scale-[1.02]"
              >
                Tanam Sekarang
              </Link>
            </div>
            
          </div>

          {/* Bagian kanan - gambar */}
          <div className="flex-1 flex justify-center w-full md:w-auto mt-6 md:mt-0">
            {/* Kontainer gambar dengan proporsi yang lebih kecil */}
            <div className="relative w-full max-w-sm h-64 md:h-72">
              <Image
                src="/Tanaman1.png"
                alt="Kegiatan penghijauan"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-xl shadow-green-100/70 border-2 border-white 
                           transition-transform duration-500 ease-out 
                           hover:scale-105"
              />
              {/* Garis batas atau dekorasi tipis */}
              <div className="absolute inset-0 rounded-xl border border-green-200/50 pointer-events-none"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}