"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
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
           <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-[#047857]"
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

        <p className="mt-3 text-xl text-center text-[#059669] font-semibold">
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
            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleForgotPassword}
            disabled={loading}
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#059669] rounded-lg hover:bg-[#059669] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Link Reset"}
          </button>
        </div>

        {message && (
          <p className="mt-3 text-sm text-center text-[#059669] font-medium">
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
           <div className="flex justify-center -mt-5">
           <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-24 h-24 text-[#047857]"
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
