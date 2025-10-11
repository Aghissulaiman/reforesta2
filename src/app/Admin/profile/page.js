"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import NavbarAdmin from "@/app/componen/navbarAdmin/NavbarAdmin";

export default function ProfilePage() {
  const [adminData, setAdminData] = useState(null);
  const [aboutMe, setAboutMe] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // 🔹 Hanya ambil data dari tabel Admin
        const { data: admin, error } = await supabase
          .from("Admin")
          .select("*")
          .eq("id", user.id)
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Memuat data admin...</p>
      </div>
    );

  if (!adminData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Data admin tidak ditemukan.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-100/50">
      {/* 🔹 NavbarAdmin dipakai di sini */}
      <NavbarAdmin user={{ name: adminData.nama_admin }} />

      <main className="pt-32 px-6 flex justify-center pb-16">
        {/* konten profil seperti sebelumnya */}
      </main>
    </div>
  );
}
