import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Bagian kiri */}
        <div className="flex flex-col items-start md:items-start space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-green-700"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path d="M12 22v-8H9a7 7 0 0 1-7-7V3h2a7 7 0 0 1 7 7v1h2a6 6 0 0 1 6-6h4v2a6 6 0 0 1-6 6h-2v9h-2z" />
            </svg>
            <h1 className="text-4xl font-extrabold text-green-700 tracking-wide">
              REFORESTACIA
            </h1>
          </div>

          {/* Deskripsi */}
          <p className="text-gray-600 text-base max-w-sm leading-relaxed">
            Cara paling sederhana untuk menyalurkan dana untuk penghijauan.
          </p>

          {/* Tombol */}
          <button className="px-6 py-2 border-2 border-green-700 text-green-700 font-medium rounded-full hover:bg-green-700 hover:text-white transition-all duration-300">
            Mulai Sekarang
          </button>
        </div>

        {/* Bagian kanan */}
        <div className="relative flex justify-center md:justify-end">
          {/* Gambar utama */}
          <div className="w-[380px] h-[260px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/LHero.png"
              alt="Menanam pohon"
              width={380}
              height={260}
              className="object-cover"
            />
          </div>

          {/* Kotak statistik */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            {/* Komunitas */}
            <div className="bg-green-700 text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center w-32">
              <span className="text-2xl mb-1">👥</span>
              <p className="text-lg font-bold leading-none">3</p>
              <p className="text-xs">Komunitas</p>
            </div>

            {/* Bibit Ditanam */}
            <div className="bg-green-800 text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center w-32">
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
