import { useState } from 'react';
import SessionCardList from '../components/Page04-JadwalSesi/SessionCardList.jsx';
import KetersediaanJadwal from '../components/Page04-JadwalSesi/KetersediaanJadwal.jsx';
import RuangInteraksi from '../components/Page04-JadwalSesi/RuangInteraksi.jsx';
import ModalJadwal from '../components/Page04-JadwalSesi/ModalJadwal.jsx';

export default function JadwalSesiPage() {
    const [activeView, setActiveView] = useState('daftar-jadwal');
    const [ruangInteraksiView, setRuangInteraksiView] = useState('ruang-tunggu'); // 'ruang-tunggu' | 'obrolan'
    const [modalAktif, setModalAktif] = useState(null); // 'batalkan' | 'konfirmasi' | 'banding' | null

    const bukaModal = (jenis) => setModalAktif(jenis);
    const tutupModal = () => setModalAktif(null);

    const handleNavigateRuangInteraksi = (targetView) => {
        setRuangInteraksiView(targetView);
        setActiveView('ruang-interaksi');
    };

    return (
        <div className="min-h-screen bg-lightBg flex flex-col relative font-sans">

            {/* 👑 MASTER DEMO SUB-NAVBAR - Tepat di bawah Navbar utama */}
            <div className="bg-white/95 backdrop-blur border-b border-accent/60 py-2.5 px-4 sm:px-8 sticky top-0 z-40 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold text-primary flex items-center gap-1.5 mr-1">
                        <span className="text-sm">👑</span> MASTER DEMO:
                    </span>
                    <button
                        type="button"
                        onClick={() => setActiveView('daftar-jadwal')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${activeView === 'daftar-jadwal'
                            ? 'bg-secondary text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:text-secondary hover:bg-slate-200'
                            }`}
                    >
                        1. Daftar Jadwal
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveView('ketersediaan')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${activeView === 'ketersediaan'
                            ? 'bg-secondary text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:text-secondary hover:bg-slate-200'
                            }`}
                    >
                        2. Ketersediaan (Mentor)
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveView('ruang-interaksi')}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${activeView === 'ruang-interaksi'
                            ? 'bg-secondary text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:text-secondary hover:bg-slate-200'
                            }`}
                    >
                        3. Ruang Interaksi
                    </button>
                </div>

                {/* Pintasan Cepat Modal untuk Presentasi */}
                <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
                        Pop-up:
                    </span>
                    <button
                        type="button"
                        onClick={() => bukaModal('batalkan')}
                        className="rounded-full border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 px-2.5 py-1 text-[11px] font-semibold transition-all"
                    >
                        Batalkan
                    </button>
                    <button
                        type="button"
                        onClick={() => bukaModal('konfirmasi')}
                        className="rounded-full border border-secondary/40 bg-secondary/10 text-secondary hover:bg-secondary/20 px-2.5 py-1 text-[11px] font-semibold transition-all"
                    >
                        Konfirmasi
                    </button>
                    <button
                        type="button"
                        onClick={() => bukaModal('banding')}
                        className="rounded-full border border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100 px-2.5 py-1 text-[11px] font-semibold transition-all"
                    >
                        Banding
                    </button>
                </div>
            </div>

            {/* AREA RENDER KOMPONEN UTAMA */}
            <div className="flex-1 w-full">
                {activeView === 'daftar-jadwal' && (
                    <SessionCardList
                        onOpenModal={bukaModal}
                        onNavigateRuangInteraksi={handleNavigateRuangInteraksi}
                    />
                )}
                {activeView === 'ketersediaan' && <KetersediaanJadwal />}
                {activeView === 'ruang-interaksi' && (
                    <RuangInteraksi
                        onOpenModal={bukaModal}
                        initialView={ruangInteraksiView}
                        onBackToJadwal={() => setActiveView('daftar-jadwal')}
                    />
                )}
            </div>

            {/* OVERLAY MODAL JADWAL */}
            {modalAktif && (
                <ModalJadwal modalAktif={modalAktif} onClose={tutupModal} />
            )}

        </div>
    );
}
