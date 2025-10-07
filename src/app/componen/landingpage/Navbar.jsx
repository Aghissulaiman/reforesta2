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
        <span className="text-2xl text-green-700">🌱</span>
        <span className="text-lg font-semibold text-green-700">reforesta</span>
      </Link>

      {/* Menu */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`font-medium text-sm transition-all 
              ${
                pathname === link.href
                  ? "bg-green-700 text-white px-4 py-1.5 rounded-full"
                  : "text-green-700 hover:text-green-800"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Link
          href="/daftar"
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition-all"
        >
          Daftar
        </Link>
        <Link
          href="/login"
          className="px-4 py-1.5 text-sm font-medium rounded-full border border-green-700 bg-green-700 text-white hover:bg-green-800 transition-all"
        >
          Masuk
        </Link>
      </div>
    </nav>
  );
}
