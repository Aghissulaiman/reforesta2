"use client";

import { useState, useEffect } from "react";
import NavbarAdmin from "@/app/componen/navbarAdmin/NavbarAdmin";

export default function TransaksiPage() {
  const [transactions, setTransactions] = useState([
    // 🔹 Contoh data dummy (nanti bisa diganti dari Supabase / Midtrans webhook)
    {
      id: "TRX-001",
      nama: "Andi Pratama",
      email: "andi@mail.com",
      amount: 150000,
      payment_type: "bank_transfer",
      status: "settlement",
      date: "2025-10-10 14:32",
    },
    {
      id: "TRX-002",
      nama: "Budi Santoso",
      email: "budi@mail.com",
      amount: 80000,
      payment_type: "gopay",
      status: "pending",
      date: "2025-10-10 13:10",
    },
    {
      id: "TRX-003",
      nama: "Siti Rahma",
      email: "siti@mail.com",
      amount: 50000,
      payment_type: "qris",
      status: "cancel",
      date: "2025-10-09 10:25",
    },
  ]);

  useEffect(() => {
    // nanti bisa ambil data dari Supabase / Midtrans API
  }, []);

  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const statusColor = (status) => {
    switch (status) {
      case "settlement":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancel":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🔹 Navbar Admin */}
      <NavbarAdmin user={{ name: "Admin" }} />

      {/* 🔹 Konten halaman */}
      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-green-700 mb-6">
          Riwayat Transaksi Pengguna
        </h1>

        {/* 🔹 Tabel transaksi */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID Transaksi</th>
                <th className="px-4 py-3 text-left">Nama Pengguna</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-right">Jumlah</th>
                <th className="px-4 py-3 text-left">Metode Pembayaran</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-left">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((trx) => (
                  <tr
                    key={trx.id}
                    className="border-b hover:bg-green-50 transition"
                  >
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {trx.id}
                    </td>
                    <td className="px-4 py-3">{trx.nama}</td>
                    <td className="px-4 py-3 text-gray-600">{trx.email}</td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      {formatRupiah(trx.amount)}
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-700">
                      {trx.payment_type.replace("_", " ")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                          trx.status
                        )}`}
                      >
                        {trx.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{trx.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-gray-500 py-6 italic"
                  >
                    Belum ada data transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
