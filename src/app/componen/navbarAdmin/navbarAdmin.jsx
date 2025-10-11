"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function NavbarAdmin({ user }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Dashboard", path: "/Admin/dashboard" },
    { name: "Pengguna", path: "/Admin/pengguna" },
    { name: "Transaksi", path: "/Admin/transaksi" },
  ];

  const profileItems = [
    { name: "Profile Admin", path: "/Admin/profile" },
    { name: "Pengaturan", path: "/Admin/setting" },
  ];

  // ✅ Tutup dropdown kalau klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("selectedPlan");
    setIsOpen(false);

    // Biar smooth dikit
    setTimeout(() => {
      router.replace("/");
    }, 300);
  };

  return (
    <nav className="w-full flex justify-center mt-6 relative">
      <div className="flex items-center justify-between bg-white px-8 py-3 rounded-full border border-gray-200 shadow-sm w-[950px] max-w-[90%]">

        {/* 🔹 Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/Logo.png"
            alt="Logo Reforesta"
            width={28}
            height={28}
            className="object-contain"
          />
          <span className="font-semibold text-green-700 text-lg">
            reforesta admin
          </span>
        </div>

        {/* 🔹 Menu utama */}
        <ul className="flex items-center gap-6 font-medium relative">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-semibold ${
                    isActive
                      ? "text-[#047857]"
                      : "text-green-700 hover:bg-[#047857] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 🔹 Dropdown admin */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-green-50 rounded-full transition"
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
              {user?.name || "Admin"}
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
                {/* 🔹 Link menu profil */}
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

                {/* 🔹 Tombol Logout */}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 transition font-semibold"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
