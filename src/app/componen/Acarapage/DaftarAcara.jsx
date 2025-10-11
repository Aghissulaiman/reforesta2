"use client";

import { useState, useMemo } from "react"; // Tambahkan useMemo
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { id } from "date-fns/locale";
import { format, isSameDay } from "date-fns";
import { useAcara } from "./AcaraContext";
import "./calendarCustom.css";

// Fungsi utilitas untuk mengonversi string tanggal ke Date object
const parseAcaraList = (list) => {
  return list.map(acara => ({
    ...acara,
    // Mengonversi string YYYY-MM-DD dari form menjadi Date object
    // Jika data dari form belum berupa Date, kita buat Date object baru
    tanggal: acara.tanggal instanceof Date ? acara.tanggal : new Date(acara.tanggal),
  }));
};

export default function DaftarAcara() {
  const router = useRouter();
  const [tab, setTab] = useState("berlangsung");
  const [date, setDate] = useState(new Date());
  const { acaraList: rawAcaraList } = useAcara();

  // 1. Proses Data: Gunakan useMemo untuk memproses rawAcaraList
  const acaraList = useMemo(() => parseAcaraList(rawAcaraList), [rawAcaraList]);

  // 2. Filter Tanggal: Dapatkan hanya tanggal yang sudah berupa Date Object
  const tanggalBerlangsung = acaraList
    .filter(a => a.status.toLowerCase() === "sedang berlangsung")
    .map(a => a.tanggal);

  const tanggalAkan = acaraList
    .filter(a => a.status.toLowerCase() === "akan datang")
    .map(a => a.tanggal);

  // 3. Filter Acara berdasarkan Tab yang aktif
  const filteredAcara = acaraList.filter(a =>
    tab === "berlangsung"
      ? a.status.toLowerCase() === "sedang berlangsung"
      : a.status.toLowerCase() === "akan datang"
  );

  const handleClickAcara = (id) => {
    router.push(`/user/acara/${id}`);
  };

  // --- TAMPILAN (Sama seperti sebelumnya, hanya menggunakan filteredAcara) ---
  return (
    <section className="bg-white rounded-2xl shadow-md p-8 max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-8">
      {/* kiri */}
      <div className="flex-1">
        <div className="flex gap-3 mb-6">
          {/* Tombol Berlangsung */}
          <button
            onClick={() => setTab("berlangsung")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              tab === "berlangsung"
                ? "bg-[#059669] text-white border-[#059669]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Berlangsung
          </button>
          {/* Tombol Akan Datang */}
          <button
            onClick={() => setTab("akan")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              tab === "akan"
                ? "bg-gray-300 text-gray-800 border-gray-400" // Warna yang lebih netral
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Akan Datang
          </button>
        </div>

        {/* daftar acara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredAcara.length > 0 ? (
            filteredAcara.map(a => (
              <div
                key={a.id}
                onClick={() => handleClickAcara(a.id)}
                className={`flex justify-between items-center rounded-xl px-4 py-3 border shadow-sm cursor-pointer hover:shadow-md transition ${
                  a.status.toLowerCase() === "sedang berlangsung"
                    ? "bg-[#E7F8EE] border-[#059669]"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">{a.title}</p>
                  <p className="text-xs text-gray-600">{a.status}</p>
                </div>
                <div
                  className={`rounded-lg px-3 py-1 text-[10px] font-semibold ${
                    a.status.toLowerCase() === "sedang berlangsung"
                      ? "bg-[#059669] text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {a.time}
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 p-4 text-center text-gray-500 bg-gray-50 rounded-lg">
              Tidak ada acara yang ditemukan pada kategori ini.
            </div>
          )}
        </div>
      </div>

      {/* kanan: kalender */}
      <div className="w-full md:w-[320px] flex justify-center items-center">
        <div className="bg-gray-100 rounded-2xl shadow-md p-5 w-full">
          <h2 className="text-center font-semibold mb-4 text-lg text-gray-800">Kalender</h2>
          <div className="rounded-xl overflow-hidden shadow-inner bg-white p-3">
            <Calendar
              onChange={setDate}
              value={date}
              locale="id-ID"
              formatShortWeekday={(locale, date) => format(date, "EEEEE", { locale: id }).toUpperCase()}
              next2Label={null}
              prev2Label={null}
              className="custom-calendar w-full"
              tileContent={({ date, view }) => {
                if (view === "month") {
                  if (tanggalBerlangsung.some(d => isSameDay(d, date))) {
                    return <div className="dot-dot bg-[#059669]"></div>;
                  }
                  if (tanggalAkan.some(d => isSameDay(d, date))) {
                    return <div className="dot-dot bg-gray-400"></div>;
                  }
                }
                return null;
              }}
            />
          </div>

          {/* legenda */}
          <div className="flex justify-center gap-4 text-xs mt-3 text-gray-600">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-[#059669] rounded-full"></span> Berlangsung
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full"></span> Akan Datang
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}