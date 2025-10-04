// components/Navbar.jsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center mt-6">
      <div className="flex items-center justify-between bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 w-[800px] max-w-[90%] relative"
           style={{ boxShadow: "0 0 10px rgba(0, 128, 255, 0.5)" }}>
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-2xl">🌱</span>
          <span className="font-medium text-green-600 text-lg">reforesta</span>
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/" className="font-semibold text-green-600 hover:text-green-700 transition">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/tanam" className="text-gray-700 hover:text-green-600 transition">
              Tanam
            </Link>
          </li>
          <li>
            <Link href="/acara" className="text-gray-700 hover:text-green-600 transition">
              Acara
            </Link>
          </li>
        </ul>

        {/* Button Daftar */}
        <Link 
          href="/daftar"
          className="px-4 py-1 rounded-full border border-green-500 text-green-600 font-medium hover:bg-green-100 transition"
        >
          Daftar
        </Link>
      </div>
    </nav>
  );
}
