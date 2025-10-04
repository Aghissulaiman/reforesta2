// components/Hero.jsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-16"> {/* hilangin bg-gradient karena pakai global */}
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Text */}
        <div className="text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">REFORESTACIA</h1>
          <p className="text-sm md:text-base text-gray-100 leading-relaxed max-w-sm">
            Cara paling sederhana Untuk Menyalurkan dana untuk penghijauan.
          </p>
          <button className="bg-white text-green-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-green-100 transition">
            Mulai Sekarang
          </button>
        </div>

        {/* Right Image + Stats */}
        <div className="flex flex-col items-center relative">
          {/* Gambar utama */}
          <div className="relative w-[350px] h-[220px] md:w-[400px] md:h-[250px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/LHero.png" // ganti sesuai path gambar
              alt="Tanam Pohon"
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Stats Card mengambang di atas gambar */}
          <div className="absolute -bottom-8 flex gap-6">
            {/* Komunitas */}
            <div className="bg-yellow-400 text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-2xl mb-1">👥</span>
              <p className="text-lg font-bold leading-none">3</p>
              <p className="text-xs">Komunitas</p>
            </div>

            {/* Bibit Ditanam */}
            <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center">
              <span className="text-2xl mb-1">🌱</span>
              <p className="text-lg font-bold leading-none">1000</p>
              <p className="text-xs">Bibit Ditanam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
