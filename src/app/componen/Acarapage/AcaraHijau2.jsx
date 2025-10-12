"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf, Clock, MapPin } from "lucide-react";

export default function AcaraHijau() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, rotate: 5 },
    visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: [0.17, 0.67, 0.83, 0.67] } },
  };
  
  const highlights = [
    { icon: Leaf, text: "Ribuan Aksi", color: "text-green-600" },
    { icon: MapPin, text: "Lokasi Nasional", color: "text-indigo-600" },
    { icon: Clock, text: "Update Real-time", color: "text-amber-500" },
  ];

  return (
    // PERUBAHAN UTAMA DI SINI:
    // Mengganti py-XX menjadi pt-0 (padding top nol) dan pb-XX (padding bottom sedang).
    // Menghapus 'bg-white' agar transparan/mengambil warna background dari parent.
    <section className="relative pt-0 pb-24 lg:pb-36 overflow-hidden">
      
      {/* Bentuk Latar Belakang Hijau Lembut (Asimetris) DIHAPUS, tetap bersih */}

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* BAGIAN TEKS DAN KONTEN (KIRI) */}
          <div className="w-full lg:w-6/12 text-center lg:text-left">
            <motion.p 
                className="text-sm font-bold uppercase tracking-[0.2em] text-green-600 mb-2"
                variants={textVariants}
            >
                
            </motion.p>
            
            <motion.h2 
                // Mengurangi margin-top bawaan pada judul di mobile agar semakin naik
                className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
                variants={textVariants}
            >
                Temukan Acara <span className="text-green-700">Tanam & Aksi</span> di Dekat Anda
            </motion.h2>
            
            <motion.p 
                className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8"
                variants={textVariants}
            >
                Dapatkan informasi terkini tentang aksi penghijauan, *clean-up*, dan kegiatan edukasi lingkungan yang terorganisir di seluruh wilayah Indonesia. Mari berkontribusi aktif!
            </motion.p>
            
            {/* Highlight Fitur (Card Mini) */}
            <motion.div 
                className="flex justify-center lg:justify-start gap-4 mb-10"
                variants={containerVariants}
            >
                {highlights.map((h, i) => (
                    <motion.div 
                        key={i} 
                        className="flex items-center space-x-2 p-3 rounded-xl shadow-md border border-gray-100 bg-white" 
                        variants={itemVariants}
                    >
                        <h.icon className={`w-5 h-5 ${h.color}`} />
                        <span className="text-sm font-semibold text-gray-700">{h.text}</span>
                    </motion.div>
                ))}
            </motion.div>


            <motion.div variants={textVariants}>
              <button
                onClick={() => {
                  const section = document.getElementById("daftar-acara");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center px-10 py-3.5 bg-green-700 text-white text-lg font-bold rounded-xl shadow-xl shadow-green-300 hover:bg-green-800 transition duration-300 transform hover:scale-[1.05]"
              >
                Jelajahi Acara Sekarang &rarr;
              </button>
            </motion.div>

          </div>

          {/* BAGIAN GAMBAR (KANAN) - Visual Asimetris & Mengambang */}
          <div className="w-full lg:w-6/12 relative">
            <motion.div 
              className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white group"
              variants={imageVariants}
              whileHover={{ y: -5, rotate: -1 }} 
            >
              <Image
                src="/AcaraHijau2.png" 
                alt="Aksi Tanam Pohon dan Penghijauan"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 90vw, 45vw"
                priority
              />
              <div className="absolute inset-0 bg-green-900 opacity-10 rounded-[3rem] pointer-events-none"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}