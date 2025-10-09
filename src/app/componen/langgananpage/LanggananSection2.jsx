"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function LanggananSection() {
  const plans = [
    {
      nama: "Gratis",
      harga: "Rp 0",
      deskripsi: "Cocok untuk kamu yang ingin mulai berkontribusi kecil.",
      fitur: [
        "Akses informasi kegiatan",
        "Update acara lingkungan",
        "Partisipasi terbatas",
      ],
      tombol: "Mulai Gratis",
      warna: "bg-white",
      border: "border-gray-200",
      tombolWarna: "bg-gray-300 hover:bg-gray-400",
    },
    {
      nama: "Pro",
      harga: "Rp 150.000 / bulan",
      deskripsi: "Untuk kamu yang ingin terlibat lebih aktif dan berdampak.",
      fitur: [
        "Semua fitur Gratis",
        "Sertifikat keikutsertaan",
        "Akses komunitas hijau",
      ],
      tombol: "Langganan Pro",
      warna: "bg-[#E7F8EE]",
      border: "border-[#059669]",
      tombolWarna: "bg-[#059669] hover:bg-[#047857]",
    },
    {
      nama: "Premium",
      harga: "Rp 400.000 / bulan",
      deskripsi:
        "Dukung penuh gerakan hijau dan nikmati benefit eksklusif premium.",
      fitur: [
        "Semua fitur Pro",
        "Merchandise eksklusif",
        "Undangan event VIP",
        "Badge Donatur Premium",
      ],
      tombol: "Langganan Premium",
      warna: "bg-[#DCFCE7]",
      border: "border-[#059669]",
      tombolWarna: "bg-[#047857] hover:bg-[#065f46]",
    },
  ];

  return (
    <section
      id="langganan-section"
      className="bg-gradient-to-b from-white to-[#F8FCFA] py-24 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold text-gray-900">
          Pilih Paket Langgananmu
        </h2>
        <p className="text-gray-600 mt-3 max-w-lg mx-auto">
          Dukung gerakan hijau dan nikmati berbagai keuntungan sesuai pilihanmu.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className={`${plan.warna} ${plan.border} border rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {plan.nama}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{plan.deskripsi}</p>
              <p className="text-2xl font-semibold mb-6">{plan.harga}</p>
              <ul className="space-y-2 mb-6">
                {plan.fitur.map((fitur, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-700 text-sm"
                  >
                    <CheckCircle className="text-[#059669]" size={18} />
                    {fitur}
                  </li>
                ))}
              </ul>
            </div>
            <button
              className={`w-full py-3 rounded-full text-white font-medium transition ${plan.tombolWarna}`}
            >
              {plan.tombol}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
