"use client";
import { useState, useEffect } from "react";

export default function DetailPembayaran({ lokasiTerpilih }) {
  const [isFixed, setIsFixed] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jumlah, setJumlah] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // Kalau scroll ke bawah → aktifkan posisi fixed
      if (currentScroll > lastScroll && currentScroll > 200) {
        setIsFixed(true);
      }
      // Kalau scroll ke atas → lepas posisi fixed
      else if (currentScroll < lastScroll) {
        setIsFixed(false);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <div
      className={`${
        isFixed
          ? "fixed right-10 top-24 z-50"
          : "absolute right-10 top-[600px]" // posisi awal
      } bg-white border border-gray-200 shadow-md rounded-xl p-6 w-[280px] h-fit transition-all duration-300`}
    >
      <p className="text-black text-base font-medium flex justify-between">
        <span>Lokasi</span>
        <span>{lokasiTerpilih?.nama || "-"}</span>
      </p>
      <p className="text-black text-base font-medium flex justify-between mt-2">
        <span>Jenis Bibit</span>
        <span>Pohon Sengon</span>
      </p>
      <p className="text-black text-base font-medium flex justify-between mt-2">
        <span>Jumlah Bibit</span>
        <span>1</span>
      </p>
      <p className="text-black text-base font-medium flex justify-between mt-2">
        <span>Total</span>
        <span>Rp 25.000</span>
      </p>

      <button className="mt-6 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition">
        Bayar
      </button>
    </div>
  );
}
