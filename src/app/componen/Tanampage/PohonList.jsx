"use client";

import Image from "next/image";
import usePohon from "../../../../hooks/pohon";

export default function PilihBibitPohon() {
  const { pohon, loading, error } = usePohon();

  if (loading) return <p className="text-gray-500">Memuat data pohon...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <section className="w-full py-8 px-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pilih Bibit Pohon</h2>
        <p className="text-gray-600 text-sm">
          Pilih bibit pohon yang ingin kamu tanam
        </p>
      </div>

      <div className="w-[600px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        {pohon.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="relative w-[400px] h-[200px]">
              <Image
                src={item.gambar || "/placeholder.png"}
                alt={item.nama}
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-green-700 text-white text-center py-4">
              <h3 className="font-semibold text-base">{item.nama}</h3>
              <p className="text-xs mt-1">Harga: Rp {item.harga}</p>
              <button className="mt-3 bg-white text-green-700 text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-green-100 transition">
                Pilih Tanaman
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
