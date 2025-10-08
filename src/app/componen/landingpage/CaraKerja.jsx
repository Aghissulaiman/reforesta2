"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function CaraKerja() {
  const langkah = [
    {
      nama: "Pilih Tanaman",
      icon: "/LPilih.png",
      deskripsi: "Kamu memilih jenis tanaman yang ingin didonasikan sesuai preferensi.",
    },
    {
      nama: "Tunggu Disalurkan",
      icon: "/LSalurkan.png",
      deskripsi: "Bibit tanaman akan disalurkan oleh tim ke lokasi penghijauan.",
    },
    {
      nama: "Ditanam",
      icon: "/LTanam.png",
      deskripsi: "Tanaman ditanam langsung oleh relawan atau komunitas kami.",
    },
    {
      nama: "Dokumentasi",
      icon: "/LDokumentasi.png",
      deskripsi: "Kamu menerima laporan dokumentasi hasil penanaman.",
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Judul */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-20">
          Bagaimana Website Kami Bekerja
        </h2>

        {/* Timeline horizontal */}
        <div className="relative flex flex-col md:flex-row items-center justify-between md:gap-10">
          <div className="hidden md:block absolute top-[95px] left-0 w-full h-[3px] bg-gray-200 rounded-full"></div>

          {langkah.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex flex-col items-center text-center bg-white shadow-md rounded-2xl p-6 w-full md:w-[220px] hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="hidden md:block absolute -top-[50px] w-5 h-5 bg-green-500 rounded-full border-4 border-white shadow-md" />

              <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mb-4 shadow-inner">
                <Image
                  src={item.icon}
                  alt={item.nama}
                  width={45}
                  height={45}
                  className="object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.nama}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.deskripsi}
              </p>

              {index !== langkah.length - 1 && (
                <div className="md:hidden w-[2px] h-10 bg-green-400 mt-6"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
