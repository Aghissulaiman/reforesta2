// components/Footer.jsx
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#047857] py-10 text-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kolom 1 */}
        <div>
          <h2 className="text-white text-xl font-bold">reforestacia</h2>
          <p className="text-gray-100 mt-2">
            Platform pengumpulan dana sekolah untuk reforestasi dan penanaman
            pohon di wilayah rawan banjir & gundul.
          </p>
        </div>

        {/* Kolom 2 */}
        <div>
          <h3 className="text-white font-semibold mb-3">Aksi Cepat</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="hover:underline hover:text-green-200 transition"
              >
                Donasi Sekarang
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-green-200 transition"
              >
                Lihat Laporan Dana
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-green-200 transition"
              >
                Lokasi Penanaman
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline hover:text-green-200 transition"
              >
                Daftar Jadi Relawan
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3 */}
        <div>
          <h3 className="text-white font-semibold mb-3">Terhubung</h3>
          <p className="text-gray-100 mb-3">reforestacia@gmail.com</p>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-green-200"><FaInstagram /></a>
            <a href="#" className="hover:text-green-200"><FaFacebook /></a>
            <a href="#" className="hover:text-green-200"><FaGithub /></a>
            <a href="#" className="hover:text-green-200"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-green-600 pt-4 text-center text-sm text-gray-100">
        © 2025 Reforestacia. All rights reserved.
      </div>
    </footer>
  );
}
