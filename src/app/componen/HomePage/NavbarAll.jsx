"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function NavbarAll({ user }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Beranda", path: "/user/home" },
    { name: "Tanam", path: "/user/tanam" },
    { name: "Acara", path: "/user/acarapage" },
    { name: "Langganan", path: "/user/langganan" },
  ];

  const profileItems = [
    { name: "Profile", path: "/user/home/profile" },
    { name: "Riwayat", path: "/user/home/riwayat" },
    { name: "Setting", path: "/user/home/setting" },
    { name: "Logout", path: "/" },
  ];

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
      <div className="absolute inset-0 bg-white -z-10" />

      <div className="flex items-center justify-between bg-white px-8 py-3 rounded-full border border-gray-200 shadow-md w-[900px] max-w-[90%] transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Logo Reforesta"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-semibold text-green-700 text-lg tracking-tight">
            reforesta
          </span>
        </div>

        {/* Navigasi */}
        <ul className="flex items-center gap-6 font-medium relative">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path} className="relative">
                {isActive && (
                  <motion.div
                    layoutId="activeBorder"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#047857] rounded-full"
                    style={{ zIndex: 0 }}
                  />
                )}
                <Link
                  href={item.path}
                  className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-green-700 hover:text-green-800 hover:bg-green-50"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Dropdown Profile */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-3 py-1 hover:bg-green-50 rounded-full transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {user?.photo ? (
              <img
                src={user.photo}
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <User className="text-green-700 w-5 h-5" />
            )}
            <span className="text-green-700 font-medium">
              {user?.name || "User"}
            </span>
            <ChevronDown
              className={`text-green-700 w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>

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
