"use client";

import { supabase } from "../../../../lib/supabaseClient";
import Link from "next/link";
import React, { useState } from "react";

export default function Register() {
  const [accountType, setAccountType] = useState(""); // Komunitas / Sekolah
  const [gender, setGender] = useState("");
  const [userRole, setUserRole] = useState(""); // Donatur / Penanam

  const [form, setForm] = useState({
    nama_komunitas: "",
    email_komunitas: "",
    password_komunitas: "",
    no_telepon_komunitas: "",
    pic: "",
    jenis_kelamin: "",
    jenis_akun: "",
    instansi: "",
    nama: "",
    email: "",
    password: "",
    no_telepon: "",
    nama_sekolah: "",
    nuptk: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const isSekolah = accountType === "Sekolah";

    const { data, error } = await supabase.auth.signUp({
      email: isSekolah ? form.email : form.email_komunitas,
      password: isSekolah ? form.password : form.password_komunitas,
    });

    if (error) {
      alert("Gagal register: " + error.message);
      return;
    }

    const user = data.user;
    if (!user) return;

    if (isSekolah) {
      const { error: sekolahError } = await supabase.from("Sekolah").insert([
        {
          no: user.id,
          nama: form.nama,
          email: form.email,
          password: form.password,
          no_telepon: form.no_telepon,
          nama_sekolah: form.nama_sekolah,
          nuptk: form.nuptk,
        },
      ]);

      if (sekolahError) {
        alert("Gagal menyimpan data sekolah: " + sekolahError.message);
        return;
      }
    } else {
      const { error: insertError } = await supabase.from("Komunitas").insert([
        {
          id: user.id,
          nama_komunitas: form.nama_komunitas,
          email_komunitas: form.email_komunitas,
          password_komunitas: form.password_komunitas,
          jenis_kelamin: gender,
          jenis_akun: userRole,
          no_telepon_komunitas: form.no_telepon_komunitas,
          pic: form.pic,
          instansi: accountType,
        },
      ]);

      if (insertError) {
        alert("Gagal menyimpan data komunitas: " + insertError.message);
        return;
      }
    }

    alert("✅ Register berhasil! Silakan konfirmasi email Anda.");
  };

  // ✅ Perbaikan di sini (backtick sudah benar)
 const getButtonClass = (type, currentType, base = "bg-[#059669]") =>
  currentType === type
    ? `${base} text-white shadow-md font-semibold focus:ring-[#059669] focus:ring focus:ring-opacity-50`
    : "text-[#059669] border border-[#059669] bg-white hover:bg-green-50 font-medium hover:shadow-sm";

  const backgroundStyle = {
    background: "#ffffff",
  };

  const imagePanelStyle = {
    backgroundImage: "url('/gambar-pohon.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const SecondaryInput = () =>
    accountType === "Sekolah" ? (
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          NUPTK
        </label>
        <input
          type="text"
          name="nuptk"
          value={form.nuptk}
          onChange={handleChange}
          placeholder="Masukkan NUPTK"
          className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all duration-200"
          required
        />
      </div>
    ) : (
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Jenis Kelamin
        </label>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setGender("Laki-Laki")}
            className={`w-1/2 px-4 py-2.5 text-sm rounded-lg transition-all ${getButtonClass(
              "Laki-Laki",
              gender
            )}`}
          >
            Laki-Laki
          </button>
          <button
            type="button"
            onClick={() => setGender("Perempuan")}
            className={`w-1/2 px-4 py-2.5 text-sm rounded-lg transition-all ${getButtonClass(
              "Perempuan",
              gender
            )}`}
          >
            Perempuan
          </button>
        </div>
      </div>
    );

  return (
    <div
      className="flex justify-center items-center min-h-screen py-10 px-4 sm:px-8 font-sans -mt-8"
      style={backgroundStyle}
    >
      <section className="bg-white shadow-2xl rounded-2xl overflow-hidden w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row">
          {/* KIRI */}
          <div
            className="hidden lg:flex flex-col justify-center items-center p-8 lg:w-2/5 text-white text-center relative"
            style={imagePanelStyle}
          >
            <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

            <div className="relative z-10 flex flex-col items-center">
              {/* SVG LOGO */}
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

              <h1 className="text-2xl font-bold mt-3">
                Buat Akun Anda Sekarang
              </h1>
              <p className="mt-1 text-sm font-light text-gray-200">
                Mari bantu kami menjadikan bumi hijau kembali.
              </p>

              <div className="mt-8">
                <h2 className="text-sm font-medium">
                  Sudah punya <span className="font-bold">Akun?</span>
                </h2>
                <Link
                  href="/user/login"
                  className="inline-block mt-3 w-50 h-10 px-6 py-2 bg-white text-[#059669] font-medium transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 dark:hover:bg-[#059669]"
                >
                  Masuk
                </Link>
              </div>
            </div>
          </div>

          {/* KANAN */}
          <div className="flex items-center bg-white justify-center w-full py-8 px-6 lg:px-8 lg:w-3/5">
            <div className="w-full">
              {/* SVG Logo di Tengah */}
              <div className="flex justify-center mb-2 -mt-4">
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

              <div className="mt-0 mb-4 text-center">
                <h1 className="text-sm font-medium text-gray-700 mb-2">
                  Pilih Jenis Akun
                </h1>
                <div className="flex space-x-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setAccountType("Komunitas")}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass(
                      "Komunitas",
                      accountType
                    )}`}
                  >
                    Komunitas
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType("Sekolah")}
                    className={`px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass(
                      "Sekolah",
                      accountType
                    )}`}
                  >
                    Sekolah
                  </button>
                </div>
              </div>

              {/* FORM */}
              <form
                className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2"
                onSubmit={handleRegister}
              >
                {/* Nama PIC / Nama */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    {accountType === "Komunitas" ? "Nama PIC" : "Nama"}
                  </label>
                  <input
                    type="text"
                    name={accountType === "Komunitas" ? "pic" : "nama"}
                    value={accountType === "Komunitas" ? form.pic : form.nama}
                    onChange={handleChange}
                    placeholder={`Masukkan ${
                      accountType === "Komunitas" ? "Nama PIC" : "Nama"
                    }`}
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                {/* Nama Komunitas / Sekolah */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    {accountType === "Komunitas"
                      ? "Nama Komunitas"
                      : "Nama Sekolah"}
                  </label>
                  <input
                    type="text"
                    name={
                      accountType === "Komunitas"
                        ? "nama_komunitas"
                        : "nama_sekolah"
                    }
                    value={
                      accountType === "Komunitas"
                        ? form.nama_komunitas
                        : form.nama_sekolah
                    }
                    onChange={handleChange}
                    placeholder={`Masukkan ${
                      accountType === "Komunitas"
                        ? "Nama Komunitas"
                        : "Nama Sekolah"
                    }`}
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name={
                      accountType === "Komunitas"
                        ? "email_komunitas"
                        : "email"
                    }
                    value={
                      accountType === "Komunitas"
                        ? form.email_komunitas
                        : form.email
                    }
                    onChange={handleChange}
                    placeholder="Masukkan Email"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    name={
                      accountType === "Komunitas"
                        ? "password_komunitas"
                        : "password"
                    }
                    value={
                      accountType === "Komunitas"
                        ? form.password_komunitas
                        : form.password
                    }
                    onChange={handleChange}
                    placeholder="Masukkan Password"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                {/* No. Telepon */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    No. Telepon
                  </label>
                  <input
                    type="tel"
                    name={
                      accountType === "Komunitas"
                        ? "no_telepon_komunitas"
                        : "no_telepon"
                    }
                    value={
                      accountType === "Komunitas"
                        ? form.no_telepon_komunitas
                        : form.no_telepon
                    }
                    onChange={handleChange}
                    placeholder="Masukkan No. Telepon"
                    className="block w-full px-4 py-2 text-black border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                {/* Input Dinamis */}
                <SecondaryInput />

                {/* Jenis Akun */}
                {accountType === "Komunitas" && (
                  <div className="md:col-span-2 mt-4">
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Jenis Akun
                    </label>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setUserRole("Donatur")}
                        className={`w-1/2 px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass(
                          "Donatur",
                          userRole
                        )}`}
                      >
                        Donatur
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserRole("Penanam")}
                        className={`w-1/2 px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass(
                          "Penanam",
                          userRole
                        )}`}
                      >
                        Penanam
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <div className="md:col-span-2 mt-6">
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white capitalize transition-colors duration-300 transform bg-[#059669] rounded-xl hover:bg-[#037f58] focus:outline-none focus:ring focus:ring-green-300 shadow-lg hover:shadow-xl"
                  >
                    Daftar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}