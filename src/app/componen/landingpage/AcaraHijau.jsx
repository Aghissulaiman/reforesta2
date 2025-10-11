"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AcaraHijau() {
  const defaultEvents = [
    { title: "Acara Hijau Hutan Bogor", status: "Sedang Berlangsung", time: "07.00–10.00 WIB", active: true },
    { title: "Acara Hijau Gunung Salak", status: "Sedang Berlangsung", time: "08.00–11.00 WIB", active: true },
    { title: "Acara Hijau Taman Nasional", status: "Belum Dimulai", time: "09.00–12.00 WIB", active: false },
    { title: "Acara Hijau Kebun Raya", status: "Belum Dimulai", time: "10.00–13.00 WIB", active: false },
  ];

  const [events, setEvents] = useState(defaultEvents);

  // Ambil data tambahan dari localStorage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    if (storedEvents.length > 0) {
      setEvents((prev) => [...prev, ...storedEvents]);
    }
  }, []);

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-white">
      <div className="absolute inset-0 flex justify-center items-start pt-10">
        <Image
          src="/peta dunia.png"
          alt="World Map"
          width={1000}
          height={800}
          className="opacity-70 object-contain pointer-events-none select-none"
        />
      </div>

      <div className="absolute -bottom-8 left-0 w-[900px] max-w-[80%]">
        <Image
          src="/orangNanem.png"
          alt="Ilustrasi Menanam"
          width={900}
          height={500}
          className="object-contain pointer-events-none select-none"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-12">
          Acara Hijau
        </h2>

        <div className="flex flex-col items-end gap-6 pr-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <Link
                key={i}
                href={`/user/acara/${i}`}
                className={`w-64 md:w-72 rounded-2xl px-5 py-4 shadow-md flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg ${
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
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-10 pr-4">
          <Link
            href="/user/acara"
            className="bg-[#059669] hover:bg-[#047857] text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
          >
            Selengkapnya
          </Link>
        </div>
      </div>
    </section>
  );
}
