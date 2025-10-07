"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("❌ Gagal memperbarui password: " + error.message);
      setLoading(false);
    } else {
      setMessage("✅ Password berhasil diubah! Silakan login kembali...");

      await supabase.auth.signOut();

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-[#4CAF50] mb-4">
          Atur Ulang Password
        </h2>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="Masukkan password baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#4CAF50] rounded-lg focus:ring-0 focus:border-[#4CAF50] outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#4CAF50] text-white py-2 rounded-lg transition-all duration-300 ${
              loading
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-[#69cd6d]"
            }`}
          >
            {loading ? "Menyimpan..." : "Simpan Password Baru"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
