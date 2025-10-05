"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

export default function PilihLokasi() {
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
    <section className="w-full flex flex-col lg:flex-row justify-center items-center py-10 gap-10">
      {/* BAGIAN KIRI */}
      <div className="relative flex items-center justify-center">
        {/* Tombol kiri */}
        <button
          onClick={prevSlide}
          className="absolute left-[-45px] bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-lg"
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
              scale = 0.8;
              opacity = 0.6;
            } else if (pos === "right") {
              x = 220;
              scale = 0.8;
              opacity = 0.6;
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

        {/* Tombol kanan */}
        <button
          onClick={nextSlide}
          className="absolute right-[-45px] bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10 shadow-lg"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* BAGIAN KANAN */}
      <div className="bg-white rounded-xl shadow-md p-6 w-[280px]">
        <p className="text-black text-base font-medium flex justify-between">
          <span>Lokasi</span> <span>{lokasi[index].nama}</span>
        </p>
        <p className="text-black text-base font-medium flex justify-between mt-1">
          <span>Jenis Bibit</span> <span>Pohon Sengon</span>
        </p>
        <p className="text-black text-base font-medium flex justify-between mt-1">
          <span>Jumlah Bibit</span> <span>1</span>
        </p>
        <p className="text-black text-base font-medium flex justify-between mt-1">
          <span>Total</span> <span>Rp 25.000</span>
        </p>

        <button className="mt-5 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
          Bayar
        </button>
      </div>
    </section>
  );
}
