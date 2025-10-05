// components/Navbar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full flex justify-center mt-4">
      <div className="flex items-center justify-between bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 w-[900px] max-w-[90%]">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5.998 3a7 7 0 0 1 6.913 5.895A6.48 6.48 0 0 1 17.498 7h4.5v2.5a6.5 6.5 0 0 1-6.5 6.5h-2.5v5h-2v-8h-2a7 7 0 0 1-7-7V3zm14 6h-2.5a4.5 4.5 0 0 0-4.5 4.5v.5h2.5a4.5 4.5 0 0 0 4.5-4.5zm-14-4h-2v1a5 5 0 0 0 5 5h2v-1a5 5 0 0 0-5-5"/>
          </svg>
          <span className="font-semibold text-green-600 text-xl sm:text-2xl">reforesta</span>
        </div>

        {/* Tombol Menu (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-green-700 focus:outline-none"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <ul
          className={`flex-col sm:flex-row sm:flex sm:items-center gap-6 font-medium absolute sm:static bg-white sm:bg-transparent left-0 right-0 sm:left-auto sm:right-auto top-[70px] sm:top-auto px-6 sm:px-0 py-4 sm:py-0 rounded-2xl shadow-md sm:shadow-none border sm:border-0 transition-all duration-300 ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <li>
            <Link
              href="/"
              className={`px-6 py-2 rounded-full transition font-semibold ${
                pathname === "/"
                  ? "bg-green-600 text-white"
                  : "text-green-700 hover:text-green-800"
              }`}
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
            >
              Langganan
            </Link>
          </li>

          {/* Tombol Daftar & Masuk (mobile ikut menu, desktop tetap di kanan) */}
          <div className="flex sm:hidden flex-col gap-3 mt-3">
            <Link
              href="/register"
              className="px-5 py-2 rounded-full border border-green-500 text-green-600 font-semibold shadow-sm hover:bg-green-50 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Daftar
            </Link>
            <Link
              href="/login"
              className="px-5 py-2 rounded-full border border-green-500 text-green-600 font-semibold shadow-sm hover:bg-green-50 transition text-center"
              onClick={() => setIsOpen(false)}
            >
              Masuk
            </Link>
          </div>
        </ul>

        {/* Tombol Daftar dan Masuk (Desktop) */}
        <div className="hidden sm:flex gap-3">
          <Link
            href="/register"
            className="px-5 py-1 rounded-full border border-green-500 text-green-600 font-semibold shadow-sm hover:bg-green-50 transition"
          >
            Daftar
          </Link>
          <Link
            href="/login"
            className="px-5 py-1 rounded-full border border-green-500 text-green-600 font-semibold shadow-sm hover:bg-green-50 transition"
          >
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}
