import React, { useState } from 'react';
import BannerAtas from '../components/page02-dasbor/BannerAtas.jsx';
import JadwalHariIni from '../components/page02-dasbor/JadwalHariIni.jsx';
import MisiDanKuis from '../components/page02-dasbor/MisiDanKuis.jsx';

function DashboardPage({ userRole = 'mentee', showSimulation = true, hasSchedule = 'terjadwal' }) {

    return (
        <div className="min-h-screen bg-lightBg pb-12">
            {/* Container utama dengan batas max-width yang rapi */}
            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">

                {/* Banner Atas (Lebar Penuh) */}
                <section className="mb-6">
                    <BannerAtas userRole={userRole} showSimulation={showSimulation} />
                </section>

                {/* Layout Grid Bawah (Kiri & Kanan) */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

                    {/* Sisi Kiri / Full Lebar: Jadwal & Statistik */}
                    <div className={userRole === 'mentor' ? 'lg:col-span-12' : 'lg:col-span-8'}>
                        <JadwalHariIni
                            userRole={userRole}
                            showSimulation={showSimulation}
                            initialKondisi={hasSchedule}
                        />
                    </div>

                    {/* Sisi Kanan: Misi & Kuis (Hanya untuk Mentee) */}
                    {userRole === 'mentee' && (
                        <div id="misi-streak" className="lg:col-span-4">
                            <MisiDanKuis userRole={userRole} showSimulation={showSimulation} />
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}

export default DashboardPage;