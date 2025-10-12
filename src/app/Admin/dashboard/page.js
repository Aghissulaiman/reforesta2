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
import NavbarAdmin from "@/app/componen/navbarAdmin/navbarAdmin";

const formatRupiah = (value) =>
  `Rp ${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;

const gradientBorder =
  "bg-white/60 backdrop-blur-xl border border-gray-200 shadow-lg ring-1 ring-lime-100";
const cardAnimation = { type: "spring", stiffness: 200, damping: 20 };

// ==================== DATA DUMMY ====================
const dummyStats = {
  totalUsers: 523,
  totalFunds: 4780000,
  totalDonors: 87,
  instansiSekolah: 18,
  komunitasPenanam: 45,
  komunitasDonatur: 32,
};

const dummyChart = [
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
];

const dummyTransactions = [
  { name: "Komunitas Alam Lestari", amount: 250000, date: "2025-10-08" },
  { name: "Sekolah Harapan Bangsa", amount: 500000, date: "2025-10-07" },
  { name: "Komunitas Hijau Daun", amount: 100000, date: "2025-10-06" },
  { name: "Yayasan Bumi Indah", amount: 450000, date: "2025-10-05" },
  { name: "SMAN 1 Sejuk Rimba", amount: 750000, date: "2025-10-04" },
];

// ==================== KOMPONEN KARTU STATISTIK ====================
function StatCard({ title, value, icon, accentColor = "text-green-600" }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={cardAnimation}
      className={`rounded-xl p-6 ${gradientBorder}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase">
            {title}
          </p>
          <h2 className={`text-3xl font-extrabold ${accentColor} mt-2`}>
            {value}
          </h2>
        </div>
        <div className={`text-4xl p-2 rounded-full ${accentColor}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// ==================== KOMPONEN STAT KOMUNITAS ====================
function StatItem({ icon, title, value, color, isTotal = false }) {
  const motionProps = isTotal
    ? {}
    : { whileHover: { y: -3, scale: 1.05 }, transition: cardAnimation };

  return (
    <motion.div
      {...motionProps}
      className={`p-4 rounded-xl ${
        isTotal
          ? "bg-green-100 border border-green-300 shadow-md"
          : "bg-white hover:bg-lime-50 cursor-pointer shadow-sm"
      } flex flex-col items-center`}
    >
      <div className={`text-3xl mb-1 ${color}`}>{icon}</div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </motion.div>
  );
}

function CommunityStatsCard({ stats }) {
  const total = stats.komunitasPenanam + stats.komunitasDonatur;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1, ...cardAnimation }}
      className={`col-span-1 lg:col-span-2 rounded-xl p-6 ${gradientBorder}`}
    >
      <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center border-b pb-3">
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

// ==================== DASHBOARD ADMIN ====================
export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setStats(dummyStats);
    setChartData(dummyChart);
    setTransactions(dummyTransactions);
  }, []);

  if (!stats || !chartData.length) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100/50">
      <NavbarAdmin user={{ name: "Admin" }} />

      <main className="pt-32 px-6 max-w-7xl mx-auto pb-24">
        <h2 className="text-4xl font-extrabold text-green-800 mb-10 border-l-4 border-lime-500 pl-4">
          👋 Administrator Dashboard
        </h2>

        {/* ===== GRID STAT ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Pengguna"
            value={stats.totalUsers}
            icon={<FiUsers />}
          />
          <StatCard
            title="Dana Terkumpul"
            value={formatRupiah(stats.totalFunds)}
            icon={<FiDollarSign />}
            accentColor="text-lime-600"
          />
          <StatCard
            title="Jumlah Donatur"
            value={stats.totalDonors}
            icon={<FiHeart />}
            accentColor="text-rose-600"
          />
        </div>

        {/* ===== KOMUNITAS CARD ===== */}
        <CommunityStatsCard stats={stats} />

        {/* ===== CHART DONASI ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardAnimation}
          className={`mt-10 rounded-xl p-6 ${gradientBorder}`}
        >
          <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center border-b pb-3">
            <FiBook className="mr-2 text-lime-500" /> Grafik Dana Bulanan
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => formatRupiah(value)}
                labelFormatter={(label) => `Bulan: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ===== TRANSAKSI TERBARU ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={cardAnimation}
          className={`mt-10 rounded-xl p-6 ${gradientBorder}`}
        >
          <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center border-b pb-3">
            <FiDollarSign className="mr-2 text-lime-500" /> Riwayat Transaksi
          </h3>
          <ul className="divide-y divide-gray-200">
            {transactions.map((t, i) => (
              <li
                key={i}
                className="py-4 flex justify-between items-center hover:bg-lime-50 transition"
              >
                <div>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(t.date).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <span className="font-bold text-green-700">
                  {formatRupiah(t.amount)}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
