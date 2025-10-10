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
  FiActivity,
} from "react-icons/fi";
import { FaTree, FaGift } from "react-icons/fa"; 

// Utility untuk memformat mata uang Rupiah
const formatRupiah = (value) =>
  `Rp ${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;

// Utility untuk style border modern
const gradientBorder =
  "bg-white/50 backdrop-blur-xl border border-gray-100 shadow-xl ring-1 ring-lime-100";
const cardAnimation = { type: "spring", stiffness: 200, damping: 20 };

// ========== COMPONENT: STAT CARD (Basic) ==========
function StatCard({ title, value, icon, accentColor = "text-green-600" }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }} // <-- Animasi Hover
      transition={cardAnimation}
      className={`rounded-xl p-6 ${gradientBorder} transition-all duration-300 transform`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            {title}
          </p>
          <h2 className={`text-3xl font-extrabold ${accentColor} mt-2`}>
            {value}
          </h2>
        </div>
        <div className={`text-4xl p-2 rounded-full ${accentColor}/10 ${accentColor}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// ========== HELPER COMPONENT: STAT ITEM (Dioptimalkan dengan Animasi Hover) ==========
function StatItem({ icon, title, value, color, isTotal = false }) {
  // Hanya Stat Item non-total yang memiliki efek hover dan cursor pointer
  const motionProps = isTotal 
    ? {} 
    : { whileHover: { y: -3, scale: 1.05 }, transition: cardAnimation }; 
    
  return (
    <motion.div 
      {...motionProps}
      className={`p-4 rounded-xl transition-all duration-300 
        ${isTotal 
          ? 'bg-green-100 border border-green-300 shadow-md' // Warna lebih kuat untuk total
          : 'bg-white hover:bg-lime-50 cursor-pointer shadow-sm'
        }
        flex flex-col items-center justify-center`
      }
    >
      <div className={`text-3xl mx-auto mb-1 ${color}`}>{icon}</div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </motion.div>
  );
}

// ========== COMPONENT: COMMUNITY STATS CARD ==========
function CommunityStatsCard({ stats }) {
  const total = stats.komunitasPenanam + stats.komunitasDonatur;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, ...cardAnimation }}
      className={`col-span-1 lg:col-span-2 rounded-xl p-6 ${gradientBorder}`}
    >
      <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center border-b pb-3 border-lime-100">
        <FiActivity className="mr-2 text-lime-500" /> Statistik Komunitas
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <StatItem
          icon={<FaTree />} 
          title="Penanam"
          value={stats.komunitasPenanam}
          color="text-green-600"
        />
        <StatItem
          icon={<FaGift />} 
          title="Donatur"
          value={stats.komunitasDonatur}
          color="text-lime-600"
        />
        <StatItem
          icon={<FiUsers />}
          title="Total Komunitas"
          value={total}
          color="text-gray-700"
          isTotal
        />
      </div>
    </motion.div>
  );
}

