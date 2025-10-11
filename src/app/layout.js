  import "./globals.css";
  import { Geist, Geist_Mono } from "next/font/google";
  import Script from "next/script";
  import { SupabaseProvider } from "../../lib/supabaseProvider";
  import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

  export const supabase = createClientComponentClient();

  // 🔹 Font setup
  const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
  });

  const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

  // 🔹 Metadata wajib di top-level
  export const metadata = {
    title: "TOKOV | Tanam Pohon",
    description: "E-commerce penghijauan dengan sistem penanaman pohon langsung.",
  };

  // 🔹 Layout utama
  export default function RootLayout({ children }) {
    return (
      <html lang="id">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
          {/* 🪙 Midtrans Script - setelah interactive biar ga ganggu render */}
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
