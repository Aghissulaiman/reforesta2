"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function AcaraHijau() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data dari Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from("acara_penanaman")
          .select("id, judul_acara, status, waktu");

        if (error) throw error;

        // Format ulang biar cocok sama struktur kartu
        const formatted = data.map((e) => ({
          id: e.id,
          title: e.judul_acara,
          status: e.status,
          time: e.waktu,
          active: e.status?.toLowerCase() === "sedang berlangsung",
        }));

        setEvents(formatted);
      } catch (err) {
        console.error("Gagal ambil data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className="relative py-32 md:py-40 overflow-hidden bg-white">
      {/* Background peta */}
      <div className="absolute inset-0 flex justify-center items-start pt-10">
        <Image
          src="/peta dunia.png"
          alt="World Map"
          width={1000}
          height={800}
          className="opacity-70 object-contain pointer-events-none select-none"
        />
      </div>

      {/* Gambar orang nanem */}
      <div className="absolute -bottom-8 left-0 w-[900px] max-w-[80%]">
        <Image
          src="/orangNanem.png"
          alt="Ilustrasi Menanam"
          width={900}
          height={500}
          className="object-contain pointer-events-none select-none"
        />
      </div>

      {/* Konten utama */}
      <div className="relative z-10 container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-12">
          Acara Hijau
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Memuat acara...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada acara.</p>
        ) : (
          <>
            <div className="flex flex-col items-end gap-6 pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    href={`/user/acara/${event.id}`}
                    className={`w-64 md:w-72 rounded-2xl px-5 py-4 shadow-md flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-lg ${
                      event.active
                        ? "bg-[#059669] text-white"
                        : "bg-[#B7E4C7] text-[#064E3B]"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-sm leading-tight">
                        {event.title}
                      </p>
                      <p className="text-xs opacity-90">{event.status}</p>
                    </div>
                    <div className="bg-white text-[#059669] px-2 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap">
                      {event.time || "-"}
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
          </>
        )}
      </div>
    </section>
  );
}
