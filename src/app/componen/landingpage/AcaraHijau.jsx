"use client";
import Image from "next/image";

export default function AcaraHijau() {
  const events = [
    { title: "Acara Hijau Hutan Bogor", status: "Sedang Berlangsung", time: "07.00–10.00 WIB", active: true },
    { title: "Acara Hijau Hutan Bogor", status: "Sedang Berlangsung", time: "07.00–10.00 WIB", active: true },
    { title: "Acara Hijau Hutan Bogor", status: "Belum Dimulai", time: "07.00–10.00 WIB", active: false },
    { title: "Acara Hijau Hutan Bogor", status: "Belum Dimulai", time: "07.00–10.00 WIB", active: false },
  ];

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-white">
      {/* 🌍 Background Peta Dunia */}
      <div className="absolute inset-0 flex justify-center items-start pt-10">
        <Image
          src="/World.png"
          alt="World Map"
          width={1000}
          height={600}
          className="opacity-70 object-contain pointer-events-none select-none"
        />
      </div>

      {/* 🧍‍♀️ Ilustrasi Orang Nanem */}
      <div className="absolute bottom-0 left-0 w-[600px] max-w-[80%]">
        <Image
          src="/orangNanem.png"
          alt="Ilustrasi Menanam"
          width={800}
          height={500}
          className="object-contain pointer-events-none select-none"
        />
      </div>

      {/* 🌱 Konten */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        {/* Judul */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-12">
          Acara Hijau
        </h2>

        {/* Grid Event Cards */}
        <div className="flex flex-col items-end gap-6 pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <div
                key={i}
                className={`w-64 md:w-72 rounded-2xl px-5 py-4 shadow-md flex justify-between items-center ${
                  event.active ? "bg-[#059669] text-white" : "bg-[#B7E4C7] text-[#064E3B]"
                }`}
              >
                <div>
                  <p className="font-semibold text-sm leading-tight">{event.title}</p>
                  <p className="text-xs opacity-90">{event.status}</p>
                </div>
                <div className="bg-white text-[#059669] px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap">
                  {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button kanan bawah */}
        <div className="flex justify-end mt-10 pr-4">
          <button className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-6 py-2 rounded-full shadow-md transition">
            Selengkapnya
          </button>
        </div>
      </div>
    </section>
  );
}
