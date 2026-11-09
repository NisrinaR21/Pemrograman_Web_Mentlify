import { useState } from 'react';
import SessionCardList from '../components/Page04-JadwalSesi/SessionCardList.jsx';
import KetersediaanJadwal from '../components/Page04-JadwalSesi/KetersediaanJadwal.jsx';
import RuangInteraksi from '../components/Page04-JadwalSesi/RuangInteraksi.jsx';
import AjuBandingPage from '../components/Page04-JadwalSesi/AjuBandingPage.jsx';
import ModalJadwal from '../components/Page04-JadwalSesi/ModalJadwal.jsx';

export default function JadwalSesiPage({ userRole = 'mentee', hasSchedule = 'terjadwal' }) {
    const [activeView, setActiveView] = useState('daftar-jadwal');
    const [ruangInteraksiView, setRuangInteraksiView] = useState('ruang-tunggu'); // 'ruang-tunggu' | 'obrolan'
    const [modalAktif, setModalAktif] = useState(null); // 'batalkan' | 'konfirmasi' | null

    const bukaModal = (jenis) => {
        if (jenis === 'banding') {
            setActiveView('aju-banding');
            return;
        }
        setModalAktif(jenis);
    };
    const tutupModal = () => setModalAktif(null);

    const handleNavigateRuangInteraksi = (targetView) => {
        setRuangInteraksiView(targetView);
        setActiveView('ruang-interaksi');
    };

    return (
        <div className="min-h-screen bg-lightBg flex flex-col relative font-sans">
            {/* AREA RENDER KOMPONEN UTAMA */}
            <div className="flex-1 w-full">
                {activeView === 'daftar-jadwal' && (
                    <SessionCardList
                        role={userRole}
                        hasSchedule={hasSchedule}
                        onOpenModal={bukaModal}
                        onOpenKetersediaan={() => setActiveView('ketersediaan')}
                        onNavigateRuangInteraksi={handleNavigateRuangInteraksi}
                    />
                )}
                {activeView === 'ketersediaan' && (
                    <KetersediaanJadwal onBack={() => setActiveView('daftar-jadwal')} />
                )}
                {activeView === 'ruang-interaksi' && (
                    <RuangInteraksi
                        onOpenModal={bukaModal}
                        onOpenAjuBanding={() => setActiveView('aju-banding')}
                        initialView={ruangInteraksiView}
                        onBackToJadwal={() => setActiveView('daftar-jadwal')}
                    />
                )}
                {activeView === 'aju-banding' && (
                    <AjuBandingPage
                        onBack={() => setActiveView('ruang-interaksi')}
                        onBackToJadwal={() => setActiveView('daftar-jadwal')}
                    />
                )}
            </div>

            {/* OVERLAY MODAL JADWAL (Batalkan / Konfirmasi) */}
            {modalAktif && (
                <ModalJadwal modalAktif={modalAktif} onClose={tutupModal} />
            )}
        </div>
    );
}
