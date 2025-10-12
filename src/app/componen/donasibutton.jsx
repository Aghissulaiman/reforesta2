"use client";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function DonasiButton({ email }) {
  const [loading, setLoading] = useState(false);

  const handleDonasi = async () => {
    const jumlah = prompt("Masukkan jumlah donasi (minimal 1000):", "5000");
    if (!jumlah || isNaN(jumlah) || jumlah < 1000) {
      alert("Nominal tidak valid!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/midtrans/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          total: parseInt(jumlah),
          email: email || "user@contoh.com",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal membuat transaksi");

      // 🟢 Pastikan Snap tersedia
      if (window.snap) {
        window.snap.pay(data.snapToken, {
          onSuccess: (result) => {
            console.log("✅ Pembayaran sukses:", result);
            alert("Terima kasih atas donasinya!");
          },
          onPending: () => alert("Pembayaran sedang diproses."),
          onError: () => alert("Terjadi kesalahan."),
        });
      } else {
        alert("Midtrans Snap belum dimuat.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDonasi}
      disabled={loading}
      className="w-full bg-[#15803D] hover:bg-[#065F46] text-white font-bold text-lg px-6 py-3 rounded-xl disabled:opacity-50"
    >
      <div className="flex items-center justify-center gap-3">
        <Heart size={20} fill="white" stroke="none" />
        {loading ? "Memproses..." : "Donasi Sekarang"}
      </div>
    </button>
  );
}
