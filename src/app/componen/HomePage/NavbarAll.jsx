"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function NavbarAll() {
  const pathname = usePathname();

  const navItems = [
    { name: "Beranda", path: "/home" },
    { name: "Tanam", path: "/tanam" },
    { name: "Acara", path: "/acara" },
    { name: "Langganan", path: "/langganan" },
  ];

  return (
    <nav className="w-full flex justify-center mt-6">
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
                    className="absolute inset-0 bg-green-600 rounded-full z-0"
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
        <div className="flex items-center gap-1 cursor-pointer">
          <User className="text-green-700 w-5 h-5" />
          <ChevronDown className="text-green-700 w-4 h-4" />
        </div>
      </div>
    </nav>
  );
}
