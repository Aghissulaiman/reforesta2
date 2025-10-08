"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tanam", href: "/tanam" },
    { name: "Acara", href: "/acara" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 
      flex items-center justify-between px-6 py-3 rounded-full shadow-md 
      transition-all duration-300 w-[90%] max-w-6xl
      ${scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white"}
      `}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-[#047857]"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M24 42V26m17.942-15.993c-.776 13.024-9.13 17.236-15.946 17.896C24.896 28.009 24 27.104 24 26v-8.372c0-.233.04-.468.125-.684C27.117 9.199 34.283 8.155 40 8.02c1.105-.027 2.006.884 1.94 1.987M7.998 6.072c9.329.685 14.197 6.091 15.836 9.558c.115.242.166.508.166.776v7.504c0 1.14-.96 2.055-2.094 1.94C7.337 24.384 6.11 14.786 6.009 8C5.993 6.894 6.897 5.99 8 6.072"
          />
        </svg>
        <span className="text-lg font-semibold text-[#047857]">
          reforesta
        </span>
      </Link>

      {/* Menu */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`font-bold text-sm transition-all 
              ${
                pathname === link.href
                  ? "bg-[#047857] text-white px-4 py-1.5 rounded-full"
                  : "text-[#047857] hover:text-green-800"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Link
          href="/register"
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all"
        >
          Daftar
        </Link>
        <Link
          href="/login"
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all"
        >
          Masuk
        </Link>
      </div>
    </nav>
  );
}
