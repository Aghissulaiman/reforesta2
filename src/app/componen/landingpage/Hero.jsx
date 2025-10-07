import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Bagian kiri */}
        <div className="flex flex-col items-start md:items-start space-y-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="w-40 h-40z text-[#059669]" viewBox="0 0 24 24"><path fill="currentColor" d="M5.998 3a7 7 0 0 1 6.913 5.895A6.48 6.48 0 0 1 17.498 7h4.5v2.5a6.5 6.5 0 0 1-6.5 6.5h-2.5v5h-2v-8h-2a7 7 0 0 1-7-7V3zm14 6h-2.5a4.5 4.5 0 0 0-4.5 4.5v.5h2.5a4.5 4.5 0 0 0 4.5-4.5zm-14-4h-2v1a5 5 0 0 0 5 5h2v-1a5 5 0 0 0-5-5"/></svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 36 36"><path fill="currentColor" d="M18 2C10.8 1.7 4.8 7.3 4.5 14.5S9.8 27.7 17 28v-5.2l-5.2-5.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L17 20v-6.2l-2.7-2.7c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L19 13v3l3.3-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4L19 18.8V28c7.2-.3 12.8-6.3 12.5-13.5S25.2 1.7 18 2" class="clr-i-solid clr-i-solid-path-1"/><path fill="currentColor" d="M18 28h-1v5c0 .6.4 1 1 1s1-.4 1-1v-5z" class="clr-i-solid clr-i-solid-path-2"/><path fill="none" d="M0 0h36v36H0z"/></svg>
              <p className="text-lg font-bold leading-none">1000</p>
              <p className="text-xs">Bibit Ditanam</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
