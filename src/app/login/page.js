"use client";

import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

export default function Login() {
  useAuthRedirect();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
      const userData = {
        email: form.email,
        role: "komunitas",
        subRole: "penerima",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "/home";
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full mt-10 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-white lg:max-w-4xl">
      {/* Form login */}
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center -mt-5">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>
        <p className="mt-3 text-xl text-center text-[#4CAF50] font-semibold">
          Selamat Datang Kembali!
        </p>
        <form onSubmit={handleLogin}>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0"
              type="email"
              placeholder="Masukkan email"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0"
              type="password"
              placeholder="Masukkan password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full px-6 py-3 text-sm font-medium text-white bg-[#4CAF50] rounded-lg hover:bg-[#69cd6d] transition-all"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
          {error && (
            <p className="mt-3 text-sm text-center text-red-500">{error}</p>
          )}
        </form>
      </div>

      {/* Gambar kanan */}
      <div
        className="relative hidden lg:flex lg:w-1/2 items-center justify-center bg-cover"
        style={{ backgroundImage: "url('/gambar-pohon.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white p-6">
          <Image src="/logo.png" alt="Logo" width={100} height={100} />
          <p className="mt-4 font-semibold text-lg">
            Selamat datang kembali, Penjaga Bumi 🌿
          </p>
        </div>
      </div>
    </div>
  );
}
