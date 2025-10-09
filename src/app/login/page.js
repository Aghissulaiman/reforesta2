"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

export default function login() {
  const router = useRouter();
  const supabase = createClientComponentClient(); // 🔹 Bukan import dari lib/supabaseClient
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
  setLoading(true);

  try {
    const { email, password } = form;
    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      if (authError.message.includes("Invalid login credentials")) {
        throw new Error("Email atau Password salah.");
      }
      throw new Error(authError.message);
    }

    const userEmail = authData.user.email;

    const { role } = await fetchUserRole(userEmail);

    console.log("✅ Login sukses:", userEmail, "Role:", role);
    router.push("/home");
  } catch (err) {
    setError(err.message || "Gagal masuk! Coba lagi nanti.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex w-full mt-10 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-white lg:max-w-4xl">
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div className="flex justify-center -mt-5">
          <Image src="/logo.png" alt="Logo" width={80} height={80} />
        </div>

        <p className="mt-3 text-xl text-center text-[#059669] font-semibold">
          Selamat Datang Kembalii!
        </p>

        <form onSubmit={handleLogin}>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full px-6 py-3 text-sm font-medium text-white bg-[#4CAF50] rounded-lg hover:bg-[#69cd6d] transition-all disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>

          {error && (
            <p className="mt-3 text-sm text-center text-red-500">{error}</p>
          )}
        </form>
      </div>

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

function InputField({ label, ...props }) {
  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        {...props}
        className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0"
      />
    </div>
  );
}