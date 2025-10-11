"use client";

import { useState, useEffect } from "react";
import { Star, Home, Users, CheckCircle } from "lucide-react";
import NavbarAll from "@/app/componen/HomePage/NavbarAll";
import NavbarDonatur from "@/app/componen/HomePage/NavbarDonatur";
import Footer from "@/app/componen/landingpage/Footer";

export default function Langganan() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const plans = [
    {
      icon: <Star className="w-6 h-6 text-green-500" />,
      title: "Trial",
      desc: "Coba layanan kami selama 3 bulan",
      price: 0,
      displayPrice: "GRATIS",
      per: "/ 3 BULAN",
      features: ["Akses terbatas", "Dukungan komunitas", "Contoh proyek"],
      isPopular: false,
    },
    {
      icon: <Home className="w-6 h-6 text-white" />,
      title: "Standard",
      desc: "Ideal untuk penggunaan pribadi",
      price: 150000,
      displayPrice: "Rp 150.000",
      per: "/ BULAN",
      features: [
        "Semua fitur Trial",
        "Akses penuh fitur",
        "Dukungan 24/7",
        "Analitik bulanan",
      ],
      isPopular: true,
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Premium",
      desc: "Paket hemat 3 bulan",
      price: 400000,
      displayPrice: "Rp 400.000",
      per: "/ 3 BULAN",
      features: [
        "Semua fitur Standard",
        "Akses fitur Premium",
        "Konsultasi khusus",
      ],
      isPopular: false,
    },
  ];

  // 🟢 Ambil user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🟢 Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY
    );
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-600 animate-pulse">Memuat data...</p>
      </div>
    );

  const NavbarComponent =
    user?.role === "donatur" ? (
      <NavbarDonatur user={user} />
    ) : (
      <NavbarAll user={user} />
    );

  // 🧠 Fungsi saat user pilih paket
  const handleSelectPlan = async (plan) => {
    try {
      // Simpan data paket ke localStorage
      localStorage.setItem("selectedPlan", JSON.stringify(plan));

      // Kalau harga 0 (Trial) langsung aktifin tanpa bayar
      if (plan.price === 0) {
        alert("Kamu menggunakan paket Trial selama 3 bulan 🎉");
        return;
      }

      // 🔹 Panggil API untuk bikin transaksi di backend
      const res = await fetch("/api/midtrans/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: `ORDER-${Date.now()}`,
          amount: plan.price,
          name: user?.email || "Guest",
          plan: plan.title,
        }),
      });

      const data = await res.json();
      if (!data.token) throw new Error("Gagal mendapatkan token Midtrans");

      // 🔹 Tampilkan Snap Midtrans
      window.snap.pay(data.token, {
        onSuccess: function (result) {
          console.log("Transaksi sukses:", result);
          alert("Pembayaran berhasil ✅");
          // Simpan status ke localStorage / Supabase (sesuai kebutuhan)
        },
        onPending: function () {
          alert("Pembayaran pending, silakan selesaikan transaksi.");
        },
        onError: function () {
          alert("Terjadi kesalahan saat transaksi ❌");
        },
        onClose: function () {
          alert("Kamu menutup popup tanpa menyelesaikan pembayaran.");
        },
      });
    } catch (err) {
      console.error("Midtrans error:", err);
      alert("Terjadi kesalahan: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {NavbarComponent}

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
            Paket Langganan
          </h2>
          <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
            Pilih paket terbaik untuk mendukung pengalamanmu.
          </p>
        </div>

        {/* Kartu Paket Langganan */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`${
                plan.isPopular
                  ? "bg-green-700 text-white p-7 rounded-xl shadow-2xl w-full md:w-[300px] transform scale-[1.03] hover:scale-[1.05] transition"
                  : "bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full md:w-[280px] hover:shadow-xl hover:-translate-y-1 transition"
              }`}
            >
              {/* Label Populer */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -mt-6 -mr-6 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-bl-lg">
                  POPULER
                </div>
              )}

              <div className="text-center relative">
                <div
                  className={`flex justify-center mb-3 ${
                    plan.isPopular ? "text-white" : "text-green-600"
                  }`}
                >
                  {plan.icon}
                </div>

                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.isPopular ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.title}
                </h3>
                <p
                  className={`text-xs mb-5 ${
                    plan.isPopular ? "text-green-200" : "text-gray-500"
                  }`}
                >
                  {plan.desc}
                </p>

                <div className="mb-6 border-t border-b border-opacity-20 border-current py-3">
                  <h4
                    className={`text-3xl font-extrabold ${
                      plan.isPopular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.displayPrice}
                  </h4>
                  <p
                    className={`text-sm font-medium ${
                      plan.isPopular ? "text-green-300" : "text-gray-500"
                    }`}
                  >
                    {plan.per}
                  </p>
                </div>
              </div>

              <ul
                className={`text-left mb-6 space-y-2 text-sm ${
                  plan.isPopular ? "text-green-100" : "text-gray-700"
                }`}
              >
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle
                      className={`w-3.5 h-3.5 mt-1 mr-2.5 shrink-0 ${
                        plan.isPopular ? "text-green-300" : "text-green-500"
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`block w-full text-center px-5 py-2.5 text-sm rounded-lg font-semibold border-2 transition ${
                  plan.isPopular
                    ? "bg-white text-green-700 border-white hover:bg-gray-100"
                    : "bg-green-600 text-white border-green-600 hover:bg-green-700"
                }`}
              >
                {plan.price === 0 ? "Coba Gratis" : "Pilih Paket"}
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
