"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function HistoryPembayaran() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [riwayat, setRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      ambilData(session.user.id);
    }
  }, [session]);

 const ambilData = async () => {
  try {
    setLoading(true);
    const res = await fetch("/api/transaksi/user");
    if (!res.ok) throw new Error("Gagal ambil data transaksi");
    const data = await res.json();
    setRiwayat(data || []);
  } catch (err) {
    console.error("Gagal ambil data transaksi:", err.message);
  } finally {
    setLoading(false);
  }
};

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <FaCheckCircle className="text-green-600 w-5 h-5" />;
      case "pending":
        return <FaClock className="text-yellow-500 w-5 h-5" />;
      case "failed":
        return <FaTimesCircle className="text-red-600 w-5 h-5" />;
      default:
        return <FaClock className="text-gray-400 w-5 h-5" />;
    }
  };

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-700">
        <p>Kamu belum login 😢</p>
        <a
          href="/login"
          className="mt-4 px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Masuk Sekarang
        </a>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 animate-pulse">Memuat riwayat pembayaran...</p>
      </div>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Riwayat Pembayaran 🌱
      </h2>

      {riwayat.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>Belum ada riwayat pembayaran.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {riwayat.map((trx, i) => (
            <motion.div
              key={trx.order_id || i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(trx.status)}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {trx.order_id}
                  </h3>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(trx.transaction_time).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div className="text-gray-700 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p>
                  <span className="font-medium">Lokasi: </span>
                  {trx.lokasi}
                </p>
                <p>
                  <span className="font-medium">Total: </span>Rp{" "}
                  {trx.total_harga?.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="mt-4 bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Bibit yang Ditambahkan:
                </h4>
                <ul className="list-disc ml-5 text-gray-600 space-y-1">
                  {trx.bibit?.map((b, j) => (
                    <li key={j}>
                      {b.nama} — {b.jumlah}x @ Rp{" "}
                      {b.harga.toLocaleString("id-ID")}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex justify-end">
                <span
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                    trx.status === "success"
                      ? "bg-green-100 text-green-700"
                      : trx.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {trx.status.toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
