"use client";

import { useState, useEffect } from "react";
import NavbarAdmin from "@/app/componen/navbarAdmin/navbarAdmin";

export default function PenggunaPage() {
  const [users, setUsers] = useState([
//make data boog dlu
    { id: 1, nama: "Andi Pratama", email: "andi@mail.com", role: "Sekolah" },
    { id: 2, nama: "Budi Santoso", email: "budi@mail.com", role: "Komunitas" },
    { id: 3, nama: "Siti Rahma", email: "siti@mail.com", role: "Admin" },
  ]);

  useEffect(() => {
    // buat ambill data dari supabase jep,kaya fetch
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      <NavbarAdmin user={{ name: "Admin" }} />


      <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-semibold text-green-700 mb-6">
          Daftar Pengguna
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead className="bg-green-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-green-50 transition"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.nama}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === "Admin"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button className="px-3 py-1 text-sm bg-green-700 text-white rounded-full hover:bg-green-800 transition">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-6 italic"
                  >
                    Tidak ada data pengguna.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
