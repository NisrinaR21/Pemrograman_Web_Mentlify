import React from 'react';
// Pastikan lokasi import ini sesuai dengan letak file Navbar.jsx-mu
import Navbar from './components/layouts/Navbar.jsx';

function App() {
  return (
    <div className="min-h-screen bg-lightBg font-sans">
      {/* Memanggil dan menampilkan komponen Navbar di bagian paling atas */}
      <Navbar />

      {/* Area kosong di bawah Navbar tempat halaman Mentlify-mu nanti dirakit */}
      <main className="p-8">
        <h1 className="text-2xl font-bold text-darkNavy text-center mt-10">
          Selamat! Navbar Mentlify Berhasil Terpasang! 🚀
        </h1>
        <p className="text-center text-primary mt-2">
          Sekarang coba klik tombol tab dan ganti role di pojok kiri atas.
        </p>
      </main>
    </div>
  )
}

export default App; 