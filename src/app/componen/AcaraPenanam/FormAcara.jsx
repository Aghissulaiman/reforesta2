"use client";

<<<<<<< HEAD
import { useState } from "react";

export default function FormAcara() {
=======
import { useState, useEffect } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function FormAcara() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
  const [form, setForm] = useState({
    title: "",
    status: "Sedang Berlangsung",
    time: "",
    desc: "",
    location: "",
    image: null,
<<<<<<< HEAD
    tanggal: new Date().toISOString().substr(0, 10),
=======
    tanggal: new Date().toISOString().slice(0, 10),
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
  });

  // 🧩 Ambil user yang login
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) console.error(error);
      if (data?.user) setUser(data.user);
    };
    fetchUser();
  }, []);

  // 📝 Handle input text dan select
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🖼️ Handle upload gambar
  const handleImageChange = (e) => {
    const file = e.target.files[0];
<<<<<<< HEAD
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setForm((prev) => ({ ...prev, image: null }));
=======
    if (!file) return;
    setForm((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  // 💾 Submit acara
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("❌ Anda harus login terlebih dahulu!");

    setLoading(true);

    try {
      let imageUrl = null;

      // 🔹 Upload gambar ke storage (kalau ada)
      if (form.image) {
        const fileExt = form.image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `acara/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("gambar_acara")
          .upload(filePath, form.image);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("gambar_acara")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // 🔹 Simpan ke database
      const { error: insertError } = await supabase
        .from("acara_penanaman")
        .insert([
          {
            id_user: user.id,
            judul_acara: form.title,
            lokasi: form.location,
            tanggal: form.tanggal,
            waktu: form.time,
            deskripsi: form.desc,
            status: form.status,
            gambar: imageUrl,
          },
        ]);

      if (insertError) throw insertError;

      alert("✅ Acara berhasil ditambahkan!");
      setForm({
        title: "",
        status: "Sedang Berlangsung",
        time: "",
        desc: "",
        location: "",
        image: null,
        tanggal: new Date().toISOString().slice(0, 10),
      });
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
      setPreview("");
    } catch (err) {
      console.error(err);
      alert("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
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

=======
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-start p-6 md:p-10">
      <div className="w-full max-w-5xl">
        <h2 className="text-4xl font-extrabold text-[#064E3B] text-center mb-10">
          Buat Acara Penanaman Baru
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 shadow-md p-8 rounded-2xl border border-gray-200 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<<<<<<< HEAD
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
=======
            <Input
              label="Judul Acara"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Ex: Bersih-bersih Hutan Kota"
              required
            />

            <Select
              label="Status Acara"
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={[
                "Sedang Berlangsung",
                "Akan Datang",
                "Selesai",
              ]}
            />

            <Input
              label="Waktu Acara"
              id="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              placeholder="Ex: 08:00 - 12:00 WIB"
              required
            />

            <Input
              label="Lokasi Acara"
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Ex: Taman Nasional Gunung Gede Pangrango"
              required
            />

            <Input
              label="Tanggal Acara"
              id="tanggal"
              type="date"
              name="tanggal"
              value={form.tanggal}
              onChange={handleChange}
              required
            />

            {/* Upload Gambar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
                Gambar Acara
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer border border-gray-300 rounded-lg p-2"
              />
              {preview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Pratinjau Gambar:
                  </p>
                  <img
                    src={preview}
                    alt="Preview Acara"
                    className="w-full h-56 object-cover rounded-lg border border-gray-200"
                  />
                </div>
              )}
            </div>
          </div>

<<<<<<< HEAD
          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-2">
=======
          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
              Deskripsi Acara
            </label>
            <textarea
              name="desc"
              value={form.desc}
              onChange={handleChange}
              placeholder="Ceritakan detail acara ini..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={6}
              required
            />
          </div>

<<<<<<< HEAD
          <button
            type="submit"
            className="w-full md:w-auto bg-[#059669] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition transform hover:scale-[1.01] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Tambah Acara Baru
          </button>
=======
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#059669] hover:bg-green-700 text-white font-semibold px-10 py-3 rounded-lg transition transform hover:scale-[1.02] shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Menyimpan..." : "Tambah Acara Baru"}
            </button>
          </div>
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
        </form>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

/* 🔧 Komponen kecil agar kode utama bersih */
function Input({ label, ...props }) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>
  );
}

function Select({ label, id, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
>>>>>>> b7725368b8e572bf89c13ae2e847e26999b330f1
