import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Bagian kiri */}
        <div className="flex flex-col items-start md:items-start space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-[#047857] " viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24 42V26m17.942-15.993c-.776 13.024-9.13 17.236-15.946 17.896C24.896 28.009 24 27.104 24 26v-8.372c0-.233.04-.468.125-.684C27.117 9.199 34.283 8.155 40 8.02c1.105-.027 2.006.884 1.94 1.987M7.998 6.072c9.329.685 14.197 6.091 15.836 9.558c.115.242.166.508.166.776v7.504c0 1.14-.96 2.055-2.094 1.94C7.337 24.384 6.11 14.786 6.009 8C5.993 6.894 6.897 5.99 8 6.072"/></svg>
            <h1 className="text-4xl font-extrabold text-[#059669] tracking-wide">
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
        <div className="relative flex justify-center  md:justify-end">
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
            <div className="bg-[#059669] text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center w-32">
              <div className="flex flex-row items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 512 512"><circle cx="152" cy="184" r="72" fill="currentColor"/><path fill="currentColor" d="M234 296c-28.16-14.3-59.24-20-82-20c-44.58 0-136 27.34-136 82v42h150v-16.07c0-19 8-38.05 22-53.93c11.17-12.68 26.81-24.45 46-34"/><path fill="currentColor" d="M340 288c-52.07 0-156 32.16-156 96v48h312v-48c0-63.84-103.93-96-156-96"/><circle cx="340" cy="168" r="88" fill="currentColor"/></svg>
              <p className="text-4xl font-bold leading-none">3</p> 
              </div>
              <p className="text-md">Komunitas</p>
            </div>

            {/* Bibit Ditanam */}
            <div className="bg-[#047857] text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center w-32">
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
