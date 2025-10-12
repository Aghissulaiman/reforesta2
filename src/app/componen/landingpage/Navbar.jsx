"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fungsi scroll ke section tertentu
  const handleScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Tutup menu saat item diklik di mobile
    }
  };

  const navLinks = [
    { name: "Beranda", scrollTo: "hero-section" },
    { name: "Acara", scrollTo: "acara-section" },
    { name: "Contact Us", scrollTo: "contactus-section" },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 
      flex items-center justify-between px-6 py-3 rounded-full border border-gray-200
      shadow-lg transition-all duration-300 w-[90%] max-w-6xl
      ${scrolled ? "bg-white/90 backdrop-blur-md" : "bg-white"}
      `}
    >
      {/* === LOGO === */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="p-1.5 rounded-full bg-[#047857]/10 group-hover:bg-[#047857]/20 transition">
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
        </div>
        <span className="text-lg font-semibold text-[#047857] tracking-tight">
          reforesta
        </span>
      </Link>

      {/* === MENU DESKTOP === */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          if (link.scrollTo) {
            return (
              <button
                key={link.name}
                onClick={() => handleScrollTo(link.scrollTo)}
                className="font-semibold text-sm px-4 py-2 rounded-full text-[#047857] hover:text-green-800 hover:bg-[#047857]/10 transition-all duration-300"
              >
                {link.name}
              </button>
            );
          }
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`font-semibold text-sm px-4 py-2 rounded-full transition-all duration-300 
                text-[#047857] hover:text-green-800 hover:bg-[#047857]/10 
                ${isActive ? "text-[#047857]" : ""}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* === BUTTONS DESKTOP === */}
      <div className="hidden md:flex gap-3">
        <Link
          href="/user/register"
          className="px-5 py-1.5 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all duration-300"
        >
          Daftar
        </Link>
        <Link
          href="/user/login"
          className="px-5 py-1.5 text-sm font-medium rounded-full bg-[#047857] text-white hover:bg-[#036b4f] transition-all duration-300 shadow-sm"
        >
          Masuk
        </Link>
      </div>

      {/* === TOGGLE MENU MOBILE === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 rounded-full hover:bg-[#047857]/10 transition"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#047857]" />
        ) : (
          <Menu className="w-6 h-6 text-[#047857]" />
        )}
      </button>

      {/* === MENU MOBILE === */}
      {isOpen && (
        <div
          className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-2xl border border-gray-200
          flex flex-col items-center py-4 gap-4 animate-fadeIn md:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleScrollTo(link.scrollTo)}
              className="text-[#047857] font-medium text-sm px-4 py-2 rounded-full hover:bg-[#047857]/10 w-[80%] transition"
            >
              {link.name}
            </button>
          ))}

          <div className="flex flex-col w-[80%] gap-2 mt-2">
            <Link
              href="/user/register"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-5 py-2 text-sm font-medium rounded-full border border-[#047857] text-[#047857] hover:bg-[#047857] hover:text-white transition-all duration-300"
            >
              Daftar
            </Link>
            <Link
              href="/user/login"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-5 py-2 text-sm font-medium rounded-full bg-[#047857] text-white hover:bg-[#036b4f] transition-all duration-300 shadow-sm"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
