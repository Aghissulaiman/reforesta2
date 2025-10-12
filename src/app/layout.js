import "./globals.css";
import { Poppins } from "next/font/google";
import Script from "next/script";
import { SupabaseProvider } from "../../lib/supabaseProvider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useAuthRedirect from "../../hooks/useAuthRedirect";

export const supabase = createClientComponentClient();

// 🔹 Font setup (ganti Geist → Poppins)
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // bobot lengkap biar fleksibel
  variable: "--font-poppins",
});

// 🔹 Metadata wajib di top-level
export const metadata = {
  title: "Reforestacia | Tanam Pohon",
  description:
    "E-commerce penghijauan dengan sistem penanaman pohon langsung.",
};

// 🔹 Layout utama
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} font-sans antialiased overflow-x-hidden`}
      >
        {/* 🪙 Midtrans Script */}
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
          strategy="afterInteractive"
        />

        {/* 🟢 Supabase Auth Provider */}
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
