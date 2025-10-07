// components/AcaraHijau.jsx
import Image from "next/image";

export default function AcaraHijau() {
  const events = [
    {
      title: "Acara Hijau Hutan Bogor",
      status: "Sedang Berlangsung",
      time: "07.00–10.00 WIB",
      active: true,
    },
    {
      title: "Acara Hijau Hutan Bogor",
      status: "Sedang Berlangsung",
      time: "07.00–10.00 WIB",
      active: true,
    },
    {
      title: "Acara Hijau Hutan Bogor",
      status: "Belum Dimulai",
      time: "07.00–10.00 WIB",
      active: false,
    },
    {
      title: "Acara Hijau Hutan Bogor",
      status: "Belum Dimulai",
      time: "07.00–10.00 WIB",
      active: false,
    },
  ];

  return (
    <section className="relative py-40 bg-white">
      {/* Background Images */}
      <div className="absolute inset-0">
        <Image
          src="/peta dunia.png"
          alt="World Map"
          fill
          className="object-contain opacity-80"
        />
       <div className="absolute bottom-0 left-0 w-full h-[300px] flex justify-start">
  <Image
    src="/orangNanem.png"
    alt="Plant Illustration"
    fill
    className="object-contain object-left"
  />
</div>
      </div>

      {/* Konten */}
      <div className="container mx-auto px-6 relative">
        {/* Judul */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6 text-center">
          Acara Hijau
        </h2>

        {/* Event Cards align kanan */}
        <div className="flex flex-col items-end gap-4 mb-10 pr-10">
          <div className="flex gap-4 justify-end w-full">
            {events.slice(0, 2).map((event, i) => (
              <div
                key={i}
                className={`w-56 rounded-xl px-4 py-3 shadow-md flex justify-between items-center ${
                  event.active
                    ? "bg-[#059669] text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                <div>
                  <p className="font-semibold text-sm">{event.title}</p>
                  <p className="text-xs">{event.status}</p>
                </div>
                <div className="bg-white text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                  {event.time}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-end w-full">
            {events.slice(2).map((event, i) => (
              <div
                key={i}
                className={`w-56 rounded-xl px-4 py-3 shadow-md flex justify-between items-center ${
                  event.active
                    ? "bg-[#059669] text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                <div>
                  <p className="font-semibold text-sm">{event.title}</p>
                  <p className="text-xs">{event.status}</p>
                </div>
                <div className="bg-white text-green-700 px-2 py-1 rounded-md text-xs font-semibold">
                  {event.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Button align kanan */}
        <div className="flex justify-end pr-10">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg transition">
            Selengkapnya
          </button>
        </div>
      </div>
    </section>
  );
}
    