import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Calendar,
    Clock,
    BookOpen,
    CheckCircle2,
    ArrowUpRight,
    Check,
    Lock,
    Target,
    Wrench,
    Sparkles,
} from 'lucide-react';
import { QuizModal } from './MisiDanKuis.jsx';

/* ------------------------------------------------------------------ */
/* SOAL LATIHAN KHUSUS SESI FARHAN AKBAR                              */
/* ------------------------------------------------------------------ */
const FARHAN_QUIZ_QUESTIONS = [
    {
        id: 201,
        topik: 'Kalkulus Dasar — Limit & Turunan',
        text: 'Berapakah nilai dari lim (x→0) (sin x) / x ?',
        options: ['0', '1', 'Tak hingga', 'Tidak ada'],
        correct: 1,
        explanation: 'Limit trigonometri fundamental menyatakan bahwa lim(x→0) (sin x)/x = 1.',
        xp: 20,
    },
    {
        id: 202,
        topik: 'Kalkulus Dasar — Limit & Turunan',
        text: "Jika f(x) = 4x³ − 2x² + 7, maka turunan pertamanya f'(x) adalah ...",
        options: ['12x² − 4x', '12x² − 2x', '4x² − 4x', '12x³ − 4x'],
        correct: 0,
        explanation: "Turunan aturan pangkat: d/dx(4x³) = 12x², d/dx(-2x²) = -4x, d/dx(7) = 0. Jadi f'(x) = 12x² − 4x.",
        xp: 20,
    },
    {
        id: 203,
        topik: 'Kalkulus Dasar — Limit & Turunan',
        text: 'Turunan dari fungsi f(x) = cos(x) terhadap x adalah ...',
        options: ['sin(x)', '−sin(x)', 'sec(x)', '−cos(x)'],
        correct: 1,
        explanation: "Turunan baku fungsi trigonometri kosinus adalah d/dx[cos(x)] = −sin(x).",
        xp: 20,
    },
];

/* ------------------------------------------------------------------ */
/* DATA DUMMY                                                          */
/* ------------------------------------------------------------------ */
const ROLE_DATA = {
    mentee: {
        person: {
            name: 'Farhan Akbar',
            initials: 'FA',
            description: 'Mahasiswa · Pendidikan Matematika',
        },
        session: {
            day: '24',
            month: 'Mei',
            topic: 'Kalkulus Dasar — Limit & Turunan',
            time: '19:00 - 20:00 WIB',
        },
        banner: {
            type: 'latihan',
            label: 'Latihan dari Mentor',
            title: '3 soal dari Farhan Akbar',
            description: 'Kerjakan soal yang diberikan untuk mempersiapkan sesi ini.',
            button: 'Kerjakan Soal',
        },
        empty: {
            badge: null,
            title: 'Belum Ada Jadwal Bimbingan Terdaftar',
            description:
                'Kamu belum memiliki sesi bimbingan terjadwal. Gunakan fitur matchmaking untuk mencari mentor mahasiswa atau alumni berdasarkan topik dan jadwal luangmu.',
            button: 'Cari & Pesan Mentor Sekarang',
        },
        stats: [
            { id: 1, icon: Clock, label: 'Jam Bimbingan', value: '12 jam', note: '+2 jam bulan ini' },
            { id: 2, icon: BookOpen, label: 'Topik Dipelajari', value: '8 topik', note: '3 topik minggu ini' },
            { id: 3, icon: CheckCircle2, label: 'Sesi Selesai', value: '6 sesi', note: '1 sesi menunggu' },
        ],
    },
    mentor: {
        person: {
            name: 'Farhan Akbar',
            initials: 'FA',
            description: 'Mahasiswa · Pendidikan Matematika',
        },
        session: {
            day: '24',
            month: 'Mei',
            topic: 'Kalkulus Dasar — Limit & Turunan',
            time: '19:00 - 20:00 WIB',
        },
        banner: {
            type: 'banksoal',
            label: 'Bank Soal Sesi',
            title: 'Latihan untuk sesi Kalkulus Dasar',
            description: 'Tersedia sebelum ruang dibuka dan selama sesi berlangsung.',
            button: 'Kelola Bank Soal',
        },
        empty: {
            badge: 'Jadwal Belum Dipesan',
            title: 'Menunggu Permintaan Bimbingan Masuk',
            description:
                'Jadwal ketersediaan mingguanmu sudah aktif di sistem. Saat mentee memesan slot waktumu, notifikasi dan detail permintaan akan tampil di sini untuk dikonfirmasi.',
            button: 'Kelola Jam Ketersediaan Mingguan',
        },
        stats: [
            { id: 1, icon: Clock, label: 'Jam Bimbingan', value: '18 jam', note: '+4 jam bulan ini' },
            { id: 2, icon: BookOpen, label: 'Topik Diajarkan', value: '5 topik', note: '2 topik minggu ini' },
            { id: 3, icon: CheckCircle2, label: 'Sesi Selesai', value: '9 sesi', note: '1 sesi menunggu' },
        ],
    },
};

