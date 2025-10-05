'use client'

import { motion } from 'framer-motion'

export default function DukungOleh() {
  const partners = [
    { id: 1, name: 'Kurikulum Merdeka', logo: '/Dkurikulummerdeka.jpg' },
    { id: 2, name: 'Kementerian BUMN', logo: '/Dbumn.jpg' },
    { id: 3, name: 'Kementerian Kesehatan', logo: '/Dkesehatan.jpg' },
    { id: 4, name: 'Kementerian Pendidikan', logo: '/Dpendidikan.jpg' },
    { id: 5, name: 'BPJS Kesehatan', logo: '/Dbpjs.jpg' },
    { id: 6, name: 'WHO', logo: '/Dwho.jpg' },
  ]

  // Gandakan array supaya loop terlihat mulus
  const marqueePartners = [...partners, ...partners]

  return (
    <section className="w-full bg-gray-50 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Didukung Oleh
        </h2>
        <p className="text-gray-600 mb-10 text-base md:text-lg">
          Program ini terlaksana berkat dukungan berbagai lembaga pendidikan dan kesehatan.
        </p>

        {/* ===== MARQUEE ===== */}
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex gap-12"
            // Bergerak ke kiri tanpa henti
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              duration: 20,      // kecepatan: kecil = cepat
              ease: 'linear',
            }}
          >
            {marqueePartners.map((partner, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 min-w-[140px]"
              >
                <div className="w-28 h-16 md:w-32 md:h-20 flex items-center justify-center bg-white rounded-xl shadow-sm">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm md:text-base text-gray-700 font-medium text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
