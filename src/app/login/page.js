"use client";
import { supabase } from "../../../lib/supabaseClient";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Fungsi untuk mencari role di database
  const fetchUserRole = async (email) => {
    // 1. Cek di tabel Komunitas
    const { data: komunitasData, error: komError } = await supabase
      .from("Komunitas")
      .select("jenis_akun")
      .eq("email_komunitas", email)
      .single();

    if (komunitasData) {
      // Ditemukan di Komunitas. Role adalah Donatur atau Penanam.
      const role = komunitasData.jenis_akun?.toLowerCase();
      if (role === "donatur" || role === "penanam") {
        return { role: role };
      }
      console.error("Role Komunitas tidak valid:", komunitasData.jenis_akun);
      throw new Error("Role Komunitas tidak valid.");
    }

    // 2. Cek di tabel Sekolah
    const { data: sekolahData, error: sekError } = await supabase
      .from("Sekolah")
      .select("nama_sekolah")
      .eq("email", email)
      .single();

    if (sekolahData) {
      // Ditemukan di Sekolah. Kita tetapkan role-nya sebagai "sekolah"
      // Anda perlu menyesuaikan home.js jika ini role baru.
      return { role: "sekolah" };
    }

    // Jika tidak ditemukan di kedua tabel, ini adalah masalah data
    console.warn("User authenticated but missing from Komunitas/Sekolah tables:", email);
    throw new Error("Data pengguna tidak ditemukan di database.");
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
      // 1. Otentikasi melalui Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) {
        // Pesan error Supabase untuk kredensial yang salah
        if (authError.message.includes("Invalid login credentials")) {
             throw new Error("Email atau Password salah.");
        }
        throw new Error(authError.message);
      }
      
      const userEmail = authData.user.email;
      
      // 2. Ambil data role dari database
      const { role } = await fetchUserRole(userEmail);

      // 3. Simpan data user (dengan role yang benar) ke localStorage
      const user = {
        email: userEmail,
        // *** FIX UTAMA: ROLE UTAMA DIISI DENGAN ROLE SUB-AKUN ***
        role: role, 
      };

      // Pastikan Anda mengubah logika di home.js untuk menangani role "sekolah" 
      // jika sekolah memiliki tampilan dashboard yang berbeda dari "penanam".
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/home");

    } catch (err) {
      setError(err.message || "Login gagal, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full mt-10 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-white lg:max-w-4xl">
      {/* Bagian kiri */}
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        {/* SVG Logo (dipusatkan) */}
        <div className="flex justify-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-[#047857]"
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
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
            atau masuk dengan email
          </span>
          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
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
            required
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
            required
          />
        </div>

        {/* Tombol Login */}
        <div className="mt-6">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#059669] rounded-lg hover:bg-[#037f58] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 disabled:opacity-50"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </div>

        {/* Pesan error */}
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
            className="text-xs text-gray-500 hover:underline"
          >
            Belum punya akun?
          </Link>
          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </div>

      {/* Bagian kanan */}
      <div
        className="relative hidden bg-cover lg:flex lg:w-1/2 items-center justify-center rounded-tr-lg rounded-br-lg"
        style={{
          backgroundImage: "url('/gambar-pohon.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-tr-lg rounded-br-lg"></div>

        <div className="relative z-10 text-center text-white flex flex-col items-center justify-center p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-24 h-24 text-[#047857] mb-4"
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
          <p className="text-sm mt-1">
            Kita butuh kamu lagi. Bumi gak bisa nunggu.
          </p>
          <p className="mt-4 text-sm">
            Belum punya{" "}
            <span className="text-[#059669] font-semibold">akun?</span>
          </p>
          <Link
            href="/register"
            className="inline-block mt-3 w-50 h-10 px-6 py-2 bg-white text-[#059669] font-medium transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 dark:hover:bg-[#059669]"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}
