"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { id } from "date-fns/locale";
import { format, isSameDay } from "date-fns";
import "./calendarCustom.css"; // tambahin custom css ini

export default function AcaraSection() {
  const [tab, setTab] = useState("berlangsung");
  const [date, setDate] = useState(new Date());

  // daftar acara
  const acaraList = [
    { id: 1, nama: "Acara Hijau Hutan Bogor", status: "berlangsung", waktu: "07.00–10.00 WIB", tanggal: new Date(2025, 9, 6) },
    { id: 2, nama: "Acara Hijau Bandung", status: "berlangsung", waktu: "07.00–10.00 WIB", tanggal: new Date(2025, 9, 7) },
    { id: 3, nama: "Acara Hijau Jakarta", status: "akan", waktu: "08.00–11.00 WIB", tanggal: new Date(2025, 9, 10) },
    { id: 4, nama: "Acara Hijau Depok", status: "akan", waktu: "09.00–12.00 WIB", tanggal: new Date(2025, 9, 13) },
  ];

  // tanggal penanda
  const tanggalBerlangsung = acaraList.filter(a => a.status === "berlangsung").map(a => a.tanggal);
  const tanggalAkan = acaraList.filter(a => a.status === "akan").map(a => a.tanggal);

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-8">
      {/* kiri */}
      <div className="flex-1">
        <div className="flex gap-3 mb-6">
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
          <button
            onClick={() => setTab("akan")}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              tab === "akan"
                ? "bg-gray-300 text-gray-800 border-gray-400"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Akan Datang
          </button>
        </div>

        {/* daftar acara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {acaraList
            .filter(a => (tab === "berlangsung" ? a.status === "berlangsung" : a.status === "akan"))
            .map(a => (
              <div
                key={a.id}
                className={`flex justify-between items-center rounded-xl px-4 py-3 border shadow-sm ${
                  a.status === "berlangsung"
                    ? "bg-[#E7F8EE] border-[#059669]"
                    : "bg-gray-100 border-gray-300"
                }`}
              >
                <div>
                  <p className="font-semibold text-sm text-gray-800">{a.nama}</p>
                  <p className="text-xs text-gray-600">
                    {a.status === "berlangsung" ? "Sedang Berlangsung" : "Akan Datang"}
                  </p>
                </div>
                <div
                  className={`rounded-lg px-3 py-1 text-[10px] font-semibold ${
                    a.status === "berlangsung"
                      ? "bg-[#059669] text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {a.waktu}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* kanan: kalender */}
      <div className="w-full md:w-[320px] flex justify-center items-center">
        <div className="bg-gray-100 rounded-2xl shadow-md p-5 w-full">
          <h2 className="text-center font-semibold mb-4 text-lg text-gray-800">
            Kalender
          </h2>
          <div className="rounded-xl overflow-hidden shadow-inner bg-white p-3">
            <Calendar
              onChange={setDate}
              value={date}
              locale="id-ID"
              formatShortWeekday={(locale, date) =>
                format(date, "EEEEE", { locale: id }).toUpperCase()
              }
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
