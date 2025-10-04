// components/Footer.jsx
import { FaInstagram, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-green-200 py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kolom 1 */}
        <div>
          <h2 className="text-green-600 text-xl font-bold">reforestacia</h2>
          <p className="text-gray-600 mt-2">
            Platform pengumpulan dana sekolah untuk reforestasi dan penanaman
            pohon di wilayah rawan banjir & gundul.
          </p>
        </div>

        {/* Kolom 2 */}
        <div>
          <h3 className="text-green-600 font-semibold mb-3">Aksi Cepat</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-green-600 hover:underline hover:text-green-800"
              >
                Donasi Sekarang
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-green-600 hover:underline hover:text-green-800"
              >
                Lihat Laporan Dana
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-green-600 hover:underline hover:text-green-800"
              >
                Lokasi Penanaman
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-green-600 hover:underline hover:text-green-800"
              >
                Daftar Jadi Relawan
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3 */}
        <div>
          <h3 className="text-green-600 font-semibold mb-3">Terhubung</h3>
          <p className="text-gray-600 mb-3">reforestacia@gmail.com</p>
          <div className="flex space-x-4 text-green-600 text-2xl">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaGithub /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-green-200 pt-4 text-center text-sm text-gray-500">
        © 2025 Reforestacia. All rights reserved.
      </div>
    </footer>
  );
}
