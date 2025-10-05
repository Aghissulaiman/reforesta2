"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const dataPohon = [
  { id: 1, nama: "Pohon Mahoni", harga: "Rp 13.000", gambar: "/mahoni.jpg" },
  { id: 2, nama: "Pohon Jati", harga: "Rp 15.000", gambar: "/mahoni.jpg" },
  { id: 3, nama: "Pohon Sengon", harga: "Rp 10.000", gambar: "/mahoni.jpg" },
  { id: 4, nama: "Pohon Trembesi", harga: "Rp 12.000", gambar: "/mahoni.jpg" },
  { id: 5, nama: "Pohon Akasia", harga: "Rp 11.000", gambar: "/mahoni.jpg" },
  { id: 6, nama: "Pohon Ketapang", harga: "Rp 14.000", gambar: "/mahoni.jpg" },
  { id: 7, nama: "Pohon Pinus", harga: "Rp 16.000", gambar: "/mahoni.jpg" },
  { id: 8, nama: "Pohon Meranti", harga: "Rp 18.000", gambar: "/mahoni.jpg" },
  { id: 9, nama: "Pohon Randu", harga: "Rp 12.500", gambar: "/mahoni.jpg" },
];

export default function PohonList() {
  const [dipilih, setDipilih] = useState(null);

  return (
    <section className="min-h-screen bg-[#f4f4f1] py-10 px-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Pilih Bibit Pohon</h2>
      <p className="text-sm text-gray-600 mb-6">
        Pilih bibit pohon yang akan ditanam
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {dataPohon.map((pohon, i) => (
          <motion.div
            key={pohon.id}
            whileHover={{ scale: 1.03 }}
            className={`w-[250px] bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer ${
              dipilih === pohon.id
                ? "border-4 border-[#4CAF50]"
                : "border border-transparent hover:border-[#4CAF50]"
            }`}
            onClick={() => setDipilih(pohon.id)}
          >
            <Image
              src={pohon.gambar}
              alt={pohon.nama}
              width={250}
              height={160}
              className="object-cover w-full h-[160px]"
            />
            <div className="text-center py-3">
              <h3 className="font-semibold text-gray-900">{pohon.nama}</h3>
              <p className="text-xs text-gray-500 mb-3">{pohon.harga}</p>
              <button
                className={`px-4 py-2 text-sm rounded-full font-semibold text-white ${
                  dipilih === pohon.id ? "bg-[#4CAF50]" : "bg-yellow-400"
                } transition-all duration-300`}
              >
                Pilih Tanaman
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
