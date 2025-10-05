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
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 24 24"><path fill="currentColor" d="M5.998 3a7 7 0 0 1 6.913 5.895A6.48 6.48 0 0 1 17.498 7h4.5v2.5a6.5 6.5 0 0 1-6.5 6.5h-2.5v5h-2v-8h-2a7 7 0 0 1-7-7V3zm14 6h-2.5a4.5 4.5 0 0 0-4.5 4.5v.5h2.5a4.5 4.5 0 0 0 4.5-4.5zm-14-4h-2v1a5 5 0 0 0 5 5h2v-1a5 5 0 0 0-5-5"/></svg>
          <span className="font-semibold text-green-600 text-2xl">reforesta</span>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-8 font-medium">
          <li>
            <Link
              href="/"
              className={`px-6 py-2 rounded-full transition font-semibold ${
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
