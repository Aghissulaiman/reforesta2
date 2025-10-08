"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Cek apakah user ada di tabel Komunitas
        let { data: komunitas } = await supabase
          .from("Komunitas")
          .select("*")
          .eq("id", user.id)
          .single();

        if (komunitas) {
          setUserData(komunitas);
          setAccountType("Komunitas");
          setLoading(false);
          return;
        }

        // Kalau tidak ada di Komunitas, cek tabel Sekolah
        let { data: sekolah } = await supabase
          .from("Sekolah")
          .select("*")
          .eq("no", user.id)
          .single();

        if (sekolah) {
          setUserData(sekolah);
          setAccountType("Sekolah");
        }

      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Memuat data...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Data profil tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-6 border border-gray-200">
        {/* Foto Profil */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {accountType === "Komunitas" ? userData.nama_komunitas : userData.nama}
            </h2>
            <p className="text-gray-500 text-sm">{userData.email || userData.email_komunitas}</p>
            <p className="text-xs text-gray-400 mt-1">{accountType}</p>
          </div>
        </div>

        {/* Data Profil */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {accountType === "Komunitas" ? (
            <>
              <div>
                <p className="text-gray-500">PIC</p>
                <p className="font-medium">{userData.pic}</p>
              </div>
              <div>
                <p className="text-gray-500">Jenis Akun</p>
                <p className="font-medium">{userData.jenis_akun}</p>
              </div>
              <div>
                <p className="text-gray-500">Jenis Kelamin</p>
                <p className="font-medium">{userData.jenis_kelamin}</p>
              </div>
              <div>
                <p className="text-gray-500">No Telepon</p>
                <p className="font-medium">{userData.no_telepon_komunitas}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Instansi</p>
                <p className="font-medium">{userData.instansi}</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-gray-500">Nama Sekolah</p>
                <p className="font-medium">{userData.nama_sekolah}</p>
              </div>
              <div>
                <p className="text-gray-500">NUPTK</p>
                <p className="font-medium">{userData.nuptk}</p>
              </div>
              <div>
                <p className="text-gray-500">No Telepon</p>
                <p className="font-medium">{userData.no_telepon}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
            </>
          )}
        </div>

        {/* Tombol Logout */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
