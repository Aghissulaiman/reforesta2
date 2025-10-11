"use client";

import { useState } from "react";

export default function FormAcara() {
  const [form, setForm] = useState({
    title: "",
    status: "Sedang Berlangsung",
    time: "",
    desc: "",
    location: "",
    tanggal: new Date().toISOString().substr(0, 10),
    image: null,
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

    // Simpan hanya data penting (tanpa base64 image)
    const newEvent = {
      title: form.title,
      status: form.status,
      time: form.time,
      desc: form.desc,
      location: form.location,
      tanggal: form.tanggal,
      imageName: form.image ? form.image.name : null,
      active: form.status === "Sedang Berlangsung",
    };

    try {
      const existing = JSON.parse(localStorage.getItem("events")) || [];
      existing.push(newEvent);
      localStorage.setItem("events", JSON.stringify(existing));

      alert("✅ Acara berhasil ditambahkan!");
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
    } catch (err) {
      console.error("Gagal menyimpan data:", err);
      alert("❌ Gagal menyimpan data, kemungkinan localStorage penuh!");
    }
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
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul Acara
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex: Bersih-bersih Hutan Kota"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Acara
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
              >
                <option value="Sedang Berlangsung">Sedang Berlangsung</option>
                <option value="Akan Datang">Akan Datang</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>

            {/* Waktu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Waktu Acara
              </label>
              <input
                name="time"
                value={form.time}
                onChange={handleChange}
                placeholder="08:00 - 12:00 WIB"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lokasi Acara
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ex: Taman Nasional Gunung Gede"
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Tanggal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal Acara
              </label>
              <input
                type="date"
                name="tanggal"
                value={form.tanggal}
                onChange={handleChange}
                className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
                required
              />
            </div>

            {/* Gambar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Acara
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm"
              />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi Acara
            </label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              rows={5}
              placeholder="Ceritakan detail acara ini..."
              className="w-full border-gray-300 border rounded-lg px-4 py-2.5 text-gray-800"
              required
            />
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="w-full md:w-auto bg-[#059669] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition"
          >
            Tambah Acara Baru
          </button>
        </form>
      </div>
    </div>
  );
}
