// components/Navbar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-center mt-6">
      <div className="flex items-center justify-between bg-white px-8 py-3 rounded-full shadow-md border border-gray-200 w-[900px] max-w-[90%]">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl">🌱</span>
          <span className="font-semibold text-green-600 text-2xl">reforesta</span>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-8 font-medium">
          <li>
            <Link
              href="/"
              className={`px-4 py-1 rounded-full transition font-semibold ${
                pathname === "/"
                  ? "bg-green-600 text-white"
                  : "text-green-700 hover:text-green-800"
              }`}
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link
              href="/tanam"
              className={`transition ${
                pathname === "/tanam"
                  ? "text-green-600 font-semibold"
                  : "text-green-700 hover:text-green-800"
              }`}
            >
              Tanam
            </Link>
          </li>
          <li>
            <Link
              href="/acara"
              className={`transition ${
                pathname === "/acara"
                  ? "text-green-600 font-semibold"
                  : "text-green-700 hover:text-green-800"
              }`}
            >
              Acara
            </Link>
          </li>
          <li>
            <Link
              href="/langganan"
              className={`transition ${
                pathname === "/langganan"
                  ? "text-green-600 font-semibold"
                  : "text-green-700 hover:text-green-800"
              }`}
            >
              Langganan
            </Link>
          </li>
        </ul>

        {/* Tombol Daftar dan Masuk */}
        <div className="flex gap-3">
          <Link
            href="/daftar"
            className="px-5 py-1 rounded-full border border-green-500 text-green-600 font-semibold shadow-sm hover:bg-green-50 transition"
          >
            Daftar
          </Link>
          <Link
            href="/masuk"
            className="px-5 py-1 rounded-full border border-green-500 text-green-600 font-semibold shadow-sm hover:bg-green-50 transition"
          >
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}
