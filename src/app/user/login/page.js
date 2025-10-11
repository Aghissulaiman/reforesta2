"use client";

import { useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";
import bcrypt from "bcryptjs";


// Fungsi ambil role & nama user
async function fetchUserRoleAndDetail(email) {
  const { data: komunitasData } = await supabase
    .from("Komunitas")
    .select("jenis_akun, nama_komunitas")
    .eq("email_komunitas", email)
    .limit(1)
    .maybeSingle();

  if (komunitasData) {
    const subRole = komunitasData.jenis_akun?.toLowerCase();
    return {
      role: subRole === "donatur" ? "donatur" : "penanam",
      nama: komunitasData.nama_komunitas || "Komunitas",
    };
  }

  const { data: sekolahData } = await supabase
    .from("Sekolah")
    .select("nama_sekolah")
    .eq("email_sekolah", email)
    .single()
    .catch(() => null);

  if (sekolahData) {
    return {
      role: "sekolah",
      nama: sekolahData.nama_sekolah || "Sekolah",
    };
  }

  throw new Error("Role pengguna tidak ditemukan di database.");
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      // 🔹 1️⃣ Cek dulu apakah login sebagai ADMIN
      // 🔹 1️⃣ Coba login sebagai admin dulu
      const { data: adminData } = await supabase
        .from("admin")
        .select("*")
        .eq("email", form.email)
        .maybeSingle();

      if (adminData) {
        // Cek password admin (bcrypt)
       let isMatch = false;

// Kalau password belum di-hash, bandingkan langsung
if (adminData.password.startsWith("$2")) {
  // berarti ini format bcrypt hash
  isMatch = await bcrypt.compare(form.password, adminData.password);
} else {
  // plaintext fallback (sementara)
  isMatch = form.password === adminData.password;
}

if (!isMatch) throw new Error("Password salah!");
        // Simpan sesi admin
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: adminData.id,
            email: adminData.email,
            role: "admin",
            nama: adminData.nama_admin || "Admin",
          })
        );

        router.push("/admin/dashboard");
        return;
      }

      // 🔹 2️⃣ Kalau bukan admin → login via Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) throw authError;
      if (!data.user) throw new Error("User tidak ditemukan.");

      const sessionUser = data.user;

      // 🔹 3️⃣ Ambil role user dari database
      const userDetail = await fetchUserRoleAndDetail(sessionUser.email);

      // 🔹 4️⃣ Simpan session di backend
      await fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { id: sessionUser.id, email: sessionUser.email },
        }),
      });

      // 🔹 5️⃣ Simpan info user ke localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: sessionUser.id,
          email: sessionUser.email,
          role: userDetail.role,
          nama: userDetail.nama,
        })
      );

      router.push("/user/home");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Login gagal, coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        {/* LEFT PANEL */}
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mb-2 -mt-4">
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

          {error && (
            <p className="mt-2 text-center text-red-500 text-sm font-medium">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 focus:outline-none"
                placeholder="Masukkan email"
              />
            </div>

            {/* Password */}
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600">
                  Password
                </label>
                <Link
                  href="/lupaPassword"
                  className="text-xs text-gray-500 hover:underline"
                >
                  Lupa Password?
                </Link>
              </div>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 focus:outline-none"
                placeholder="Masukkan password"
              />
            </div>

            {/* Tombol Login */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 text-sm font-medium text-white bg-[#059669] rounded-lg hover:bg-[#037f58] transition"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>
            </div>
          </form>

          {/* Register link */}
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <Link
              href="/user/register"
              className="text-xs text-gray-500 hover:underline"
            >
              Belum punya akun?
            </Link>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="relative hidden lg:flex lg:w-1/2 items-center justify-center rounded-tr-lg rounded-br-lg bg-cover bg-center"
          style={{ backgroundImage: "url('/gambar-pohon.png')" }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-tr-lg rounded-br-lg"></div>
          <div className="relative z-10 text-center text-white p-6">
            <p className="mt-4 font-semibold text-lg">
              Selamat datang kembali, Penjaga Bumi 🌱
            </p>
            <p className="text-sm mt-1">
              Kita butuh kamu lagi. Bumi gak bisa nunggu.
            </p>
            <Link
              href="/user/register"
              className="inline-block mt-4 px-6 py-2 bg-white text-[#059669] font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
