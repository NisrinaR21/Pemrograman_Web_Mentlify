import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import RatingMentee from '../components/page05-Rating/RatingMentee.jsx';
import RatingMentor from '../components/page05-Rating/RatingMentor.jsx';

export default function RatingPage({ userRole }) {
    const navigate = useNavigate();
    // State untuk menentukan apakah ingin melihat versi Mentee atau Mentor
    const [demoRole, setDemoRole] = useState(userRole || 'mentee');
    // State untuk menentukan apakah data rating kosong atau ada
    const [simState, setSimState] = useState('belum'); // 'belum' | 'ada'

    return (
        <div className="min-h-[calc(100vh-72px)] bg-lightBg flex flex-col font-sans">

            {/* 👑 MASTER DEMO SWITCHER */}
            <div className="bg-slate-50 border-b border-accent/40 py-3 px-6 shadow-sm flex flex-wrap items-center justify-between gap-4 z-40 sticky top-0">
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-bold text-sm text-primary flex items-center gap-2">
                        <span>🛠️</span> MASTER DEMO RATING:
                    </span>

                    <div className="flex flex-wrap gap-2 border-r border-slate-300 pr-4">
                        <span className="text-xs text-slate-500 font-bold self-center mr-1">ROLE:</span>
                        <button
                            onClick={() => setDemoRole('mentee')}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${demoRole === 'mentee' ? 'bg-secondary text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-600'
                                }`}
                        >
                            Mentee
                        </button>
                        <button
                            onClick={() => setDemoRole('mentor')}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${demoRole === 'mentor' ? 'bg-secondary text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-600'
                                }`}
                        >
                            Mentor
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-slate-500 font-bold self-center mr-1">STATE:</span>
                        <button
                            onClick={() => setSimState('belum')}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${simState === 'belum' ? 'bg-secondary text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-600'
                                }`}
                        >
                            Belum Ada Sesi/Rating
                        </button>
                        <button
                            onClick={() => setSimState('ada')}
                            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${simState === 'ada' ? 'bg-secondary text-white shadow-sm' : 'bg-white border border-slate-300 text-slate-600'
                                }`}
                        >
                            Ada Sesi/Sudah Dinilai
                        </button>
                    </div>
                </div>
            </div>

            {/* AREA HEADER HALAMAN ASLI */}
            <div className="px-8 py-8 w-full max-w-6xl mx-auto">
                <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
                    <button
                        type="button"
                        onClick={() => navigate(demoRole === 'mentor' ? '/mentor/dasbor' : '/mentee/dasbor')}
                        className="rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200"
                    >
                        Kembali ke Dasbor
                        <ArrowLeft size={14} />
                    </button>
                    <p className="text-sm text-slate-500">
                        {demoRole === 'mentee'
                            ? 'Evaluasi kualitas sesi yang telah selesai'
                            : 'Ringkasan reputasi dan ulasan sesi'}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-bold text-secondary tracking-widest uppercase">
                        Sesi 2 · Quality & Trust
                    </p>
                    <h1 className="mt-3 text-4xl font-medium text-primary">
                        {demoRole === 'mentee' ? 'Rating, Ulasan, dan Moderasi' : 'Penilaian Rating Mentor'}
                    </h1>
                    <p className="mt-3 text-slate-500 mb-8">
                        {demoRole === 'mentee'
                            ? 'Umpan balik terverifikasi untuk menjaga mutu ekosistem bimbingan Mentlify.'
                            : 'Pantau penilaian terverifikasi dan ulasan terbaru dari sesi yang telah selesai.'}
                    </p>
                </div>

                {/* AREA RENDER KOMPONEN UTAMA */}
                {demoRole === 'mentee' ? (
                    <RatingMentee simState={simState} />
                ) : (
                    <RatingMentor simState={simState} />
                )}
            </div>

        </div>
    );
}