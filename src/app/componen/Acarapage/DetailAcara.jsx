"use client";

import { MapPin, Leaf, Calendar, Flag, CheckCircle } from "lucide-react";

export default function DetailAcara() {
  return (
    <section className="w-full flex flex-col lg:flex-row items-start justify-center gap-6 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-5xl mx-auto">
      {/* Kiri: Map */}
      <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-200 shadow-sm h-[260px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.509406517316!2d106.82656587484314!3d-6.19838246071686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e79c26a3a3%3A0xe469df7c8dc2a2ab!2sDepok!5e0!3m2!1sid!2sid!4v1696500000000!5m2!1sid!2sid"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
        <div className="absolute bottom-3 left-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm">
          <p className="font-semibold">Alamat</p>
          <p className="text-gray-600">Kostrad, Depok, Jawa Barat</p>
        </div>
      </div>

      {/* Kanan: Tracking */}
      <div className="flex-1 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-bold mb-4">Tracking Kegiatan</h2>

        {/* Progress Tracker */}
        <div className="relative flex items-center justify-between mb-5 px-4">
          {/* Garis di belakang */}
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 transform -translate-y-1/2 z-0"></div>

          {/* Titik progres */}
          <div className="relative z-10 flex justify-between w-full">
            {/* Pembukaan (selesai) */}
            <div className="flex flex-col items-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-xs font-semibold mt-1">Pembukaan</p>
              <p className="text-[10px] text-gray-500">07.00–07.25</p>
            </div>

            {/* Isi Acara (berjalan) */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-[3px] border-green-600 bg-green-100 animate-pulse"></div>
              <p className="text-xs font-semibold mt-1 text-green-700">Isi Acara</p>
              <p className="text-[10px] text-gray-500">07.25–09.45</p>
            </div>

            {/* Penutupan (belum) */}
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 rounded-full border-[3px] border-gray-300 bg-white"></div>
              <p className="text-xs font-semibold mt-1">Penutupan</p>
              <p className="text-[10px] text-gray-500">09.45–10.00</p>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <p className="text-gray-600 text-sm leading-relaxed">
          Acara penghijauan dilaksanakan pada Hari Minggu, 6 Oktober 2025, di lahan
          Kostrad, Cilodong. Kegiatan berlangsung pukul 07.00–10.00 WIB dan
          diselenggarakan oleh Komunitas Hijau Bersatu. Tujuannya untuk meningkatkan
          kesadaran masyarakat akan pentingnya menanam pohon dan menjaga kelestarian
          lingkungan.
        </p>
      </div>
    </section>
  );
}
