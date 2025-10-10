import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

// ⚠️ Konfigurasi Path:
const LOGIN_PATH = '/user/login';
const REGISTER_PATH = '/user/register';
const SETUP_PROFILE_PATH = '/setup-profile'; // Asumsi kamu buat halaman ini
const HOME_PATH = '/user/home'; // ⬅️ Disesuaikan dengan folder user/home/page.js kamu

// Daftar halaman yang TIDAK memerlukan sesi (BISA DILIHAT PUBLIK)
const PUBLIC_PATHS = [
    '/', // ⬅️ Ini Landing Page kamu, harus dibebaskan
    LOGIN_PATH, 
    REGISTER_PATH, 
    '/api', 
    '/_next',
    '/favicon.ico',
];

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { user } } = await supabase.auth.getUser();
  const pathname = req.nextUrl.pathname;
  
  // Fungsi bantu untuk cek path publik
  const isPublicPath = PUBLIC_PATHS.some(path => path === pathname || pathname.startsWith(path + '/'));

  // --- LOGIKA UTAMA: AUTENTIKASI DAN CEK PROFIL ---

  // A. JIKA BELUM LOGIN (Unauthenticated)
  if (!user) {
    // Jika user mencoba mengakses halaman non-publik, paksa ke /login
    if (!isPublicPath) {
        if (pathname !== LOGIN_PATH) { 
           return NextResponse.redirect(new URL(LOGIN_PATH, req.url));
        }
    }
    // Jika user mengakses halaman publik (termasuk '/'), biarkan lanjut (res)
    return res;
  }

  // B. JIKA SUDAH LOGIN (Authenticated)
  
  // 1. Redirect jika sudah login TAPI mengakses /login, /register, atau '/'
  if (pathname === LOGIN_PATH || pathname === REGISTER_PATH || pathname === '/') {
    // Arahkan ke /user/home
    return NextResponse.redirect(new URL(HOME_PATH, req.url));
  }
  
  // 2. Cek Profil (Logika Onboarding, untuk memastikan tabel user sudah terisi)
  // Query tabel 'user' kamu
  const { data: profile } = await supabase
    .from('user') 
    .select('id') 
    .eq('id', user.id)
    .single();

  const hasProfile = !!profile; 
  
  // Jika TIDAK punya profil DAN TIDAK sedang di halaman setup
  if (!hasProfile && pathname !== SETUP_PROFILE_PATH) {
    return NextResponse.redirect(new URL(SETUP_PROFILE_PATH, req.url));
  }

  // Jika SUDAH punya profil DAN sedang berada di halaman setup
  if (hasProfile && pathname === SETUP_PROFILE_PATH) {
    return NextResponse.redirect(new URL(HOME_PATH, req.url));
  }

  // C. Lolos semua cek: Lanjutkan request
  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};