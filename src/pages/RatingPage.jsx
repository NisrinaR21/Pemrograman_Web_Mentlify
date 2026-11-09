import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RatingMentee from '../components/page05-Rating/RatingMentee.jsx';
import RatingMentor from '../components/page05-Rating/RatingMentor.jsx';

export default function RatingPage({ userRole = 'mentee', hasSchedule = 'terjadwal' }) {
    const navigate = useNavigate();
    const role = userRole === 'mentor' ? 'mentor' : 'mentee';
    // Otomatis sinkron dengan simulasi jadwal di navbar atas: jika jadwal kosong maka rating belum ada, jika ada jadwal maka rating ada
    const simState = hasSchedule === 'kosong' ? 'belum' : 'ada';

    return (
        <div className="min-h-[calc(100vh-72px)] bg-lightBg flex flex-col font-sans">
            <div className="px-4 sm:px-8 py-8 w-full max-w-6xl mx-auto">
                {/* Tombol Kembali di kiri (selaras semua page) */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(role === 'mentor' ? '/mentor/dasbor' : '/mentee/dasbor')}
                        className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-white px-4 py-2 text-xs font-bold text-secondary shadow-sm transition-all hover:bg-secondary/10"
                    >
                        <ArrowLeft size={14} />
                        Kembali ke Dasbor
                    </button>
                    <p className="text-xs text-slate-500">
                        {role === 'mentee'
                            ? 'Evaluasi kualitas sesi bimbingan yang telah selesai'
                            : 'Ringkasan reputasi dan ulasan sesi bimbingan'}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-bold text-secondary tracking-widest uppercase">
                        Reputasi &amp; Ulasan
                    </p>
                    <h1 className="mt-2 text-3xl sm:text-4xl font-normal text-primary">
                        {role === 'mentee' ? 'Rating & Ulasan Sesi' : 'Penilaian Rating Mentor'}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 mb-8">
                        {role === 'mentee'
                            ? 'Umpan balik terverifikasi untuk menjaga mutu ekosistem bimbingan Mentlify.'
                            : 'Pantau penilaian terverifikasi dan ulasan terbaru dari sesi yang telah selesai.'}
                    </p>
                </div>

                {/* AREA RENDER KOMPONEN UTAMA */}
                {role === 'mentee' ? (
                    <RatingMentee simState={simState} />
                ) : (
                    <RatingMentor simState={simState} />
                )}
            </div>
        </div>
    );
}
