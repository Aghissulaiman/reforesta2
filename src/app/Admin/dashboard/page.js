"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FiUsers,
  FiHeart,
  FiBook,
  FiDollarSign,
  FiDatabase,
} from "react-icons/fi";

// ========== COMPONENT: STAT CARD ==========
function StatCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-md hover:shadow-xl flex justify-between items-center transition-all"
    >
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h2 className="text-2xl font-bold text-emerald-600 mt-1">{value}</h2>
      </div>
      <div className="text-3xl text-emerald-500">{icon}</div>
    </motion.div>
  );
}

// ========== COMPONENT: NAVBAR ==========
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-600 tracking-tight">
          🌿 Reforestacia Admin
        </h1>
        <ul className="flex gap-6 text-gray-700 font-medium">
          <li className="hover:text-emerald-600 cursor-pointer transition-colors">
            Dashboard
          </li>
          <li className="hover:text-emerald-600 cursor-pointer transition-colors">
            Pengguna
          </li>
          <li className="hover:text-emerald-600 cursor-pointer transition-colors">
            Transaksi
          </li>
          <li className="hover:text-emerald-600 cursor-pointer transition-colors">
            Keluar
          </li>
        </ul>
      </div>
    </nav>
  );
}

// ========== PAGE: DASHBOARD ==========
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 523,
    totalFunds: 4780000,
    totalDonors: 87,
    instansiSekolah: 18,
    komunitasPenanam: 45,
    komunitasDonatur: 32,
  });

  const [chartData] = useState([
    { month: "Jan", total: 300000 },
    { month: "Feb", total: 500000 },
    { month: "Mar", total: 450000 },
    { month: "Apr", total: 700000 },
    { month: "Mei", total: 850000 },
    { month: "Jun", total: 900000 },
    { month: "Jul", total: 950000 },
    { month: "Agu", total: 1100000 },
    { month: "Sep", total: 1200000 },
    { month: "Okt", total: 1300000 },
  ]);

  const [transactions] = useState([
    { name: "Komunitas Alam Lestari", amount: 250000, date: "2025-10-08" },
    { name: "Sekolah Harapan Bangsa", amount: 500000, date: "2025-10-07" },
    { name: "Komunitas Hijau Daun", amount: 100000, date: "2025-10-06" },
    { name: "SMAN 5 Bandung", amount: 150000, date: "2025-10-05" },
    { name: "Komunitas Pohon Kita", amount: 200000, date: "2025-10-04" },
  ]);

  useEffect(() => {
    // nanti kalau mau integrasi Supabase, panggil fetch data di sini
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
      <Navbar />

      <main className="pt-28 px-6 max-w-7xl mx-auto pb-24">
        <h2 className="text-3xl font-bold text-emerald-700 mb-10">
          Dashboard Admin
        </h2>

        {/* Statistik utama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Pengguna" value={stats.totalUsers} icon={<FiUsers />} />
          <StatCard
            title="Dana Terkumpul"
            value={`Rp ${stats.totalFunds.toLocaleString("id-ID")}`}
            icon={<FiDollarSign />}
          />
          <StatCard title="Total Donatur" value={stats.totalDonors} icon={<FiHeart />} />
          <StatCard
            title="Instansi Sekolah"
            value={stats.instansiSekolah}
            icon={<FiBook />}
          />
        </div>

        {/* Statistik Komunitas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <StatCard title="Komunitas Penanam" value={stats.komunitasPenanam} icon="🌿" />
          <StatCard title="Komunitas Donatur" value={stats.komunitasDonatur} icon="🎁" />
          <StatCard
            title="Total Semua Komunitas"
            value={stats.komunitasPenanam + stats.komunitasDonatur}
            icon={<FiDatabase />}
          />
        </div>

        {/* Grafik Donasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-md p-6 mb-12"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            📈 Perkembangan Donasi per Bulan
          </h3>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Riwayat Transaksi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            💳 Riwayat Transaksi
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-gray-600 border-b border-gray-200">
                  <th className="py-3 text-left">Nama Komunitas / Instansi</th>
                  <th className="py-3 text-left">Jumlah</th>
                  <th className="py-3 text-left">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr
                    key={i}
                    className="hover:bg-emerald-50 transition-colors border-b"
                  >
                    <td className="py-3 font-medium text-gray-700">{t.name}</td>
                    <td className="py-3 text-emerald-600 font-semibold">
                      Rp {t.amount.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3 text-gray-500">
                      {new Date(t.date).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
