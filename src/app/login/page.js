'use client'

import React from "react";

import Image from "next/image";
import  Link  from "next/link";

export default function Login() {
  return (
    <div>
      <div className="flex w-full mt-10 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-white lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center -mt-5 ">
            <img
              className="w-20 h-20 object-contain"
              src="/logo.png"
              alt="Logo"
            />
          </div>

          <p className="mt-3 text-xl text-center text-[#4CAF50] ">
           Selamat Datang Kembali!
          </p>

          <a
            href="#"
            className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-[#4CAF50] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1CA221] "
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="w-5/6 px-4 py-3 font-bold text-center">
              Masuk dengan Google
            </span>
          </a>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
             atau masuk dengan email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email 
            </label>
            <input
              id="Masukan Email"
              className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
              type="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
              <a
                href="#"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forget Password?
              </a>
            </div>

            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
              type="password"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#4CAF50] rounded-lg hover:bg-[#69cd6d] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Masuk
            </button>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border- md:w-1/4"></span>

            <Link
              href="/register"
              className="text-xs text-gray-500  dark:text-gray-400 hover:underline"
            >
              Belum punya akun?
            </Link>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
        {/* Bagian kanan (gambar + teks tengah) */}
<div
  className="relative hidden bg-cover lg:flex lg:w-1/2 items-center justify-center rounded-tr-lg rounded-br-lg"
  style={{
    backgroundImage: "url('/gambar-pohon.png')", // gambar lokal
  }}
>
  {/* Overlay gelap transparan */}
  <div className="absolute inset-0 bg-black/40 rounded-tr-lg rounded-br-lg"></div>

  {/* Konten tengah di atas gambar */}
  <div className="relative z-10 text-center text-white p-6">
    <img src="/logo.png" alt="Logo" className="w-30 h-30 object-contain  ml-26" />
    <p className="mt-4 font-semibold text-lg">
      Selamat datang kembali, Penjaga Bumi
    </p>
    <p className="text-sm mt-1">
      Kita butuh kamu lagi. Bumi gak bisa nunggu
    </p>
    <p className="mt-4 text-sm">
      Belum Punya <span className="text-[#4CAF50] font-semibold">akun?</span>
    </p>
    <a
      href="/register"
      className="inline-block mt-3 w-50 h-10 px-6 py-2 bg-white text-[#4CAF50] font-medium transition-colors duration-300 transform border rounded-lg dark:border-[#4CAF50] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1CA221]"
    >
      Daftar
    </a>
  </div>
</div>


        
      </div>
    </div>
  );
}
