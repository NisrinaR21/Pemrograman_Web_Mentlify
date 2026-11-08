import React, { useState } from 'react';
import BannerAtas from '../components/page02-dasbor/BannerAtas.jsx';
import JadwalHariIni from '../components/page02-dasbor/JadwalHariIni.jsx';
import MisiDanKuis from '../components/page02-dasbor/MisiDanKuis.jsx';

function DashboardPage({ userRole = 'mentee', showSimulation = true }) {

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

                    {/* Sisi Kiri: Jadwal & Statistik (Lebar ~68%) */}
                    <div className="lg:col-span-8">
                        <JadwalHariIni userRole={userRole} showSimulation={showSimulation} />
                    </div>

                    {/* Sisi Kanan: Misi & Kuis (Lebar ~32%) */}
                    <div className="lg:col-span-4">
                        <MisiDanKuis userRole={userRole} showSimulation={showSimulation} />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default DashboardPage;