// components/BenefitSection.jsx
"use client";

import { ThumbsUp, Laptop, Newspaper } from "lucide-react";

export default function BenefitSection() {
  const benefits = [
    {
      icon: <ThumbsUp className="w-7 h-7 text-white" />,
      text: "Semua catatan kontribusi terekam rapi",
    },
    {
      icon: <Laptop className="w-7 h-7 text-white" />,
      text: "Antar muka yang intuitif untuk semua pengguna",
    },
    {
      icon: <Newspaper className="w-7 h-7 text-white" />,
      text: "Menampilkan informasi kegiatan penghijauan",
    },
  ];

  return (
    <section className="relative bg-white py-16 overflow-hidden">
      {/* Judul */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-black">
        Benefit
      </h2>

      {/* Background garis hijau */}
      <div className="absolute inset-0 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="w-full h-full opacity-40 text-green-500"
          fill="none"
        >
          <path
            d="M0,200 C300,100 900,300 1200,200"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M0,250 C300,150 900,350 1200,250"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M0,300 C300,200 900,400 1200,300"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Konten Benefit */}
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-start gap-6 px-6 md:px-12">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-b from-green-400 to-green-600 text-white rounded-xl shadow-lg w-full md:w-1/4 h-[200px] flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-2"
          >
            {/* Lingkaran ikon di atas kotak */}
            <div className="absolute -top-6 bg-green-600 p-4 rounded-full shadow-md flex items-center justify-center">
              {item.icon}
            </div>

            {/* Teks */}
            <p className="text-base md:text-lg font-medium px-4 leading-snug mt-4">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
