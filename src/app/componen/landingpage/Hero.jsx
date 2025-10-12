"use client";

import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Hero() {
  // 🔁 Reusable animasi scroll
  const ScrollAnimate = ({ children, type = "fade-up", delay = 0 }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });

    useEffect(() => {
      if (inView) controls.start("visible");
      else controls.start("hidden");
    }, [inView, controls]);

    const variants = {
      "fade-up": { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
      "fade-down": { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } },
      "slide-left": { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0 } },
      "slide-right": { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0 } },
      "zoom": { hidden: { opacity: 0, scale: 0.7 }, visible: { opacity: 1, scale: 1 } },
      "rotate": { hidden: { opacity: 0, rotate: -10, scale: 0.9 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
    };

    return (
      <motion.div
        ref={ref}
        variants={variants[type]}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <section className="w-full bg-white mt-7 py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* === BAGIAN KIRI === */}
        <ScrollAnimate type="slide-left">
          <div className="flex flex-col justify-center md:w-1/2 h-full md:h-[500px] text-center md:text-left">
            <div className="flex flex-col items-center md:items-start justify-center space-y-5">
              
              {/* Logo + Judul */}
              <ScrollAnimate type="fade-down" delay={0.2}>
                <div className="flex flex-col items-center md:items-start justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-24 h-24 text-[#047857] mx-auto md:mx-0 items-center object-contain"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M24 42V26m17.942-15.993c-.776 13.024-9.13 17.236-15.946 17.896C24.896 28.009 24 27.104 24 26v-8.372c0-.233.04-.468.125-.684C27.117 9.199 34.283 8.155 40 8.02c1.105-.027 2.006.884 1.94 1.987M7.998 6.072c9.329.685 14.197 6.091 15.836 9.558c.115.242.166.508.166.776v7.504c0 1.14-.96 2.055-2.094 1.94C7.337 24.384 6.11 14.786 6.009 8C5.993 6.894 6.897 5.99 8 6.072"
                    />
                  </svg>
                  <h1 className="text-4xl font-extrabold text-[#059669] tracking-wide">
                    REFORESTACIA
                  </h1>
                </div>
              </ScrollAnimate>

              {/* Deskripsi */}
              <ScrollAnimate type="fade-up" delay={0.4}>
                <p className="text-gray-600 text-lg max-w-sm leading-relaxed mx-auto md:mx-0">
                  Cara paling sederhana untuk menyalurkan dana untuk penghijauan.
                </p>
              </ScrollAnimate>

              {/* Tombol */}
              <ScrollAnimate type="zoom" delay={0.6}>
                <button className="px-8 py-2 border-2 border-[#059669] text-[#059669] font-semibold rounded-full hover:bg-[#059669] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                  Mulai Sekarang
                </button>
              </ScrollAnimate>
            </div>
          </div>
        </ScrollAnimate>

        {/* === BAGIAN KANAN === */}
        <ScrollAnimate type="slide-right" delay={0.2}>
          <div className="flex flex-col items-center md:items-end relative">
            
            {/* Video Hero */}
         <motion.div
  className="relative z-10 rounded-xl overflow-hidden shadow-lg w-[360px] sm:w-[420px] md:w-[500px] aspect-[16/9]"
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.4 }}
>
  <Image
    src="/Tanaman1.png"
    alt="Tanaman 1"
    fill
    className="object-cover w-full h-full"
  />
</motion.div>


            {/* Kotak Statistik */}
            <ScrollAnimate type="fade-up" delay={0.5}>
              <div className="flex gap-4 mr-60 mt-[-35px]">
                {/* Komunitas */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#059669] text-white px-5 py-3 rounded-xl shadow-md flex flex-col items-center min-w-[120px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mb-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 11c1.657 0 3-1.343 3-3S17.657 5 16 5s-3 1.343-3 3s1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4zM8 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6zm-4 2c2.21 0 6 1.104 6 3v2H0v-2c0-1.896 3.79-3 6-3z" />
                  </svg>
                  <p className="text-lg font-semibold leading-none">3</p>
                  <p className="text-xs">Komunitas</p>
                </motion.div>

                {/* Bibit Ditanam */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-[#047857] text-white px-5 py-3 rounded-xl shadow-md flex flex-col items-center min-w-[120px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mb-1"
                    viewBox="0 0 36 36"
                    fill="currentColor"
                  >
                    <path d="M18 2C10.8 1.7 4.8 7.3 4.5 14.5S9.8 27.7 17 28v-5.2l-5.2-5.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L17 20v-6.2l-2.7-2.7c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L19 13v3l3.3-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4L19 18.8V28c7.2-.3 12.8-6.3 12.5-13.5S25.2 1.7 18 2" />
                  </svg>
                  <p className="text-lg font-semibold leading-none">1000</p>
                  <p className="text-xs">Bibit Ditanam</p>
                </motion.div>
              </div>
            </ScrollAnimate>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}
