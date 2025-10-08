"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function ProfileCard() {
  const [user, setUser] = useState({
    avatar: "/avatar-placeholder.png",
    name: "Aghis Sulaiman",
    username: "@aghis_s",
    email: "aghis@example.com",
    phone: "0812-XXXX-XXXX",
    address: "Jakarta, Indonesia",
    dob: "12 Mei 2009",
    gender: "Laki-laki",
    bio: "Mahasiswa SMK yang suka desain, UI/UX, dan belajar teknologi modern.",
    hobbies: ["Desain", "UI/UX", "Investasi", "Coding", "Traveling"],
    social: {
      instagram: "aghis_s",
      twitter: "aghis_s",
      linkedin: "aghis-sulaiman",
    },
    stats: {
      posts: 120,
      followers: 450,
      following: 180,
    },
    online: true,
  });

  const handleEdit = () => {
    const newName = prompt("Ubah nama:", user.name);
    if (newName) setUser({ ...user, name: newName });
  };

  return (
    <motion.div
      className="max-w-xl mx-auto mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-4 rounded-t-3xl font-bold text-2xl shadow-md">
        Profile Anda
      </div>

      {/* Card */}
      <motion.div
        className="bg-white rounded-b-3xl shadow-2xl p-6 space-y-6 relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Avatar + Basic Info */}
        <div className="flex items-center gap-5">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-500 hover:scale-105 transition-transform duration-300 relative">
            <Image
              src={user.avatar}
              alt="Avatar"
              width={112}
              height={112}
              className="object-cover"
            />
            {user.online && (
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full animate-pulse"></span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.username}</p>
            <p className="flex items-center text-gray-500 gap-2 mt-1">
              <FaEnvelope /> {user.email}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Tentang Saya</h3>
          <p className="text-gray-600">{user.bio}</p>
        </div>

        {/* Info Detail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-500" /> {user.phone}
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" /> {user.address}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Tanggal Lahir:</span> {user.dob}
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Gender:</span> {user.gender}
          </div>
        </div>


        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleEdit}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
          >
            Edit Profile
          </button>
          <button
            onClick={() => alert("Logout berhasil!")}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        </div>

        {/* Background Accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-green-200 rounded-full opacity-20 pointer-events-none"></div>
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-green-300 rounded-full opacity-20 pointer-events-none"></div>
      </motion.div>
    </motion.div>
  );
}
