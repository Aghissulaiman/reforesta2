"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { id } from "date-fns/locale";
import { format } from "date-fns";

export default function AcaraSection() {
  const [tab, setTab] = useState("berlangsung");
  const [date, setDate] = useState(new Date());

  const acaraList = [
    { id: 1, nama: "Acara Hijau Hutan Bogor", status: "berlangsung", waktu: "07.00–10.00 WIB" },
    { id: 2, nama: "Acara Hijau Bandung", status: "berlangsung", waktu: "07.00–10.00 WIB" },
    { id: 3, nama: "Acara Hijau Jakarta", status: "akan", waktu: "08.00–11.00 WIB" },
    { id: 4, nama: "Acara Hijau Depok", status: "akan", waktu: "09.00–12.00 WIB" },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-8">
      {/* Kiri: Daftar acara */}
      <div className="flex-1">
        {/* Tombol tab */}
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
                ? "bg-[#059669] text-white border-[#059669]"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            Akan Datang
          </button>
        </div>

        {/* Grid acara */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {acaraList
            .filter((a) => (tab === "berlangsung" ? a.status === "berlangsung" : a.status === "akan"))
            .map((a) => (
              <div
                key={a.id}
                className={`flex justify-between items-center rounded-xl px-4 py-3 shadow-sm ${
                  a.status === "berlangsung"
                    ? "bg-[#059669]/90 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <div>
                  <p className="font-semibold text-sm">{a.nama}</p>
                  <p className="text-xs opacity-90">
                    {a.status === "berlangsung" ? "Sedang Berlangsung" : "Akan Datang"}
                  </p>
                </div>
                <div
                  className={`rounded-lg px-3 py-1 text-[10px] font-semibold ${
                    a.status === "berlangsung" ? "bg-white text-[#059669]" : "bg-[#059669] text-white"
                  }`}
                >
                  {a.waktu}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Kanan: Kalender */}
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
              tileClassName={({ date, view }) =>
                view === "month" && date.toDateString() === new Date().toDateString()
                  ? "bg-[#059669] text-white rounded-full"
                  : ""
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
