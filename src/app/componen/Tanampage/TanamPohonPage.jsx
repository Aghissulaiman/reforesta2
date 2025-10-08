"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import usePohon from "../../../../hooks/pohon";
import useDaerah from "../../../../hooks/daerah";

export default function TanamPohonPage() {
  const { pohon, loading: loadingPohon, error: errorPohon } = usePohon();
  const { daerah, loading: loadingDaerah, error: errorDaerah } = useDaerah();

  const [index, setIndex] = useState(0);
  const [lokasiTerpilih, setLokasiTerpilih] = useState(null);
  const [bibitTerpilih, setBibitTerpilih] = useState([]);
  const [lokasiAktif, setLokasiAktif] = useState(false);

  // Navigasi Carousel
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

  const toggleBibit = (item) => {
    const exists = bibitTerpilih.find((b) => b.nama === item.nama);
    if (exists) {
      setBibitTerpilih(bibitTerpilih.filter((b) => b.nama !== item.nama));
    } else {
      setBibitTerpilih([...bibitTerpilih, { ...item, jumlah: 1 }]);
    }
  };

  const updateJumlah = (nama, jumlah) => {
    setBibitTerpilih(
      bibitTerpilih.map((b) =>
        b.nama === nama ? { ...b, jumlah: Math.max(1, jumlah) } : b
      )
    );
  };

  const totalHarga = bibitTerpilih.reduce(
    (acc, b) => acc + b.harga * b.jumlah,
    0
  );

  return (
    <section className="w-full px-6 py-10 flex flex-col lg:flex-row gap-10">
      {/* Bagian Kiri */}
      <div className="flex-1 space-y-12">
        {/* Carousel Lokasi */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pilih Lokasi Penanaman
          </h2>
          {loadingDaerah ? (
            <p className="text-gray-500">Memuat data lokasi...</p>
          ) : errorDaerah ? (
            <p className="text-red-500">Error: {errorDaerah}</p>
          ) : (
            <div className="flex items-center justify-center relative">
              <button
                onClick={prevSlide}
                className="absolute left-0 z-20 bg-green-600 text-white p-3 rounded-full shadow-md hover:bg-green-700 transition"
              >
                <FaChevronLeft />
              </button>

              <div className="relative w-full max-w-[700px] h-[260px] flex items-center justify-center overflow-hidden">
                {daerah.map((item, i) => {
                  const pos = getPosition(i);
                  let x = 0,
                    scale = 1,
                    zIndex = 1,
                    opacity = 1;

                  if (pos === "left") {
                    x = -240;
                    scale = 0.85;
                    opacity = 0.5;
                  } else if (pos === "right") {
                    x = 240;
                    scale = 0.85;
                    opacity = 0.5;
                  } else if (pos === "center") {
                    x = 0;
                    scale = 1;
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
                      <div className="relative w-[260px] h-[240px] rounded-xl overflow-hidden shadow-lg">
                        <Image
                          src={item.gambar}
                          alt={item.daerah}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute inset-0 ${
                            pos === "center"
                              ? "bg-black/20"
                              : "bg-black/60"
                          } transition-all duration-500`}
                        />
                        <h3
                          className={`absolute inset-0 flex items-center justify-center text-white font-semibold text-lg transition-opacity duration-500`}
                        >
                          {pos === "center" ? item.daerah : ""}
                        </h3>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <button
                onClick={nextSlide}
                className="absolute right-0 z-20 bg-green-600 text-white p-3 rounded-full shadow-md hover:bg-green-700 transition"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Pilih Bibit */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Pilih Bibit Pohon
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {loadingPohon ? (
              <p className="text-gray-500">Memuat data pohon...</p>
            ) : errorPohon ? (
              <p className="text-red-500">Error: {errorPohon}</p>
            ) : (
              pohon.map((item, i) => {
                const isSelected = bibitTerpilih.some(
                  (b) => b.nama === item.nama
                );
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border-2 ${
                      isSelected ? "border-green-500" : "border-gray-200"
                    }`}
                  >
                    <div className="relative w-full h-[200px]">
                      <Image
                        src={item.gambar || "/placeholder.png"}
                        alt={item.nama}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col items-center bg-green-700 text-white">
                      <h3 className="font-semibold text-base">{item.nama}</h3>
                      <p className="text-xs mt-1">
                        Rp {item.harga.toLocaleString("id-ID")} / bibit
                      </p>
                      <button
                        onClick={() => toggleBibit(item)}
                        className={`mt-3 px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                          isSelected
                            ? "bg-white text-green-700 hover:bg-gray-100"
                            : "bg-white text-green-700 hover:bg-green-100"
                        }`}
                      >
                        {isSelected ? "Batal Pilih" : "Pilih Bibit"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bagian Kanan: Detail Pembayaran */}
     <div className="w-full lg:w-[360px]">
  <div className="sticky top-24 bg-white rounded-2xl shadow-xl p-6 space-y-4">
    <h3 className="text-xl font-semibold text-gray-800 mb-2">Detail Penanaman</h3>
    
    {/* Lokasi */}
    <div className="flex justify-between items-center text-gray-700">
      <span className="font-medium">Lokasi</span>
      <span className="text-green-600 font-semibold">
        {lokasiTerpilih?.daerah || "-"}
      </span>
    </div>

    {/* Bibit Terpilih */}
    <div className="mt-4">
      <h4 className="text-gray-800 font-medium mb-2">Bibit Terpilih</h4>
      {bibitTerpilih.length === 0 ? (
        <p className="text-gray-400 text-sm">Belum ada bibit dipilih</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {bibitTerpilih.map((b, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 relative rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={b.gambar || "/placeholder.png"}
                    alt={b.nama}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{b.nama}</span>
                  <span className="text-gray-500 text-sm">
                    Rp {b.harga.toLocaleString("id-ID")} / bibit
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={1}
                  value={b.jumlah}
                  onChange={(e) =>
                    updateJumlah(b.nama, parseInt(e.target.value))
                  }
                  className="w-14 text-center text-sm border rounded-lg p-1"
                />
                <button
                  onClick={() =>
                    setBibitTerpilih(
                      bibitTerpilih.filter((item) => item.nama !== b.nama)
                    )
                  }
                  className="text-red-500 hover:text-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Total */}
    <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
      <span className="text-gray-800 font-semibold text-lg">Total</span>
      <span className="text-green-600 font-bold text-lg">
        Rp {totalHarga.toLocaleString("id-ID")}
      </span>
    </div>

    {/* Button Bayar */}
<button
  disabled={!lokasiTerpilih || bibitTerpilih.length === 0}
  className={`w-full py-3 rounded-xl font-semibold transition text-white text-lg ${
    !lokasiTerpilih || bibitTerpilih.length === 0
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>
  Bayar
</button>
  </div>
</div>
    </section>
  );
}
