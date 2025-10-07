"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/resetPassword`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("✅ Cek email kamu untuk tautan reset password!");
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full mt-10 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-white lg:max-w-4xl">
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center -mt-5">
          <Image
            className="w-20 h-20 object-contain"
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
          />
        </div>

        <p className="mt-3 text-xl text-center text-[#4CAF50] font-semibold">
          Lupa Password?
        </p>

        <p className="mt-2 text-sm text-center text-gray-500">
          Masukkan email kamu dan kami akan kirimkan link untuk mengatur ulang password.
        </p>

        <div className="mt-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4CAF50] rounded-lg hover:bg-[#69cd6d] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </div>

        {message && (
          <p className="mt-3 text-sm text-center text-green-600 font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-3 text-sm text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between mt-6">
          <span className="w-1/5 border-b md:w-1/4"></span>
          <Link
            href="/login"
            className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            Kembali ke Login
          </Link>
          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </div>

      <div
        className="relative hidden bg-cover lg:flex lg:w-1/2 items-center justify-center rounded-tr-lg rounded-br-lg"
        style={{
          backgroundImage: "url('/gambar-pohon.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-tr-lg rounded-br-lg"></div>
        <div className="relative z-10 text-center text-white p-6">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-30 h-30 object-contain ml-26 mx-auto"
          />
          <p className="mt-4 font-semibold text-lg">
            Kami bantu kamu untuk masuk kembali.
          </p>
          <p className="text-sm mt-1">
            Cukup isi email, dan cek kotak masuk kamu.
          </p>
        </div>
      </div>
    </div>
  );
}
