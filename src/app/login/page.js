'use client'

import React from "react";

import Image from "next/image";
import  Link  from "next/link";

export default function Login() {
  return (
    <div>
      <div className="flex w-full mt-30 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-white lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
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

          <p className="mt-3 text-xl text-center text-[#059669] ">
           Selamat Datang Kembali!
          </p>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email 
            </label>
            <input
              id="Masukan Email"
              className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
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
              className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#059669] rounded-lg focus:border-[#059669] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
              type="password"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#059669] rounded-lg hover:bg-[#059669] focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
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
              <div className="flex justify-center mb-2 -mt-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-30 h-30 text-[#047857]"
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
                Selamat datang kembali, Penjaga Bumi
              </p>
              <p className="text-sm mt-1">
                Kita butuh kamu lagi. Bumi gak bisa nunggu
              </p>
              <p className="mt-4 text-sm">
                Belum Punya <span className="text-[#059669] font-semibold">akun?</span>
              </p>
              <a
                href="/register"
                className="inline-block mt-3 w-50 h-10 px-6 py-2 bg-white text-[#059669] font-medium transition-colors duration-300 transform border rounded-lg dark:border-[#059669] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#059669]"
              >
                Daftar
              </a>
            </div>
          </div>


        
      </div>
    </div>
  );
}
