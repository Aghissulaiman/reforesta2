"use client";

import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

export default function Login(){ 
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Update state setiap input berubah
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Fungsi utama login Supabase
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Login sukses:", data.user);
      window.location.href = "/home";
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full mt-10 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-white lg:max-w-4xl">
      {/* Bagian kiri form login */}
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
          Selamat Datang Kembali!
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
            atau masuk dengan email
          </span>
          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        {/* Input Email */}
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
            htmlFor="LoggingEmailAddress"
          >
            Email
          </label>
          <input
            id="LoggingEmailAddress"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
            type="email"
            placeholder="Masukkan email"
          />
        </div>

        {/* Input Password */}
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="loggingPassword"
            >
              Password
            </label>
            <Link
              href="/lupaPassword"
              className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          <input
            id="loggingPassword"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
            type="password"
            placeholder="Masukkan password"
          />
        </div>

        {/* Tombol Login */}
        <div className="mt-6">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4CAF50] rounded-lg hover:bg-[#69cd6d] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </div>

        {/* Pesan error dari Supabase */}
        {error && (
          <p className="mt-3 text-sm text-center text-red-500 font-medium">
            {error}
          </p>
        )}

        {/* Link ke Register */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>
          <Link
            href="/register"
            className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
          >
            Belum punya akun?
          </Link>
          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </div>

      {/* Bagian kanan (gambar + teks) */}
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
            Selamat datang kembali, Penjaga Bumi
          </p>
          <p className="text-sm mt-1">
            Kita butuh kamu lagi. Bumi gak bisa nunggu.
          </p>
          <p className="mt-4 text-sm">
            Belum punya{" "}
            <span className="text-[#4CAF50] font-semibold">akun?</span>
          </p>
          <Link
            href="/register"
            className="inline-block mt-3 w-50 h-10 px-6 py-2 bg-white text-[#4CAF50] font-medium transition-colors duration-300 transform border rounded-lg dark:border-[#4CAF50] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1CA221]"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}
