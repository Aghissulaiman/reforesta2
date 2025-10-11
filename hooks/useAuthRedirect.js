"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(undefined); // undefined dulu biar bisa nunggu localStorage kebaca

  useEffect(() => {
    // Ambil data user dari localStorage
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    if (user === undefined) return; // ⏳ tunggu data user kebaca

    const isPublicPage =
      pathname === "/" ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/register") ||
      pathname.startsWith("/user/login") ||
      pathname.startsWith("/user/register") ||
      pathname.startsWith("/admin/login");

    const isUserPage = pathname.startsWith("/user");
    const isAdminPage = pathname.startsWith("/admin");

    // 🔹 1️⃣ Kalau belum login tapi nyoba ke halaman private (user/admin)
    if (!user && (isUserPage || isAdminPage)) {
      router.replace("/");
      return;
    }

    // 🔹 2️⃣ Kalau udah login sebagai ADMIN
    if (user?.role === "admin") {
      // Kalau nyasar ke halaman publik → redirect ke dashboard admin
      if (isPublicPage || isUserPage) {
        router.replace("/Admin/dashboard");
      }
      return;
    }

    // 🔹 3️⃣ Kalau udah login sebagai USER biasa
    if (user && user.role !== "admin") {
      // Kalau nyasar ke halaman publik atau admin → redirect ke home user
      if (isPublicPage || isAdminPage) {
        router.replace("/user/home");
      }
      return;
    }
  }, [user, pathname, router]);
}