const KONDISI_OPTIONS = [
    { key: 'kosong', label: 'Kosong' },
    { key: 'terjadwal', label: 'Terjadwal' },
    { key: '15menit', label: '15 Menit' },
];

/* ------------------------------------------------------------------ */
/* KELAS TOMBOL BERSAMA (mengikuti aturan-warna.md)                    */
/* ------------------------------------------------------------------ */
const BTN_PRIMARY =
    'rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md';
const BTN_OUTLINE =
    'rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200';
const BTN_DISABLED =
    'rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm cursor-not-allowed select-none';

/* ------------------------------------------------------------------ */
/* STATE KOSONG                                                        */
/* ------------------------------------------------------------------ */
function EmptyState({ role, data, onAction }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-accent bg-lightBg p-6 md:p-8 transition-all duration-200">
            {/* cincin dekoratif pojok kanan bawah */}
            <div className="pointer-events-none absolute -bottom-20 -right-10 h-52 w-52 rounded-full border-[44px] border-accent/25" />

            <div className="relative">
                {/* ikon kalender + buku */}
                <div className="relative mb-4 inline-flex items-center">
                    <BookOpen
                        size={38}
                        className="-mr-3 -rotate-6 text-secondary/40"
                        strokeWidth={1.5}
                    />
                    <div className="relative z-10 flex h-[76px] w-[76px] items-center justify-center rounded-2xl bg-secondary shadow-md">
                        <Calendar size={40} className="text-white" />
                    </div>
                </div>

                {data.badge && (
                    <div className="mb-3">
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                            {data.badge}
                        </span>
                    </div>
                )}

                <h3 className="text-xl font-medium text-primary md:text-2xl">
                    {data.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500 md:text-base">
                    {data.description}
                </p>

                <div className="mt-5">
                    {role === 'mentee' ? (
                        <Link to="/cari-mentor" className={`${BTN_PRIMARY} inline-flex hover:scale-[1.02]`}>
                            {data.button}
                            <ArrowUpRight size={16} />
                        </Link>
                    ) : (
                        <button
                            type="button"
                            onClick={onAction}
                            className={`${BTN_OUTLINE} inline-flex`}
                        >
                            {data.button}
                            <ArrowUpRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* KARTU SESI (TERJADWAL & 15 MENIT)                                   */
/* ------------------------------------------------------------------ */
function SessionCard({
    role,
    data,
    kondisi,
    is15Menit,
    hadir,
    onHadir,
    onToggle15Menit,
    onOpenLatihan,
    quizResult,
}) {
    const { person, session, banner } = data;
    const isLive = is15Menit || kondisi === '15menit';
    const isLatihan = banner.type === 'latihan';
    const jadwalSesiRoute = role === 'mentor' ? '/mentor/jadwal-sesi' : '/mentee/jadwal-sesi';

    return (
        <div className="rounded-2xl border border-accent/70 bg-white p-5 shadow-sm transition-all duration-200 hover:border-accent">
            {/* header: tanggal, profil, badge status */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 md:gap-4">
                    {/* badge tanggal */}
                    <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-secondary p-2.5 text-center text-white shadow-sm">
                        <span className="text-xl font-bold leading-none">{session.day}</span>
                        <span className="mt-1 text-[10px] font-bold uppercase tracking-widest">
                            {session.month}
                        </span>
                    </div>

                    {/* avatar */}
                    <div className="mt-3 hidden shrink-0 rounded-full border-2 border-secondary p-0.5 sm:block">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-lg font-bold text-primary">
                            {person.initials}
                        </div>
                    </div>

                    {/* identitas */}
                    <div className="pt-1">
                        <p className="text-sm text-slate-500">Bimbingan dengan</p>
                        <p className="text-xl font-medium text-primary md:text-2xl">
                            {person.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500 md:text-sm">
                            {person.description}
                        </p>
                    </div>
                </div>

                {/* badge status */}
                {isLive ? (
                    <span className="flex shrink-0 items-center gap-1 rounded-full border border-accent bg-accent/20 px-3 py-1 text-xs font-semibold text-primary">
                        Berlangsung
                    </span>
                ) : (
                    <span className="flex shrink-0 items-center gap-1 rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                        Dikonfirmasi
                    </span>
                )}
            </div>

            {/* sub-kotak info: topik & waktu */}
            <div className="my-4 grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
                <div className="flex items-start gap-2.5 rounded-xl border border-accent/50 bg-[#F8FAF9] p-3">
                    <BookOpen size={18} className="mt-0.5 shrink-0 text-secondary" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                            Topik
                        </p>
                        <p className="text-xs font-semibold text-slate-700 md:text-sm">
                            {session.topic}
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-2.5 rounded-xl border border-accent/50 bg-[#F8FAF9] p-3">
                    <Clock size={18} className="mt-0.5 shrink-0 text-secondary" />
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                            Waktu sesi
                        </p>
                        <p className="text-xs font-semibold text-slate-700 md:text-sm">
                            {session.time}
                        </p>
                    </div>
                </div>
            </div>

            {/* banner latihan (mentee) / bank soal (mentor) */}
            {isLatihan ? (
                <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-3.5 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accentYellow text-amber-800">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                                {banner.label}
                            </p>
                            <p className="text-sm font-semibold text-primary">{banner.title}</p>
                            <p className="text-xs text-slate-500 md:text-sm">
                                {quizResult
                                    ? `Kuis sudah dikerjakan (${quizResult.correct}/${quizResult.total} benar · +${quizResult.xp} XP)`
                                    : banner.description}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onOpenLatihan}
                        className={`${BTN_PRIMARY} shrink-0 whitespace-nowrap`}
                    >
                        {quizResult ? 'Lihat Hasil Soal' : banner.button}
                        {quizResult ? <CheckCircle2 size={16} className="text-accentYellow" /> : <ArrowUpRight size={16} />}
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-3 rounded-xl border border-sky-200 bg-sky-50 p-3.5 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-white">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                {banner.label}
                            </p>
                            <p className="text-sm font-semibold text-primary">{banner.title}</p>
                            <p className="text-xs text-slate-500 md:text-sm">
                                {banner.description}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onOpenLatihan}
                        className={`${BTN_OUTLINE} shrink-0 whitespace-nowrap`}
                    >
                        {banner.button}
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            )}

            {/* info tautan meeting */}
            <p className="mt-4 flex items-center gap-2 text-xs text-slate-500 md:text-sm">
                <Lock size={16} className="shrink-0" />
                Tautan Google Meet / Zoom aktif pada H-15 menit sebelum sesi dimulai.
            </p>

            {/* area aksi */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
                {isLive ? (
                    <>
                        <Link to={jadwalSesiRoute} className={`${BTN_PRIMARY} hover:scale-[1.02]`}>
                            Buka Ruang Sesi
                        </Link>
                        {hadir ? (
                            <span className="flex items-center justify-center gap-1.5 rounded-full border border-accent bg-accent/20 px-4 py-2 text-sm font-medium text-primary transition-all duration-200">
                                <CheckCircle2 size={16} className="text-secondary" />
                                Kehadiran Tercatat
                            </span>
                        ) : (
                            <button type="button" onClick={onHadir} className={BTN_OUTLINE}>
                                Saya Sudah Hadir
                                <Check size={16} />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onToggle15Menit}
                            className="text-xs text-slate-400 hover:text-slate-600 underline ml-1"
                        >
                            Reset ke sebelum 15 mnt
                        </button>
                    </>
                ) : (
                    <>
                        <button type="button" disabled className={BTN_DISABLED}>
                            Ruang Sesi Belum Dibuka
                        </button>
                        <button
                            type="button"
                            onClick={onToggle15Menit}
                            className="inline-flex items-center gap-1.5 rounded-full border border-secondary/40 bg-white px-3.5 py-1.5 text-xs font-semibold text-secondary transition-all hover:bg-secondary/10"
                            title="Simulasikan masuk H-15 menit agar tombol Buka Ruang Sesi aktif"
                        >
                            ⏱️ Simulasikan H-15 menit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* KARTU STATISTIK                                                     */
/* ------------------------------------------------------------------ */
function StatCards({ stats }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {stats.map((s) => {
                const Icon = s.icon;
                return (
                    <div
                        key={s.id}
                        className="rounded-2xl border border-accent/70 bg-white p-5 shadow-sm transition-all duration-200 hover:border-accent hover:shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-accent/20 p-2 text-secondary">
                                <Icon size={20} />
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                {s.label}
                            </p>
                        </div>
                        <p className="mt-3 text-2xl font-extrabold text-primary">{s.value}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{s.note}</p>
                    </div>
                );
            })}
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */
function JadwalHariIni({ userRole = 'mentee', showSimulation = true, initialKondisi = 'terjadwal' }) {
    const role = userRole === 'mentor' ? 'mentor' : 'mentee';
    const [kondisiJadwal, setKondisiJadwal] = useState(initialKondisi);
    const [is15Menit, setIs15Menit] = useState(false);
    const [hadir, setHadir] = useState(false);
    const [toast, setToast] = useState('');
    const [quizOpen, setQuizOpen] = useState(false);
    const [quizResult, setQuizResult] = useState(null);

    // sinkronkan jika ada perubahan state jadwal dari navbar
    useEffect(() => {
        setKondisiJadwal(initialKondisi);
        setIs15Menit(false);
    }, [initialKondisi, userRole]);

    // reset status hadir saat kondisi atau role berganti
    useEffect(() => {
        setHadir(false);
    }, [kondisiJadwal, userRole]);

    // toast otomatis hilang
    useEffect(() => {
        if (!toast) return undefined;
        const t = setTimeout(() => setToast(''), 2400);
        return () => clearTimeout(t);
    }, [toast]);

    const data = ROLE_DATA[role];

    const navigate = useNavigate();

    const handleHadir = () => {
        setHadir(true);
        setToast('Kehadiran kamu berhasil dicatat (simulasi)');
    };

    const handleOpenLatihan = () => {
        if (role === 'mentee') {
            setQuizOpen(true);
        } else {
            navigate('/mentor/bank-soal');
        }
    };

    const handleQuizFinish = (res) => {
        setQuizResult(res);
        setToast(`Soal Farhan Akbar selesai! Kamu mendapat +${res.xp} XP`);
    };

    return (
        <section className="w-full">
            {/* ---------------- JUDUL ---------------- */}
            <h2 className="mb-3 text-lg font-bold text-primary">Jadwal Hari Ini</h2>

            {/* ---------------- KONTEN JADWAL ---------------- */}
            <div className="relative">
                {kondisiJadwal === 'kosong' ? (
                    <EmptyState
                        role={role}
                        data={data.empty}
                        onAction={() => setToast('Membuka pengaturan jam ketersediaan (simulasi)')}
                    />
                ) : (
                    <SessionCard
                        role={role}
                        data={data}
                        kondisi={kondisiJadwal}
                        is15Menit={is15Menit}
                        hadir={hadir}
                        onHadir={handleHadir}
                        onToggle15Menit={() => setIs15Menit((prev) => !prev)}
                        onOpenLatihan={handleOpenLatihan}
                        quizResult={quizResult}
                    />
                )}

                {/* toast simulasi */}
                {toast && (
                    <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-accent/70 bg-white px-4 py-2 text-xs font-semibold text-primary shadow-md transition-all duration-200">
                        <Target size={14} className="text-secondary" />
                        {toast}
                    </div>
                )}
            </div>

            {/* ---------------- 3 KARTU STATISTIK ---------------- */}
            <div className="mt-4">
                <StatCards stats={data.stats} />
            </div>

            {/* ---------------- MODAL SOAL SESI (MENTEE) ---------------- */}
            {quizOpen && (
                <QuizModal
                    questions={FARHAN_QUIZ_QUESTIONS}
                    existingResult={quizResult}
                    onClose={() => setQuizOpen(false)}
                    onFinish={handleQuizFinish}
                />
            )}
        </section>
    );
}

export default JadwalHariIni;