// ========== COMPONENT: NAVBAR ==========
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-green-700 tracking-tight flex items-center">
          <FaTree className="mr-2 text-lime-500" /> Reforestacia
        </h1>
        <ul className="flex gap-8 text-gray-600 font-semibold text-base">
          {["Dashboard", "Pengguna", "Transaksi", "Keluar"].map((item) => (
            <li
              key={item}
              className={`cursor-pointer transition-all duration-200 
              ${item === "Dashboard"
                  ? "text-green-700 border-b-2 border-lime-500"
                  : "hover:text-green-700 hover:border-b-2 hover:border-lime-300" 
              } py-1`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// ========== PAGE: DASHBOARD ==========
export default function Dashboard() {
  // Data Statik
  const [stats] = useState({
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
    // Data fetching logic will go here
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100/50 font-sans">
      <Navbar />

      <main className="pt-28 px-6 max-w-7xl mx-auto pb-24">
        <h2 className="text-4xl font-extrabold text-green-800 mb-10 border-l-4 border-lime-500 pl-4">
          👋 Administrator Dashboard
        </h2>

        {/* Statistik utama */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard
            title="Total Pengguna"
            value={stats.totalUsers}
            icon={<FiUsers />}
            accentColor="text-green-700"
          />
          <StatCard
            title="Dana Terkumpul"
            value={formatRupiah(stats.totalFunds)}
            icon={<FiDollarSign />}
            accentColor="text-lime-600"
          />
          <StatCard
            title="Total Donatur"
            value={stats.totalDonors}
            icon={<FiHeart />}
            accentColor="text-red-500"
          />
          <StatCard
            title="Instansi Sekolah"
            value={stats.instansiSekolah}
            icon={<FiBook />}
            accentColor="text-blue-500"
          />
        </motion.div>

        {/* Statistik Komunitas & Sekolah */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <CommunityStatsCard stats={stats} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, ...cardAnimation }}
                className={`col-span-1 ${gradientBorder} rounded-xl p-6`}
            >
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center border-b pb-3 border-blue-100">
                    <FiBook className="mr-2 text-blue-500" /> Daftar Instansi (Top 3)
                </h3>
                <div className="flex flex-col space-y-3">
                    {/* Daftar Instansi dengan Hover */}
                    <div className="flex justify-between text-base text-gray-700 p-2 bg-white rounded-lg shadow-sm hover:bg-lime-50 transition-colors cursor-pointer">
                        <span>SMA 5 Bandung</span>
                        <span className="font-semibold text-green-700">12 Donasi</span>
                    </div>
                    <div className="flex justify-between text-base text-gray-700 p-2 bg-white rounded-lg shadow-sm hover:bg-lime-50 transition-colors cursor-pointer">
                        <span>Sekolah Harapan</span>
                        <span className="font-semibold text-green-700">8 Donasi</span>
                    </div>
                    <div className="flex justify-between text-base text-gray-700 p-2 bg-white rounded-lg shadow-sm hover:bg-lime-50 transition-colors cursor-pointer">
                        <span>SMP 1 Jakarta</span>
                        <span className="font-semibold text-green-700">5 Donasi</span>
                    </div>
                </div>
            </motion.div>
        </div>


        {/* Grafik Donasi */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`col-span-full rounded-xl shadow-xl p-6 mb-12 ${gradientBorder}`}
        >
          <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center border-b pb-3 border-lime-100">
            <span className="text-2xl mr-2">📈</span> Perkembangan Donasi per Bulan
          </h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="5 5" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="month" stroke="#4b5563" fontWeight="bold" />
                <YAxis
                  stroke="#4b5563"
                  tickFormatter={(value) => formatRupiah(value).replace("Rp ", "")}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ fontWeight: "bold", color: "#166534" }}
                  formatter={(value) => [formatRupiah(value), "Total Donasi"]}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#84cc16"
                  strokeWidth={4}
                  dot={{ r: 6, fill: "#16a34a", stroke: "#fff", strokeWidth: 2 }}
                  activeDot={{ r: 9, fill: "#166534", stroke: "#fff", strokeWidth: 3 }}
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
          className={`rounded-xl shadow-xl p-6 ${gradientBorder}`}
        >
          <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
            <span className="text-2xl mr-2">💳</span> Riwayat Transaksi Terbaru
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-gray-600 border-b-2 border-lime-500/50 bg-green-50/50">
                  <th className="py-3 px-4 text-left font-bold">Nama Komunitas / Instansi</th>
                  <th className="py-3 px-4 text-left font-bold">Jumlah Donasi</th>
                  <th className="py-3 px-4 text-left font-bold">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-100 hover:bg-lime-50/50 transition-colors" 
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">{t.name}</td>
                    <td className="py-3 px-4 text-green-700 font-extrabold">
                      {formatRupiah(t.amount)}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(t.date).toLocaleDateString("id-ID", {
                        year: 'numeric', month: 'short', day: 'numeric'
                      })}
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