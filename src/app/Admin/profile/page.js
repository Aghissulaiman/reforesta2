"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import NavbarAdmin from "@/app/componen/navbarAdmin/navbarAdmin";

export default function ProfilePage() {
  const [adminData, setAdminData] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
  try {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);

    const { data: admin, error } = await supabase
      .from("admin")
      .select("*")
      .eq("email", user.email) // bisa pakai id juga kalau cocok
      .single();

    if (!error && admin) setAdminData(admin);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

    fetchAdminProfile();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("aboutMe");
    if (saved) setAboutMe(saved);
  }, []);

  const handleSaveAboutMe = () => {
    localStorage.setItem("aboutMe", aboutMe);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // 🔹 Loading state
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Memuat data admin...</p>
      </div>
    );

  // 🔹 Kalau data admin gak ketemu
  if (!adminData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Data admin tidak ditemukan.</p>
      </div>
    );

  // 🔹 Tampilan utama
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100/50">
      <NavbarAdmin user={{ name: adminData.nama_admin }} />

      <main className="pt-28 px-6 flex justify-center pb-20">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">
            Profil Admin
          </h2>

          <div className="space-y-4">
            <p>
              <strong>Nama:</strong> {adminData.nama_admin}
            </p>
            <p>
              <strong>Email:</strong> {adminData.email}
            </p>
            <p>
              <strong>Dibuat:</strong>{" "}
              {new Date(adminData.created_at).toLocaleString("id-ID")}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-green-700">Tentang Saya:</h3>
            {isEditing ? (
              <div>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring focus:ring-green-300"
                  rows={3}
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
                <button
                  onClick={handleSaveAboutMe}
                  className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-700">
                  {aboutMe || "Belum ada deskripsi diri."}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-3 text-blue-600 underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}
