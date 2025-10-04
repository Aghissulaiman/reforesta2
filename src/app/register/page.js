'use client';

import React, { useState } from 'react';

// --- Komponen Utama ---

export default function Register() {
  // State untuk mengelola pilihan jenis akun: 'Komunitas' atau 'Sekolah'
  const [accountType, setAccountType] = useState('Komunitas');
  // State untuk mengelola pilihan jenis kelamin (hanya digunakan untuk styling di form Komunitas)
  const [gender, setGender] = useState('Laki-Laki');
  // State untuk mengelola pilihan peran pengguna: 'Donatur' atau 'Penanam'
  const [userRole, setUserRole] = useState('Donatur');

  // Fungsi untuk mendapatkan kelas styling tombol berdasarkan status aktif/selected
  const getButtonClass = (type, currentType, base = 'bg-green-600') => {
    // Menambahkan kembali kelas fokus dan dark mode dari kode awal untuk konsistensi
    return currentType === type
      ? `${base} text-white shadow-md font-semibold focus:ring-green-300 focus:ring focus:ring-opacity-50`
      : 'text-green-600 border border-green-600 bg-white hover:bg-green-50 font-medium dark:text-gray-400 dark:border-gray-500 hover:dark:bg-gray-800';
  };

  // Styling untuk latar belakang hijau di luar form
  const backgroundStyle = {
    background: 'linear-gradient(135deg, #4CAF50, #039B09)',
  };

  // Styling untuk panel kiri (gambar pohon) - MENGGUNAKAN URL LOKAL
  const imagePanelStyle = {
    // Menggunakan URL gambar lokal yang Anda referensikan
    backgroundImage: "url('/gambar-pohon.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic pendaftaran akan ditambahkan di sini
    console.log('Data Formulir Terkirim', { accountType, gender, userRole });
    // Anda bisa menambahkan logika Firebase Firestore di sini
  }


  // Komponen Input NUPTK/Jenis Kelamin
  const SecondaryInput = () => {
    if (accountType === 'Sekolah') {
      return (
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
            NUPTK
          </label>
          <input
            type="text"
            placeholder="Masukkan NUPTK"
            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
            required
          />
        </div>
      );
    }
    
    // Jika Komunitas, tampilkan Jenis Kelamin
    return (
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-700">
          Jenis Kelamin
        </label>
        <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setGender('Laki-Laki')}
              className={`w-1/2 px-4 py-2.5 text-sm rounded-lg transition-all dark:hover:bg-[#1CA221] ${getButtonClass('Laki-Laki', gender)}`}
          >
              Laki-Laki
          </button>
          <button
              type="button"
              onClick={() => setGender('Perempuan')}
              className={`w-1/2 px-4 py-2.5 text-sm rounded-lg transition-all ${getButtonClass('Perempuan', gender)}`}
          >
              Perempuan
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="flex justify-center items-center min-h-screen py-10 px-4 sm:px-8 font-sans -mt-8" style={backgroundStyle}>
      {/* Container utama (max-w-6xl sesuai input terbaru Anda) */}
      <section className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl overflow-hidden w-full max-w-6xl"> 
        <div className="flex flex-col lg:flex-row">

          {/* Sisi Kiri: Gambar dan Branding - SEMUA DI TENGAHKAN */}
          <div
            // Mengubah justify-between menjadi justify-center dan menambahkan items-center
            className="hidden lg:flex flex-col justify-center items-center p-8 lg:w-2/5 text-white text-center" 
            style={imagePanelStyle}
          >
            {/* Konten dikelompokkan dalam satu div tengah */}
            <div className='flex flex-col items-center mb-2'>
                {/* Logo Sidebar */}
                {/* Menggunakan URL lokal dan menghapus ml-26 */}
                <img src="/logo.png" alt="Logo" className="w-40 h-40 object-contain" />
            </div>

            {/* Bagian Teks dan Tombol - Menghapus -mt-20 dan mt-auto */}
            <div className='text-center'>
                <h1 className="text-2xl font-bold mt-3">
                    Buat Akun Anda Sekarang
                </h1>
                <p className="mt-1 text-sm font-light text-gray-200">
                    Mari bantu kami menjadikan bumi hijau kembali.
                </p>

                <div className="mt-8"> 
                    <h2 className="text-sm font-medium">Sudah Punya <span className='font-bold'>Akun</span> ?</h2>
                    <button className="inline-block mt-3 w-50 h-10 px-6 py-2 bg-white text-[#4CAF50] font-medium transition-colors duration-300 transform border rounded-lg dark:border-[#4CAF50] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1CA221]">
                        Masuk
                    </button>
                </div>
            </div>
          </div>

          {/* Sisi Kanan: Formulir Registrasi */}
          <div className="flex items-center bg-white justify-center w-full py-8 px-6 lg:px-8 lg:w-3/5"> 
            <div className="w-full">
                
                {/* Logo Gambar (sudah disederhanakan) */}
                <img src="/logo.png" alt="Logo" className="w-30 h-30 object-contain -mt-5 ml-63" />
                
                {/* Mengganti teks header dengan spasi vertikal/jarak */}
             


                {/* Pemilihan Jenis Akun (Komunitas/Sekolah) */}
                <div className="mt-0 mb-4"> {/* Margin diatur untuk ringkas */}
                    <h1 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"> 
                        Pilih Jenis Akun
                    </h1>
                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={() => setAccountType('Komunitas')}
                            className={`px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass('Komunitas', accountType, 'bg-green-600')}`}
                        >
                            Komunitas
                        </button>
                        <button
                            type="button"
                            onClick={() => setAccountType('Sekolah')}
                            className={`px-4 py-2 text-sm rounded-lg transition-all ${getButtonClass('Sekolah', accountType, 'bg-green-600')}`}
                        >
                            Sekolah
                        </button>
                    </div>
                </div>

                {/* Grid Formulir Utama (2 Kolom) */}
                <form className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2" onSubmit={handleSubmit}> {/* Gap ditingkatkan ke 4 untuk visual yang lebih jelas */}
                    
                    {/* Nama PIC / Nama */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-800">
                            {accountType === 'Komunitas' ? 'Nama PIC' : 'Nama'}
                        </label>
                        <input
                            type="text"
                            placeholder={`Masukkan ${accountType === 'Komunitas' ? 'Nama PIC' : 'Nama'}`}
                            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Nama Komunitas / Nama Sekolah */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-700">
                            {accountType === 'Komunitas' ? 'Nama Komunitas' : 'Nama Sekolah'}
                        </label>
                        <input
                            type="text"
                            placeholder={`Masukkan ${accountType === 'Komunitas' ? 'Nama Komunitas' : 'Nama Sekolah'}`}
                            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Masukkan Email"
                            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Masukkan Password"
                            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
                            required
                        />
                    </div>

                    {/* No.Telp */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-700">
                            No.Telp
                        </label>
                        <input
                            type="tel"
                            placeholder="Masukkan No.Telp"
                            className="block w-full px-4 py-2 text-black placeholder-gray-400 border border-[#4CAF50] rounded-lg focus:border-[#4CAF50] focus:ring-0 focus:outline-none hover:border-2 transition-all duration-200"
                            required
                        />
                    </div>
                    
                    {/* Bidang Kondisional (Jenis Kelamin / NUPTK) */}
                    <SecondaryInput />
                    
                    {/* Jenis Akun (Hanya muncul jika Komunitas) */}
                    {accountType === 'Komunitas' && (
                        <div className="md:col-span-2 mt-4"> 
                            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-700">
                                Jenis Akun
                            </label>
                            <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                                <button
                                    type="button"
                                    onClick={() => setUserRole('Donatur')}
                                    className={`w-full sm:w-1/2 px-4 py-2 text-sm transition-all rounded-lg ${getButtonClass('Donatur', userRole)}`}
                                >
                                    Donatur
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUserRole('Penanam')}
                                    className={`w-full sm:w-1/2 px-4 py-2 text-sm transition-all rounded-lg ${getButtonClass('Penanam', userRole)}`}
                                >
                                    Penanam
                                </button>
                            </div>
                        </div>
                    )}


                    {/* Tombol Daftar */}
                    <div className='md:col-span-2 mt-6'> 
                        <button
                            type="submit"
                            className="flex items-center justify-center w-full px-6 py-3 text-lg font-semibold text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-xl hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
                        >
                            Daftar
                        </button>
                    </div>

                </form>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
