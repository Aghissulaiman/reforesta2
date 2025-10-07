"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function PilihLokasi({ onChange }) {
  const lokasi = [
    { nama: "Jawa Barat", img: "/lokasi1.png" },
    { nama: "Jawa Tengah", img: "/lokasi2.png" },
    { nama: "Jawa Timur", img: "/lokasi3.png" },
    { nama: "Sumatera Barat", img: "/lokasi4.png" },
    { nama: "Kalimantan Timur", img: "/lokasi5.png" },
    { nama: "Sulawesi Selatan", img: "/lokasi6.png" },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    const newIndex = (index + 1) % lokasi.length;
    setIndex(newIndex);
    onChange?.(lokasi[newIndex]);
  };

  const prevSlide = () => {
    const newIndex = (index - 1 + lokasi.length) % lokasi.length;
    setIndex(newIndex);
    onChange?.(lokasi[newIndex]);
  };

  const getPosition = (i) => {
    const diff = (i - index + lokasi.length) % lokasi.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -lokasi.length + 1) return "right";
    if (diff === lokasi.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <div className="flex items-center pl-10"> 
      {/* Tombol kiri (dekat gambar) */}
      <button
        onClick={prevSlide}
        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-md mr-3"
      >
        <FaChevronLeft size={18} />
      </button>

      {/* Carousel */}
      <div className="relative w-[650px] h-[250px] flex items-center justify-center overflow-hidden">
        {lokasi.map((item, i) => {
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
              key={i}
              animate={{ x, scale, opacity }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute"
              style={{ zIndex }}
            >
              <div className="relative w-[260px] h-[230px] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={item.img}
                  alt={item.nama}
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
                  {item.nama}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tombol kanan (dekat gambar) */}
      <button
        onClick={nextSlide}
        className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-md ml-3"
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
}
