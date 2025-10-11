"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock, Users, Leaf, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { acaraList } from "./dataAcara";

export default function AcaraDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = JSON.parse(localStorage.getItem("events")) || [];
    const localEvent = stored.find((_, index) => index + 1000 === Number(id));
    const staticEvent = acaraList.find((a) => a.id === Number(id));
    setEvent(staticEvent || localEvent || null);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-700 p-8">
        <p className="text-xl font-medium mb-4">Acara tidak ditemukan 😢</p>
        <button
          onClick={() => router.push("/user/acara")}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition shadow-md"
        >
          Kembali ke Daftar Acara
        </button>
      </div>
    );
  }

  const {
    title,
    desc,
    location,
    date,
    time,
    image,
    benefits,
    gallery,
    team,
    status,
  } = event;

  const statusColor =
    status === "Sedang Berlangsung"
      ? "bg-green-600 text-white"
      : "bg-yellow-400 text-gray-900";

  const manfaatList = benefits?.length
    ? benefits
    : ["Menambah penghijauan", "Menjaga kelestarian alam"];
  const galeriList = gallery?.length ? gallery : [image];
  const timList = team?.length
    ? team
    : [{ name: "Relawan", role: "Peserta Penanaman" }];

  return (
    <section className="min-h-screen bg-gray-50 py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-green-700 font-medium mb-8 hover:text-green-900 transition-colors p-2 rounded-lg"
        >
          <ArrowLeft size={20} /> Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ====== DETAIL KEGIATAN ====== */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gambar utama */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="w-full h-[300px] md:h-[500px] relative">
                <Image
                  src={image || "/default.jpg"}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#064E3B] leading-tight mb-4">
                {title}
              </h1>
              {status && (
                <p
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${statusColor} mb-6`}
                >
                  {status}
                </p>
              )}

              <div className="flex flex-wrap gap-x-10 gap-y-4 text-base text-gray-600 border-t border-b border-gray-100 py-4">
                {time && (
                  <p className="flex items-center gap-2 font-medium">
                    <Clock size={18} className="text-green-600" /> {time}
                  </p>
                )}
                {date && (
                  <p className="flex items-center gap-2 font-medium">
                    <Clock size={18} className="text-green-600" /> {date}
                  </p>
                )}
                {location && (
                  <p className="flex items-center gap-2 font-medium">
                    <MapPin size={18} className="text-green-600" /> {location}
                  </p>
                )}
              </div>

              <p className="text-gray-700 text-lg leading-relaxed pt-6">
                {desc || "Belum ada deskripsi untuk acara ini."}
              </p>
            </div>

            {/* Manfaat */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h2 className="text-3xl font-bold text-[#065F46] mb-5 flex items-center gap-3">
                <Leaf size={24} className="text-green-600" /> Manfaat Kegiatan
              </h2>
              <ul className="list-none text-gray-700 space-y-3 pl-0">
                {manfaatList.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl mt-1 font-bold">•</span>
                    <span className="text-lg">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Galeri */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h2 className="text-3xl font-bold text-[#065F46] mb-6">
                Galeri Penanaman
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galeriList.map((img, i) => (
                  <div
                    key={i}
                    className="w-full aspect-square rounded-lg overflow-hidden border border-gray-100"
                  >
                    <Image
                      src={img || "/default.jpg"}
                      alt={`Galeri ${i}`}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transform hover:scale-105 transition duration-500 ease-in-out"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tim */}
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200">
              <h2 className="text-3xl font-bold text-[#065F46] mb-6 flex items-center gap-3">
                <Users size={24} className="text-green-600" /> Tim Penanaman
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {timList.map((t, i) => (
                  <div
                    key={i}
                    className="p-5 bg-green-50/50 border border-green-300 rounded-xl transition duration-300 hover:bg-green-100"
                  >
                    <p className="font-bold text-lg text-[#064E3B]">{t.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{t.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ====== SIDEBAR ====== */}
          <div className="lg:col-span-1 space-y-6 sticky top-8 h-fit">
            <div className="bg-green-100 p-8 rounded-2xl text-gray-800 border border-green-300">
              <div className="text-center">
                <Leaf size={48} className="mx-auto mb-4 text-[#064E3B]" />
                <h3 className="text-3xl font-extrabold mb-2 text-[#064E3B]">
                  Tanamkan Kebaikan!
                </h3>
                <p className="text-gray-600 mb-6 text-base font-normal max-w-xs mx-auto">
                  Donasi Anda membantu mewujudkan aksi nyata untuk bumi.
                </p>
                <button className="w-full bg-[#15803D] hover:bg-[#065F46] text-white font-bold text-lg px-6 py-3 rounded-xl transition transform hover:scale-[1.01] shadow-lg shadow-[#15803D]/40">
                  <div className="flex items-center justify-center gap-3">
                    <Heart size={20} fill="white" stroke="none" /> Donasi Sekarang
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h4 className="text-xl font-bold text-gray-800 mb-4">
                Informasi Cepat
              </h4>
              <p className="text-sm text-gray-600 mb-2">
                ID Acara:{" "}
                <span className="font-semibold text-gray-800">#{id}</span>
              </p>
              <p className="text-sm text-gray-600">
                Tipe Kegiatan:{" "}
                <span className="font-semibold text-gray-800">Reboisasi</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
