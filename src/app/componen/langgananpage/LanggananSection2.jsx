"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function LanggananSection() {
  const plans = [
    {
      nama: "Gratis",
      harga: "Rp 0",
      deskripsi: "Cocok untuk pemula yang ingin ikut serta dalam aksi hijau.",
      fitur: [
        "Akses informasi acara",
        "Update kegiatan terbaru",
        "Partisipasi terbatas",
      ],
      tombol: "Mulai Sekarang",
      warna: "bg-white border-gray-200",
      teks: "text-gray-800",
      tombolWarna: "bg-gray-300 hover:bg-gray-400",
    },
    {
      nama: "Pro",
      harga: "Rp 150.000 / bulan",
      deskripsi:
        "Untuk kamu yang ingin lebih aktif dan berkontribusi dalam kegiatan penghijauan.",
      fitur: [
        "Semua fitur Gratis",
        "Dapat sertifikat keikutsertaan",
        "Akses ke grup komunitas hijau",
      ],
      tombol: "Langganan Pro",
      warna: "bg-[#E7F8EE] border-[#059669]",
      teks: "text-gray-800",
      tombolWarna: "bg-[#059669] hover:bg-[#047857]",
    },
    {
      nama: "Premium",
      harga: "Rp 400.000 / bulan",
      deskripsi:
        "Dukung gerakan hijau secara penuh dan dapatkan banyak benefit eksklusif!",
      fitur: [
        "Semua fitur Pro",
        "Merchandise eksklusif",
        "Undangan event VIP",
        "Badge Donatur Premium",
      ],
      tombol: "Langganan Premium",
      warna: "bg-[#DCFCE7] border-[#059669]",
      teks: "text-gray-900",
      tombolWarna: "bg-[#047857] hover:bg-[#065f46]",
    },
  ];

  return (
    <section className="bg-white min-h-screen flex flex-col items-center justify-center py-16 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Pilih Paket Langgananmu 🌿
        </h1>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Dukung gerakan hijau dan nikmati berbagai keuntungan sesuai paket yang
          kamu pilih.
        </p>
      </motion.div>

      {/* Card Langganan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className={`${plan.warna} border rounded-2xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition`}
          >
            <div>
              <h2 className={`text-xl font-bold mb-1 ${plan.teks}`}>
                {plan.nama}
              </h2>
              <p className="text-sm text-gray-600 mb-4">{plan.deskripsi}</p>
              <p className="text-2xl font-bold mb-4">{plan.harga}</p>
              <ul className="space-y-2 mb-6">
                {plan.fitur.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <CheckCircle className="text-[#059669]" size={16} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`w-full py-2 rounded-lg text-white font-medium transition ${plan.tombolWarna}`}
            >
              {plan.tombol}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
