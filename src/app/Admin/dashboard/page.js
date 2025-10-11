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
import NavbarAdmin from "@/app/componen/navbarAdmin/NavbarAdmin"; // 🔹 Import NavbarAdmin

const formatRupiah = (value) =>
  `Rp ${value.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;

const gradientBorder =
  "bg-white/50 backdrop-blur-xl border border-gray-100 shadow-xl ring-1 ring-lime-100";
const cardAnimation = { type: "spring", stiffness: 200, damping: 20 };

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

export default function Dashboard() {
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
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100/50">
      {/* 🔹 NavbarAdmin dipakai di sini */}
      <NavbarAdmin user={{ name: "Admin" }} />

      <main className="pt-32 px-6 max-w-7xl mx-auto pb-24">
        <h2 className="text-4xl font-extrabold text-green-800 mb-10 border-l-4 border-lime-500 pl-4">
          👋 Administrator Dashboard
        </h2>
        {/* konten dashboard seperti sebelumnya */}
      </main>
    </div>
  );
}
