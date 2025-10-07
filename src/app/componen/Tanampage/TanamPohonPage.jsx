"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import usePohon from "../../../../hooks/pohon";
import useDaerah from "../../../../hooks/daerah";

export default function TanamPohonPage() {
  const { pohon, loading: loadingPohon, error: errorPohon } = usePohon();
  const { daerah, loading: loadingDaerah, error: errorDaerah } = useDaerah();

  const [index, setIndex] = useState(0);
  const [lokasiTerpilih, setLokasiTerpilih] = useState(null);
  const [bibitTerpilih, setBibitTerpilih] = useState(null);
  const [lokasiAktif, setLokasiAktif] = useState(false); // new state

  // === Navigasi Carousel Lokasi ===
  const nextSlide = () => {
    const newIndex = (index + 1) % daerah.length;
    setIndex(newIndex);
    setLokasiTerpilih(daerah[newIndex]);
    setLokasiAktif(true);
  };

  const prevSlide = () => {
    const newIndex = (index - 1 + daerah.length) % daerah.length;
    setIndex(newIndex);
    setLokasiTerpilih(daerah[newIndex]);
    setLokasiAktif(true);
  };

  const getPosition = (i) => {
    const diff = (i - index + daerah.length) % daerah.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -daerah.length + 1) return "right";
    if (diff === daerah.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <section className="w-full px-6 py-10 flex flex-col lg:flex-row gap-10 relative">
      {/* === Bagian Kiri: Pilih Lokasi & Bibit === */}
      <div className="flex-1 space-y-12">
        {/* Lokasi */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Pilih Lokasi Penanaman
          </h2>
          {loadingDaerah ? (
            <p className="text-gray-500">Memuat data lokasi...</p>
          ) : errorDaerah ? (
            <p className="text-red-500">Error: {errorDaerah}</p>
          ) : (
            <div className="flex items-center justify-center">
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
                            lokasiAktif
                              ? pos === "center"
                                ? "opacity-100"
                                : "opacity-0"
                              : "opacity-100"
                          }`}
                        >
                          {lokasiAktif
                            ? pos === "center"
                              ? item.daerah
                              : ""
                            : "Pilih Lokasi"}
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
          )}
        </div>

        {/* Bibit */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Pilih Bibit Pohon
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Pilih bibit pohon yang ingin kamu tanam 🌱
          </p>
          {loadingPohon ? (
            <p className="text-gray-500">Memuat data pohon...</p>
          ) : errorPohon ? (
            <p className="text-red-500">Error: {errorPohon}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {pohon.map((item, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-xl overflow-hidden border-2 ${
                    bibitTerpilih?.nama === item.nama
                      ? "border-green-600"
                      : "border-gray-200"
                  } shadow-sm hover:shadow-md transition`}
                >
                  <div className="relative w-full h-[200px]">
                    <Image
                      src={item.gambar || "/placeholder.png"}
                      alt={item.nama}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-green-700 text-white text-center py-4">
                    <h3 className="font-semibold text-base">{item.nama}</h3>
                    <p className="text-xs mt-1">
                      Harga: Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => setBibitTerpilih(item)}
                      className="mt-3 bg-white text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-green-100 transition"
                    >
                      Pilih Tanaman
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* === Bagian Kanan: Detail Pembayaran (Sticky) === */}
      <div className="w-full lg:w-[300px]">
        <div className="sticky top-24 bg-white border border-gray-200 shadow-md rounded-xl p-6 h-fit">
          <p className="text-black text-base font-medium flex justify-between">
            <span>Lokasi</span>
            <span>{lokasiTerpilih?.daerah || "-"}</span>
          </p>
          <p className="text-black text-base font-medium flex justify-between mt-2">
            <span>Jenis Bibit</span>
            <span>{bibitTerpilih?.nama || "-"}</span>
          </p>
          <p className="text-black text-base font-medium flex justify-between mt-2">
            <span>Jumlah Bibit</span>
            <span>1</span>
          </p>
          <p className="text-black text-base font-medium flex justify-between mt-2">
            <span>Total</span>
            <span>
              Rp{" "}
              {bibitTerpilih
                ? bibitTerpilih.harga.toLocaleString("id-ID")
                : "0"}
            </span>
          </p>

          <button
            disabled={!bibitTerpilih || !lokasiTerpilih}
            className={`mt-6 w-full py-2 rounded-lg font-semibold transition ${
              !bibitTerpilih || !lokasiTerpilih
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            Bayar
          </button>
        </div>
      </div>
    </section>
  );
}
