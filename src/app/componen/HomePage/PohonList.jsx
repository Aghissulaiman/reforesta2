"use client";

import Image from "next/image";

export default function PilihBibitPohon() {
  const bibit = [
    { nama: "Pohon Mahoni", harga: "Rp 13.000", img: "/bibit1.png" },
    { nama: "Pohon Mangga", harga: "Rp 15.000", img: "/bibit1.png" },
    { nama: "Pohon Jati", harga: "Rp 18.000", img: "/bibit1.png" },
    { nama: "Pohon Trembesi", harga: "Rp 20.000", img: "/bibit1.png" },
    { nama: "Pohon Sengon", harga: "Rp 12.000", img: "/bibit1.png" },
    { nama: "Pohon Durian", harga: "Rp 25.000", img: "/bibit1.png" },
  ];

  return (
    <section className="w-full py-6 pl-8">
      {/* Judul di kiri */}
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Pilih Bibit Pohon</h2>
        <p className="text-gray-600 text-sm">
          Pilih bibit pohon yang akan ditanam
        </p>
      </div>

      {/* Grid 2 kolom per baris */}
      <div className="flex flex-col items-start space-y-4">
        {[0, 1, 2].map((row) => (
          <div key={row} className="flex space-x-4">
            {bibit.slice(row * 2, row * 2 + 2).map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg overflow-hidden w-[260px] border border-gray-200 shadow-sm"
              >
                <div className="relative w-full h-[190px]">
                  <Image
                    src={item.img}
                    alt={item.nama}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#047857] text-white text-center py-3">
                  <h3 className="font-semibold text-base">{item.nama}</h3>
                  <p className="text-xs">Harga {item.harga}</p>
                  <button className="mt-2 bg-white text-[#047857] text-xs font-semibold px-3 py-1 rounded-full hover:bg-green-100 transition">
                    Pilih Tanaman
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
