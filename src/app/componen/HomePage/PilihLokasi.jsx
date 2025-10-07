"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import useDaerah from "../../../../hooks/daerah";

export default function PilihLokasi({ onChange }) {
  const { daerah, loading, error } = useDaerah();
  const [index, setIndex] = useState(0);

  if (loading) return <p className="text-gray-500">Memuat data lokasi...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!daerah || daerah.length === 0)
    return <p className="text-gray-500">Tidak ada data daerah.</p>;

  // === Navigasi Carousel ===
  const nextSlide = () => {
    const newIndex = (index + 1) % daerah.length;
    setIndex(newIndex);
    onChange?.(daerah[newIndex]);
  };

  const prevSlide = () => {
    const newIndex = (index - 1 + daerah.length) % daerah.length;
    setIndex(newIndex);
    onChange?.(daerah[newIndex]);
  };

  // === Posisi gambar (tengah, kiri, kanan) ===
  const getPosition = (i) => {
    const diff = (i - index + daerah.length) % daerah.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -daerah.length + 1) return "right";
    if (diff === daerah.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <div className="flex items-center pl-10">
      {/* Tombol kiri */}
      <button
        onClick={prevSlide}
        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-md mr-3"
      >
        <FaChevronLeft size={18} />
      </button>

      {/* Carousel */}
      <div className="relative w-[650px] h-[250px] flex items-center justify-center overflow-hidden">
        {daerah.map((item, i) => {
          const pos = getPosition(i);
          let x = 0,
            scale = 1,
            zIndex = 1,
            opacity = 1;

          if (pos === "left") {
            x = -220;
            scale = 0.85;
            opacity = 0.6;
          } else if (pos === "right") {
            x = 220;
            scale = 0.85;
            opacity = 0.6;
          } else if (pos === "center") {
            x = 0;
            scale = 1.05;
            zIndex = 10;
            opacity = 1;
          } else {
            x = 800;
            opacity = 0;
            scale = 0.5;
          }

          return (
            <motion.div
              key={item.id || i}
              animate={{ x, scale, opacity }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute"
              style={{ zIndex }}
            >
              <div className="relative w-[260px] h-[230px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={item.gambar}
                  alt={item.daerah}
                  fill
                  className="object-cover"
                />
                <div
                  className={`absolute inset-0 ${
                    pos === "center" ? "bg-black/30" : "bg-black/70"
                  } transition-all duration-500`}
                />
                <h3
                  className={`absolute inset-0 flex items-center justify-center text-white font-semibold text-lg transition-opacity duration-500 ${
                    pos === "center" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.daerah}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tombol kanan */}
      <button
        onClick={nextSlide}
        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-md ml-3"
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
}
