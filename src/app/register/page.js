"use client";

import { supabase } from "../../../lib/supabaseClient";
import React, { useState } from "react";
import useAuthRedirect from "../../../hooks/useAuthRedirect";


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

    // Sekolah
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

    alert("✅ Register berhasil! Cek email untuk verifikasi akun kamu.");
  };

  const getButtonClass = (type, currentType, base = "bg-green-600") =>
    currentType === type
      ? `${base} text-white shadow-md font-semibold focus:ring-green-300 focus:ring focus:ring-opacity-50`
      : "text-green-600 border border-green-600 bg-white hover:bg-green-50 font-medium dark:text-gray-400 dark:border-gray-500 hover:dark:bg-gray-800";

  const backgroundStyle = {
    background: "linear-gradient(135deg, #4CAF50, #039B09)",
  };

  const imagePanelStyle = {
    backgroundImage: "url('/gambar-pohon.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const SecondaryInput = () =>
    accountType === "Sekolah" ? (
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          NUPTK
        </label>
        <input
          type="text"
          name="nuptk"
          value={form.nuptk}
          onChange={handleChange}
          placeholder="Masukkan NUPTK"
          className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
          required
        />
      </div>
    ) : (
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-700">
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
      <section className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden w-full max-w-6xl">
        <div className="flex flex-col lg:flex-row">
          <div
            className="hidden lg:flex flex-col justify-center items-center p-8 lg:w-2/5 text-white text-center"
            style={imagePanelStyle}
          >
            <img src="/logo.png" alt="Logo" className="w-40 h-40 object-contain" />
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
              <button className="mt-3 w-32 h-10 px-6 py-2 bg-white text-[#4CAF50] font-medium transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 dark:hover:bg-[#1CA221]">
                Masuk
              </button>
            </div>
          </div>

          {/* Kanan - form */}
          <div className="flex items-center bg-white justify-center w-full py-8 px-6 lg:px-8 lg:w-3/5">
            <div className="w-full">
              <img src="/logo.png" alt="Logo" className="w-30 h-30 object-contain -mt-5" />
              <div className="mt-0 mb-4">
                <h1 className="text-sm font-medium text-gray-700 mb-2">
                  Pilih Jenis Akun
                </h1>
                <div className="flex space-x-3">
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
                    value={
                      accountType === "Komunitas" ? form.pic : form.nama
                    }
                    onChange={handleChange}
                    placeholder={`Masukkan ${accountType === "Komunitas" ? "Nama PIC" : "Nama"}`}
                    className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 hover:border-2 transition-all"
                    required
                  />
                </div>

                {/* Nama Komunitas / Sekolah */}
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    {accountType === "Komunitas" ? "Nama Komunitas" : "Nama Sekolah"}
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
                    className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 hover:border-2 transition-all"
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
                    name={accountType === "Komunitas" ? "email_komunitas" : "email"}
                    value={
                      accountType === "Komunitas"
                        ? form.email_komunitas
                        : form.email
                    }
                    onChange={handleChange}
                    placeholder="Masukkan Email"
                    className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 hover:border-2 transition-all"
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
                    name={accountType === "Komunitas" ? "password_komunitas" : "password"}
                    value={
                      accountType === "Komunitas"
                        ? form.password_komunitas
                        : form.password
                    }
                    onChange={handleChange}
                    placeholder="Masukkan Password"
                    className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 hover:border-2 transition-all"
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
                    name={accountType === "Komunitas" ? "no_telepon_komunitas" : "no_telepon"}
                    value={
                      accountType === "Komunitas"
                        ? form.no_telepon_komunitas
                        : form.no_telepon
                    }
                    onChange={handleChange}
                    placeholder="Masukkan No. Telepon"
                    className="block w-full px-4 py-2 text-black border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 hover:border-2 transition-all"
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
                    className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-xl hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 shadow-lg hover:shadow-xl"
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
