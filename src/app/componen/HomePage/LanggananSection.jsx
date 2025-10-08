"use client";

import { Star, Home, Users } from "lucide-react";
import Link from "next/link";

export default function LanggananSection() {
  const plans = [
    {
      icon: <Star className="w-8 h-8 text-white mb-3" />,
      title: "Gratis Trial",
      desc: "Coba layanan kami selama 3 bulan",
      price: "GRATIS",
      per: "/ 3 BULAN",
    },
    {
      icon: <Home className="w-8 h-8 text-white mb-3" />,
      title: "Standard",
      desc: "1 Bulan",
      price: "RP 150.000",
      per: "/ 1 BULAN",
    },
    {
      icon: <Users className="w-8 h-8 text-white mb-3" />,
      title: "3 Bulan",
      desc: "Coba layanan kami selama 3 bulan",
      price: "RP 400.000",
      per: "/ 3 BULAN",
    },
  ];

  return (
    <section className="relative py-16 text-center bg-white overflow-hidden">
      {/* SVG Garis Background */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          d="M0,160 C240,240 480,80 720,160 C960,240 1200,80 1440,160"
        ></path>
        <path
          fill="none"
          stroke="#22c55e"
          strokeWidth="1.5"
          opacity="0.6"
          d="M0,200 C240,280 480,120 720,200 C960,280 1200,120 1440,200"
        ></path>
        <path
          fill="none"
          stroke="#16a34a"
          strokeWidth="1"
          opacity="0.4"
          d="M0,120 C240,200 480,40 720,120 C960,200 1200,40 1440,120"
        ></path>
      </svg>

      {/* Judul */}
      <h2 className="text-2xl font-bold text-green-700 mb-10 relative z-10">
        Langganan
      </h2>

      {/* Kartu Paket */}
      <div className="relative z-10 flex flex-col md:flex-row justify-center gap-8 px-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-[#059669] to-[#047857] text-white p-8 rounded-2xl shadow-md border border-white w-full md:w-[250px] transition-transform hover:scale-105 duration-300"
          >
            <div className="flex flex-col items-center">
              {plan.icon}
              <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
              <p className="text-sm mb-4">{plan.desc}</p>
              <h4 className="text-2xl font-bold mb-1">{plan.price}</h4>
              <p className="text-xs mb-6 opacity-90">{plan.per}</p>

              <Link
                href="/langganan"
                className="px-5 py-2 rounded-full bg-white text-green-700 font-semibold border-2 border-white shadow-sm transition hover:shadow-green-300"
              >
                Langganan Sekarang
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
