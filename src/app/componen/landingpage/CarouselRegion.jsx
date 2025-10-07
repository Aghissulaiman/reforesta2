"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CarouselRegion() {
  const lokasi = [
    { nama: "Jawa Barat", img: "/lokasi1.png" },
    { nama: "Jawa Tengah", img: "/lokasi2.png" },
    { nama: "Jawa Timur", img: "/lokasi3.png" },
    { nama: "Sumatera Barat", img: "/lokasi4.png" },
    { nama: "Kalimantan Timur", img: "/lokasi5.png" },
    { nama: "Sulawesi Selatan", img: "/lokasi6.png" },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % lokasi.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + lokasi.length) % lokasi.length);

  const getPosition = (i) => {
    const diff = (i - index + lokasi.length) % lokasi.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -lokasi.length + 1) return "right";
    if (diff === lokasi.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <section className="py-16 bg-white text-center">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10">
        Ribuan bibit telah tumbuh menjadi pohon <br /> lewat platform ini
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Tombol kiri */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-10 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-lg"
        >
          <FaChevronLeft />
        </button>

        {/* Carousel */}
        <div className="relative w-[680px] h-[270px] flex items-center justify-center overflow-hidden">
          {lokasi.map((item, i) => {
            const pos = getPosition(i);
            let x = 0,
              scale = 1,
              zIndex = 1,
              opacity = 1;

            if (pos === "left") {
              x = -220;
              scale = 0.85;
              opacity = 0.5;
            } else if (pos === "right") {
              x = 220;
              scale = 0.85;
              opacity = 0.5;
            } else if (pos === "center") {
              x = 0;
              scale = 1.1;
              zIndex = 10;
              opacity = 1;
            } else {
              x = 800;
              opacity = 0;
              scale = 0.5;
            }

            return (
              <motion.div
                key={i}
                animate={{ x, scale, opacity }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute"
                style={{ zIndex }}
              >
                <div className="relative w-[260px] h-[240px] rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src={item.img}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay gelap */}
                  <div
                    className={`absolute inset-0 ${
                      pos === "center" ? "bg-black/30" : "bg-black/70"
                    } transition-all duration-500`}
                  />
                  {/* Judul */}
                  <h3
                    className={`absolute inset-0 flex items-center justify-center text-white font-semibold text-lg transition-opacity duration-500 ${
                      pos === "center" ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {item.nama}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tombol kanan */}
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-10 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-lg"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Indikator bawah */}
      <div className="flex justify-center gap-2 mt-6">
        {lokasi.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-green-600 scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
}
