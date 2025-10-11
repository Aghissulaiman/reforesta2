"use client";

import { useState } from "react";

export default function FormAcara() {
  const [form, setForm] = useState({
    title: "",
    status: "Sedang Berlangsung",
    time: "",
    desc: "",
    location: "",
    image: null,
    tanggal: new Date().toISOString().substr(0, 10),
  });
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, image: null }));
      setPreview("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: form.title,
      status: form.status,
      time: form.time,
      desc: form.desc,
      location: form.location,
      tanggal: form.tanggal,
      image: preview,
      active: form.status === "Sedang Berlangsung",
    };

    // Simpan ke localStorage
    const existing = JSON.parse(localStorage.getItem("events")) || [];
    existing.push(newEvent);
    localStorage.setItem("events", JSON.stringify(existing));

    alert("✅ Acara berhasil ditambahkan!");

    // Reset form
    setForm({
      title: "",
      status: "Sedang Berlangsung",
      time: "",
      desc: "",
      location: "",
      tanggal: new Date().toISOString().substr(0, 10),
      image: null,
    });
    setPreview("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#064E3B] text-center mb-8">
          Buat Acara Penanaman Baru
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-2xl border border-gray-200 space-y-7"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Judul Acara
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Bersih-bersih Hutan Kota"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status Acara
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              >
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Acara
              </label>
              <input
                id="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                placeholder="Ex: 08:00 - 12:00 WIB"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi Acara
              </label>
              <input
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ex: Taman Nasional Gunung Gede Pangrango"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Acara
              </label>
              <input
                id="tanggal"
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Acara
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer border border-gray-300 rounded-lg p-2"
              />
              {preview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau Gambar:</p>
                  <img
                    src={preview}
                    alt="Preview Acara"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Acara
            </label>
            <textarea
              id="desc"
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Ceritakan detail acara ini, tujuan, dan apa yang akan dilakukan..."
              className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              rows={5}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full md:w-auto bg-[#059669] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition transform hover:scale-[1.01] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Tambah Acara Baru
          </button>
        </form>
      </div>
    </div>
  );
}
