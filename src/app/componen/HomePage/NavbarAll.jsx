"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function NavbarAll() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Beranda", path: "/home" },
    { name: "Tanam", path: "/tanam" },
    { name: "Acara", path: "/acara" },
    { name: "Langganan", path: "/langganan" },
  ];

  const profileItems = [
    { name: "Profile", path: "/home/profile" },
    { name: "Riwayat", path: "/riwayat" },
    { name: "Setting", path: "/setting" },
    { name: "Logout", path: "/" },
  ];

  // Klik di luar dropdown otomatis menutup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full flex justify-center mt-6 relative">
      <div className="flex items-center justify-between bg-white px-8 py-3 rounded-full border border-gray-200 shadow-sm w-[900px] max-w-[90%]">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Logo Reforesta"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-semibold text-green-700 text-lg">
            reforesta
          </span>
        </div>

        {/* Menu Tengah */}
        <ul className="flex items-center gap-6 font-medium relative">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="activeBorder"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                    className="absolute inset-0 bg-[#047857] px-8 py-4 rounded-full z-0"
                  />
                )}
                <Link
                  href={item.path}
                  className={`px-4 py-1 rounded-full transition-all duration-300 font-semibold relative z-10 ${
                    isActive
                      ? "text-white"
                      : "text-green-700 hover:text-green-800"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Ikon user */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-1 cursor-pointer px-2 py-1 hover:bg-green-50 rounded-full transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            <User className="text-green-700 w-5 h-5" />
            <ChevronDown
              className={`text-green-700 w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50 ring-1 ring-black ring-opacity-5"
              >
                {profileItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
