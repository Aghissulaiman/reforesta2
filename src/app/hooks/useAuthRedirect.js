"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function useAuthRedirect() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    // Jika belum login dan bukan di halaman login → arahkan
    if (!user && pathname !== "/login") {
      router.push("/login");
    }
  }, [router, pathname]);
}
