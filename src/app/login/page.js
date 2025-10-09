"use client";
import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
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
    try {
      // 🔹 Ambil data komunitas dari Supabase
      const { data: userData, error: userError } = await supabase
        .from("Komunitas")
        .select("email_komunitas, password_komunitas, jenis_akun")
        .eq("email_komunitas", form.email)
        .single();

      if (userError || !userData) throw new Error("Email tidak ditemukan");

      if (userData.password_komunitas !== form.password) {
        throw new Error("Password salah");
      }

      // 🔹 Simpan data user di localStorage
      const user = {
        email: userData.email_komunitas,
        role: "komunitas",
        subRole: userData.jenis_akun?.toLowerCase() || "penanam",
      };
      localStorage.setItem("user", JSON.stringify(user));

      // 🔹 Arahkan ke halaman sesuai role
      router.push("/home");
    } catch (err) {
      setError(err.message || "Login gagal, periksa kembali data Anda!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        {/* Bagian kiri form login */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center -mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-[#059669]"
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
            Selamat Datang Kembali!
          </p>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-500 uppercase">
              atau masuk dengan email
            </span>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          {/* Input Email */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              htmlFor="LoggingEmailAddress"
            >
              Email
            </label>
            <input
              id="LoggingEmailAddress"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#037f58] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
              type="email"
              placeholder="Masukkan email"
            />
          </div>

          {/* Input Password */}
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <Link
                href="/lupaPassword"
                className="text-xs text-gray-500 hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            <input
              id="loggingPassword"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#007e56] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
              type="password"
              placeholder="Masukkan password"
            />
          </div>

          {/* Tombol Login */}
          <div className="mt-6">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#059669] rounded-lg hover:bg-[#037f58] focus:outline-none focus:ring focus:ring-gray-300 disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>

          {error && (
            <p className="mt-3 text-sm text-center text-red-500 font-medium">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link
              href="/register"
              className="text-xs text-gray-500 hover:underline"
            >
              Belum punya akun?
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>

        {/* Bagian kanan */}
        <div
          className="relative hidden lg:flex lg:w-1/2 items-center justify-center rounded-tr-lg rounded-br-lg"
          style={{
            backgroundImage: "url('/gambar-pohon.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50 rounded-tr-lg rounded-br-lg"></div>
          <div className="relative z-10 text-center text-white flex flex-col items-center justify-center p-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-24 h-24 text-[#059669] mb-4"
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
            <p className="mt-2 font-semibold text-lg">
              Selamat datang kembali, Penjaga Bumi
            </p>
            <p className="text-sm mt-1">Kita butuh kamu lagi. Bumi gak bisa nunggu.</p>
            <p className="mt-4 text-sm">
              Belum punya{" "}
              <span className="text-white font-semibold underline">akun?</span>
            </p>
            <Link
              href="/register"
              className="inline-block mt-3 px-6 py-2 bg-[#059669] text-white font-medium rounded-lg hover:bg-[#037f58] transition"
            >
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
