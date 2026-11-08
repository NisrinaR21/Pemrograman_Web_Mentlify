// src/pages/ProfilePage.jsx
import React, { useState } from 'react';
import ProfilData from '../components/page06-profil/ProfilData.jsx';
import PengaturanPage from '../components/page06-profil/PengaturanPage.jsx';

export default function ProfilePage({ userRole = 'mentee', setUserRole, onKeluar }) {
    // State untuk mengatur halaman mana yang sedang aktif: 'profil' atau 'pengaturan'
    const [halamanAktif, setHalamanAktif] = useState('profil');

    return (
        <div className="min-h-screen bg-lightBg">
            {/* Kondisi: Jika halamanAktif 'profil', tampilkan ProfilData. 
                Tambahkan props onBukaPengaturan agar tombol di kartu bawah bisa memicu perpindahan. */}
            {halamanAktif === 'profil' ? (
                <ProfilData
                    userRole={userRole}
                    onGantiRole={setUserRole}
                    onBukaPengaturan={() => setHalamanAktif('pengaturan')}
                />
            ) : (
                /* Jika 'pengaturan', tampilkan PengaturanPage.
                   Berikan props onKembali agar tombol kembali berfungsi. */
                <PengaturanPage
                    onKembali={() => setHalamanAktif('profil')}
                    onKeluar={onKeluar}
                />
            )}
        </div>
    );
}