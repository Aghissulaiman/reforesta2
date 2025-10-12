#  REFORESTA

**REFORESTA** adalah aplikasi web interaktif yang mendukung kegiatan penghijauan melalui sistem penanaman pohon digital, donasi, dan pelaporan lingkungan.  
Dikembangkan oleh **Aghis Sulaiman**, proyek ini memadukan teknologi modern seperti **Next.js**, **Supabase**, **Midtrans**, **Framer Motion**, dan **Tailwind CSS** untuk menghasilkan antarmuka yang elegan, cepat, serta fungsional.

---

##  Tujuan Proyek

REFORESTA dibuat untuk:
- Meningkatkan kesadaran masyarakat terhadap pentingnya penghijauan.
- Mencatat kegiatan penanaman pohon oleh siswa, sekolah, dan komunitas.
- Menyediakan sistem donasi dan pelaporan lingkungan yang transparan.
- Menghubungkan relawan, donatur, dan pengelola acara dalam satu platform.

---

##  Teknologi yang Digunakan

###  Frontend
- **Next.js 14 (App Router)** – Struktur modular & optimisasi performa.
- **React.js** – Library utama untuk UI dan komponen dinamis.
- **Tailwind CSS** – Framework styling cepat, ringan, dan responsif.
- **Framer Motion** – Animasi interaktif dan transisi smooth.
- **Lucide React Icons** – Kumpulan ikon ringan dan modern.
- **Next/Image** – Optimisasi otomatis untuk gambar.
- **Next/Link** – Navigasi antar halaman tanpa reload.
- **React Hooks (useState, useEffect, useRef, usePathname, useRouter)** – Pengelolaan state dan efek UI.
**react-intersection-observer**
### 💾 Backend & Database
- **Supabase**
  - Auth: Sistem login/logout dan manajemen sesi pengguna.
  - Database: PostgreSQL untuk menyimpan data pohon, acara, pengguna, dan wilayah.
  - Storage: Untuk menyimpan foto acara atau bukti penanaman.
  - Realtime: Data otomatis ter-update tanpa refresh.

###  Pembayaran & Donasi
- **Midtrans**
  - Integrasi pembayaran donasi online.
  - Menggunakan **Midtrans Snap API** untuk transaksi aman dan cepat.
  - Mendukung metode pembayaran seperti e-wallet, QRIS, dan bank transfer.

###  Tools & Libraries Pendukung
- **Vercel** – Deployment cepat dan mudah.
- **Node.js & npm** – Dependency dan environment development.
- **ESLint & Prettier** – Standarisasi kode agar lebih rapi dan konsisten.
- **Custom Hooks (usePohon, useDaerah)** – Pengambilan data modular dan reusable.
- **Framer Motion Variants** – Untuk mengatur animasi berurutan.

---

##  Fitur Utama

###  Autentikasi & Pengguna
- Login/logout menggunakan Supabase Auth.
- Navbar menyesuaikan status login pengguna.
- Dropdown profil dengan animasi halus.

###  Kegiatan Penanaman
- Menampilkan daftar acara penanaman pohon.
- Informasi lengkap: waktu, lokasi, dan status acara.
- Tampilan kartu acara responsif dan tidak rusak meski teks panjang.

### Manajemen Pohon & Wilayah
- Daftar data pohon berdasarkan wilayah.
- Fitur denda bagi murid yang belum menanam.
- Validasi data langsung dari Supabase.

###  Donasi & Pembayaran
- Donasi digital melalui Midtrans (Snap Payment).
- Notifikasi pembayaran otomatis setelah transaksi sukses.
- Dashboard donatur untuk melihat riwayat kontribusi.

###  Navigasi Dinamis
- Navbar dinamis: menyesuaikan menu sesuai role.
- Transisi antar halaman yang lembut menggunakan Framer Motion.
- Responsif di semua perangkat (mobile, tablet, desktop).

---

## 📂 Struktur Direktori (Ringkasan)


npm install
# atau
yarn install


npm run dev
