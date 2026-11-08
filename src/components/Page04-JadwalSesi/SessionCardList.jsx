import { useState } from 'react';
import {
    ArrowUpRight,
    BookOpen,
    CalendarDays,
    Check,
    Clock,
    Coins,
    GraduationCap,
    Lock,
    Video,
    X,
    User,
} from 'lucide-react';

/* ============================================================
   DATA DUMMY SESI (Daftar sesi lengkap per Role)
   ============================================================ */
const SESSIONS = {
    mentee: [
        {
            id: 'mentee-konfirmasi',
            status: 'dikonfirmasi',
            kind: 'dikonfirmasi',
            label: 'MENTOR SESI',
            name: 'Raka Pradipta',
            major: 'Teknik Informatika',
            topic: 'Pemrograman Web Lanjut',
            schedule: 'Hari ini • 15:00 WIB',
            duration: '60 Menit',
            statusText: 'Dikonfirmasi',
            online: true,
            meetLink: 'https://meet.google.com/abc-defg-hij',
            startsIn: 'Sesi dimulai dalam 15 menit',
        },
        {
            id: 'mentee-menunggu',
            status: 'menunggu',
            kind: 'menunggu',
            label: 'MENTOR SESI',
            name: 'Dr. Farhan Akbar',
            major: 'Pendidikan Matematika',
            topic: 'Kalkulus Dasar',
            schedule: 'Senin, 18 Mei 2026 • 19:00 WIB',
            duration: '60 Menit',
            statusText: 'Menunggu Respons Mentor',
            online: true,
            escrow: 20,
        },
        {
            id: 'mentee-selesai',
            status: 'selesai',
            kind: 'ditolak',
            label: 'MENTOR SESI',
            name: 'Salsabila Putri',
            major: 'Manajemen',
            topic: 'Analisis Data Dasar',
            schedule: 'Sabtu, 9 Mei 2026 • 10:00 WIB',
            duration: '60 Menit',
            statusText: 'Ditolak Mentor',
            online: false,
            refund: 20,
        },
    ],
    mentor: [
        {
            id: 'mentor-konfirmasi',
            status: 'dikonfirmasi',
            kind: 'dikonfirmasi',
            label: 'MENTEE SESI',
            name: 'Farhan Akbar',
            major: 'Pendidikan Matematika',
            topic: 'Kalkulus Dasar — Integral',
            schedule: 'Hari ini • 15:00 WIB',
            duration: '60 Menit',
            statusText: 'Dikonfirmasi',
            online: true,
            meetLink: 'https://meet.google.com/abc-defg-hij',
            checkInInfo: 'Tombol Check-in aktif H-15 menit sebelum sesi.',
        },
        {
            id: 'mentor-menunggu',
            status: 'menunggu',
            kind: 'menunggu',
            label: 'MENTEE SESI',
            name: 'Raka Pradipta',
            major: 'Teknik Informatika',
            topic: 'Pemrograman Web Lanjut',
            schedule: 'Senin, 18 Mei 2026 • 19:00 WIB',
            duration: '60 Menit',
            statusText: 'Menunggu Respons',
            online: true,
            deadline: 'Batas konfirmasi sisa 4 jam',
        },
        {
            id: 'mentor-selesai',
            status: 'selesai',
            kind: 'dibatalkan',
            label: 'MENTEE SESI',
            name: 'Salsabila Putri',
            major: 'Manajemen',
            topic: 'Pengantar Analisis Data',
            schedule: 'Sabtu, 9 Mei 2026 • 10:00 WIB',
            duration: '60 Menit',
            statusText: 'Dibatalkan',
            online: false,
            cancelledBy: 'Dibatalkan oleh Mentee',
            cancelNote: 'Refund 100% telah diproses',
        },
    ],
};

const EMPTY_STATES = {
    mentee: {
        badge: 'Mentee • Akun Baru',
        icon: User,
        title: 'Kamu Belum Memesan Sesi Bimbingan',
        desc: 'Mulai perjalanan belajarmu dengan mencari mentor berdasarkan topik, pengalaman, dan jadwal yang paling sesuai dengan kebutuhanmu.',
        cta: 'Cari & Pesan Mentor',
    },
    mentor: {
        badge: 'Mentor • Akun Baru',
        icon: GraduationCap,
        title: 'Belum Ada Permintaan Sesi Masuk',
        desc: 'Aktifkan dan lengkapi jam ketersediaan mingguanmu. Saat mentee memesan salah satu slot, detail pengajuan akan langsung tampil di halaman ini.',
        cta: 'Atur Ketersediaan Mingguan',
    },
};

const FEATURES = [
    'Booking tercatat otomatis',
    'Pengingat sebelum sesi',
    'Pembayaran terlindungi',
];

const ROLE_OPTIONS = [
    { key: 'mentee', label: 'Mentee' },
    { key: 'mentor', label: 'Mentor' },
];

const SIMULASI_KONDISI = [
    { key: 'berisi', label: 'Ada Jadwal (Berisi)' },
    { key: 'kosong', label: 'Kosong' },
];

const FILTER_TABS = [
    { key: 'semua', label: 'Semua' },
    { key: 'dikonfirmasi', label: 'Dikonfirmasi' },
    { key: 'menunggu', label: 'Menunggu' },
    { key: 'selesai', label: 'Ditolak / Selesai' },
];

/* ============================================================
   KOMPONEN KECIL
   ============================================================ */
function Avatar({ online }) {
    return (
        <div className="relative shrink-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-accent bg-accent/20 text-primary">
                <User size={26} strokeWidth={1.8} />
            </div>
            <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${online ? 'bg-secondary' : 'bg-gray-400'
                    }`}
            />
        </div>
    );
}

function StatusPill({ kind, children }) {
    const styles = {
        menunggu: 'bg-[#F9A03F] text-white',
        dikonfirmasi: 'bg-secondary text-white',
        ditolak: 'bg-red-400 text-white',
        dibatalkan: 'bg-red-500 text-white',
    };
    return (
        <span
            className={`inline-flex items-center whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold ${styles[kind] || 'bg-slate-500 text-white'}`}
        >
            {children}
        </span>
    );
}

function InfoBox({ icon: Icon, title, value, muted }) {
    return (
        <div
            className={`flex items-start gap-2.5 rounded-xl border border-accent/50 bg-[#F8FAF9] p-3 ${muted ? 'opacity-70' : ''
                }`}
        >
            <Icon size={18} className="mt-1 shrink-0 text-secondary" />
            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    {title}
                </p>
                <p
                    className={`mt-0.5 text-sm font-bold leading-snug text-primary ${muted ? 'text-primary/50 line-through' : ''
                        }`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

/* ============================================================
   AKSI DI SISI KANAN KARTU
   ============================================================ */
function ActionsMenteeMenunggu({ data, onCancel }) {
    return (
        <div className="flex h-full flex-col items-end justify-end gap-3">
            <p className="flex items-center gap-2 text-sm text-primary/70">
                <Coins size={16} />
                Koin tertahan (Escrow):{' '}
                <span className="font-bold text-[#F9A03F]">{data.escrow} Koin</span>
            </p>
            <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-red-400 px-5 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
            >
                Batalkan Pengajuan
            </button>
        </div>
    );
}

function ActionsMenteeDikonfirmasi({ data, onNavigateRuangInteraksi }) {
    const [otp, setOtp] = useState('');
    const [sent, setSent] = useState(false);

    const handleSend = () => {
        if (otp.length === 6) setSent(true);
    };

    return (
        <div className="flex h-full flex-col items-end gap-2.5">
            <p className="flex items-center gap-2 text-sm text-primary/70">
                <Clock size={16} />
                {data.startsIn}
            </p>
            <div className="flex w-full items-center gap-2 rounded-full border border-accent/50 bg-[#F2F2ED] px-4 py-2 text-sm text-primary/70">
                <ArrowUpRight size={16} className="shrink-0 text-secondary" />
                <span className="truncate">{data.meetLink}</span>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
                <button
                    type="button"
                    onClick={() => onNavigateRuangInteraksi && onNavigateRuangInteraksi('obrolan')}
                    className="rounded-full border border-secondary px-4 py-2 text-sm font-bold text-secondary transition-all hover:bg-secondary/10"
                >
                    Buka Obrolan
                </button>
                <button
                    type="button"
                    onClick={() => onNavigateRuangInteraksi && onNavigateRuangInteraksi('ruang-tunggu')}
                    className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                >
                    Ruang Tunggu Video
                    <Video size={16} />
                </button>
            </div>
            <div className="w-full">
                <p className="mb-1.5 text-sm font-semibold text-primary/70">
                    OTP Kehadiran
                </p>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value.replace(/\D/g, ''));
                            setSent(false);
                        }}
                        placeholder="6 digit"
                        className="min-w-0 flex-1 rounded-full border border-accent/70 bg-white px-4 py-2 text-sm tracking-widest text-primary outline-none placeholder:tracking-normal focus:border-secondary"
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        className="whitespace-nowrap rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white transition-all hover:brightness-110"
                    >
                        {sent ? 'Terkirim ✓' : 'Kirim OTP'}
                    </button>
                </div>
            </div>
            <button
                type="button"
                className="self-end text-sm font-bold text-secondary underline underline-offset-4 hover:opacity-90"
            >
                Lapor Mentor Tidak Hadir
            </button>
        </div>
    );
}

function ActionsMenteeDitolak({ data }) {
    return (
        <div className="flex h-full items-center">
            <div className="w-full rounded-xl border-2 border-secondary/60 bg-white p-4">
                <p className="text-xs text-primary/60">Pengajuan ditolak oleh mentor</p>
                <div className="mt-1 flex items-center gap-2">
                    <span className="text-lg font-bold text-secondary">
                        {data.refund} Koin
                    </span>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-bold text-white">
                        Refund 100%
                    </span>
                </div>
                <p className="mt-1 text-sm text-primary/70">
                    Saldo telah dikembalikan ke dompet Anda.
                </p>
            </div>
        </div>
    );
}

function ActionsMentorMenunggu({ data, onReject, onAccept }) {
    return (
        <div className="flex h-full flex-col items-end justify-end gap-3">
            <p className="flex items-center gap-2 text-sm text-primary/70">
                <span className="h-2 w-2 rounded-full bg-[#F9A03F]" />
                {data.deadline}
            </p>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={onReject}
                    className="rounded-full border border-red-400 px-5 py-2 text-sm font-bold text-red-500 transition-all hover:bg-red-50"
                >
                    Tolak
                </button>
                <button
                    type="button"
                    onClick={onAccept}
                    className="flex items-center gap-2 rounded-full bg-secondary px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                >
                    Terima &amp; Isi Link
                    <ArrowUpRight size={16} />
                </button>
            </div>
        </div>
    );
}

function ActionsMentorDikonfirmasi({ data, onCancel, onNavigateRuangInteraksi }) {
    return (
        <div className="flex h-full flex-col items-end gap-2.5">
            <p className="flex items-center gap-2 text-sm text-primary/70">
                <Clock size={16} />
                {data.checkInInfo}
            </p>
            <div className="flex w-full items-center gap-2 rounded-full border border-accent/50 bg-[#F2F2ED] px-4 py-2 text-sm text-primary/70">
                <Lock size={16} className="shrink-0 text-primary/60" />
                <span className="truncate">{data.meetLink}</span>
            </div>
            <div className="flex flex-wrap justify-end gap-2">
                <button
                    type="button"
                    onClick={() => onNavigateRuangInteraksi && onNavigateRuangInteraksi('obrolan')}
                    className="rounded-full border border-secondary px-4 py-2 text-sm font-bold text-secondary transition-all hover:bg-secondary/10"
                >
                    Buka Obrolan
                </button>
                <button
                    type="button"
                    onClick={() => onNavigateRuangInteraksi && onNavigateRuangInteraksi('ruang-tunggu')}
                    className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                >
                    Ruang Tunggu Video
                    <Video size={16} />
                </button>
            </div>
            <button
                type="button"
                onClick={onCancel}
                className="text-sm font-bold text-secondary underline underline-offset-4 hover:opacity-90"
            >
                Batalkan Sesi
            </button>
        </div>
    );
}

function ActionsMentorDibatalkan({ data }) {
    return (
        <div className="flex h-full items-center justify-end gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
                <X size={18} />
            </span>
            <div className="text-sm">
                <p className="font-medium text-primary/80">{data.cancelledBy}</p>
                <p className="text-primary/50">{data.cancelNote}</p>
            </div>
        </div>
    );
}

/* ============================================================
   KARTU SESI
   ============================================================ */
function SessionCard({ role, data, onOpenModal, onNavigateRuangInteraksi }) {
    const isInactive = data.kind === 'ditolak' || data.kind === 'dibatalkan';

    const renderActions = () => {
        if (role === 'mentee') {
            if (data.status === 'menunggu')
                return (
                    <ActionsMenteeMenunggu
                        data={data}
                        onCancel={() => onOpenModal && onOpenModal('batalkan')}
                    />
                );
            if (data.status === 'dikonfirmasi')
                return (
                    <ActionsMenteeDikonfirmasi
                        data={data}
                        onNavigateRuangInteraksi={onNavigateRuangInteraksi}
                    />
                );
            return <ActionsMenteeDitolak data={data} />;
        }
        if (data.status === 'menunggu')
            return (
                <ActionsMentorMenunggu
                    data={data}
                    onReject={() => onOpenModal && onOpenModal('batalkan')}
                    onAccept={() => onOpenModal && onOpenModal('konfirmasi')}
                />
            );
        if (data.status === 'dikonfirmasi')
            return (
                <ActionsMentorDikonfirmasi
                    data={data}
                    onCancel={() => onOpenModal && onOpenModal('batalkan')}
                    onNavigateRuangInteraksi={onNavigateRuangInteraksi}
                />
            );
        return <ActionsMentorDibatalkan data={data} />;
    };

    return (
        <div
            className={`rounded-2xl border p-5 shadow-sm transition-all hover:border-accent ${isInactive
                    ? 'border-accent/70 bg-slate-50'
                    : 'border-accent/70 bg-white'
                }`}
        >
            <div className="flex flex-col gap-5 lg:flex-row">
                {/* Sisi kiri: profil + 3 kotak info */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                        <Avatar online={data.online} />
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold uppercase tracking-wider text-secondary">
                                {data.label}
                            </p>
                            <h3 className="text-xl font-extrabold text-primary">
                                {data.name}
                            </h3>
                            <p className="text-sm text-primary/60">{data.major}</p>
                        </div>
                        <StatusPill kind={data.kind}>{data.statusText}</StatusPill>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1.1fr_1.3fr_0.8fr]">
                        <InfoBox
                            icon={BookOpen}
                            title="Topik Bimbingan"
                            value={data.topic}
                            muted={isInactive}
                        />
                        <InfoBox
                            icon={CalendarDays}
                            title="Jadwal Sesi"
                            value={data.schedule}
                            muted={isInactive}
                        />
                        <InfoBox
                            icon={Clock}
                            title="Durasi"
                            value={data.duration}
                            muted={isInactive}
                        />
                    </div>
                </div>

                {/* Garis pembatas vertikal di desktop */}
                <div className="hidden w-px bg-accent/40 lg:block" />

                {/* Sisi kanan: aksi sesuai status */}
                <div className="flex shrink-0 flex-col justify-between lg:w-80">
                    {renderActions()}
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   TAMPILAN KOSONG
   ============================================================ */
function EmptyState({ role }) {
    const cfg = EMPTY_STATES[role];
    const Icon = cfg.icon;

    return (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-accent bg-white p-8 text-center shadow-sm sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-secondary/10 blur-2xl" />

            <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-lightBg text-secondary shadow-inner">
                <Icon size={40} strokeWidth={1.75} />
            </div>

            <span className="relative mt-5 inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-xs font-bold text-secondary">
                {cfg.badge}
            </span>

            <h2 className="relative mt-4 text-2xl font-extrabold text-primary">
                {cfg.title}
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-primary/70">
                {cfg.desc}
            </p>

            <div className="relative mt-5 flex flex-wrap items-center justify-center gap-3">
                {FEATURES.map((f) => (
                    <span
                        key={f}
                        className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm"
                    >
                        <Check size={14} className="text-secondary" />
                        {f}
                    </span>
                ))}
            </div>

            <button
                type="button"
                className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:brightness-110"
            >
                {cfg.cta}
                <ArrowUpRight size={16} />
            </button>

            <p className="relative mt-4 text-sm text-primary/60">
                Ubah kondisi melalui switcher di simulasi untuk melihat daftar jadwal terisi.
            </p>
        </div>
    );
}

/* ============================================================
   KOMPONEN UTAMA
   ============================================================ */
export default function SessionCardList({ onOpenModal, onNavigateRuangInteraksi }) {
    const [role, setRole] = useState('mentee'); // 'mentee' | 'mentor'
    const [kondisi, setKondisi] = useState('berisi'); // 'berisi' | 'kosong'
    const [filterStatus, setFilterStatus] = useState('semua'); // 'semua' | 'dikonfirmasi' | 'menunggu' | 'selesai'

    const sessionList = SESSIONS[role] || [];
    const filteredSessions = sessionList.filter((item) => {
        if (filterStatus === 'semua') return true;
        return item.status === filterStatus;
    });

    const pillBase =
        'rounded-full px-3 py-1 text-xs font-semibold transition-all border';
    const pillActive = 'bg-secondary text-white border-secondary shadow-sm';
    const pillIdle =
        'bg-white text-primary border-accent/60 hover:border-accent hover:bg-accent/10';

    return (
        <div className="min-h-screen bg-lightBg p-4 sm:p-8 font-sans">
            <div className="mx-auto max-w-5xl">

                {/* 🛠️ BAR SIMULASI PRESENTASI: Hanya Role & Status Kosong/Berisi */}
                <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-accent/60 bg-white p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center">
                    <span className="text-sm font-bold text-primary">
                        🛠️ Simulasi Presentasi:
                    </span>

                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-primary/60">Role:</span>
                        {ROLE_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                onClick={() => setRole(opt.key)}
                                className={`${pillBase} ${role === opt.key ? pillActive : pillIdle}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-primary/60">Kondisi Data:</span>
                        {SIMULASI_KONDISI.map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                onClick={() => setKondisi(opt.key)}
                                className={`${pillBase} ${kondisi === opt.key ? pillActive : pillIdle}`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* HEADER JADWAL BIMBINGAN & TAB FILTER ASLI */}
                <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary">
                            Jadwal Bimbingan
                        </h1>
                        <p className="text-sm text-primary/60 mt-1">
                            {role === 'mentee'
                                ? 'Pantau sesi yang kamu pesan dari para mentor.'
                                : 'Kelola permintaan dan sesi bimbingan dari mentee.'}
                        </p>
                    </div>

                    {/* Tab Filter Status Halaman Asli (Hanya muncul jika kondisi ada isi/berisi) */}
                    {kondisi === 'berisi' && (
                        <div className="flex flex-wrap items-center gap-1.5 rounded-full border border-accent/70 bg-white p-1.5 shadow-sm">
                            {FILTER_TABS.map((tab) => {
                                const isActive = filterStatus === tab.key;
                                const count =
                                    tab.key === 'semua'
                                        ? sessionList.length
                                        : sessionList.filter((s) => s.status === tab.key).length;

                                return (
                                    <button
                                        key={tab.key}
                                        type="button"
                                        onClick={() => setFilterStatus(tab.key)}
                                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${isActive
                                                ? 'bg-secondary text-white shadow-sm'
                                                : 'text-slate-600 hover:text-secondary hover:bg-slate-50'
                                            }`}
                                    >
                                        <span>{tab.label}</span>
                                        <span
                                            className={`rounded-full px-1.5 py-0.2 text-[10px] ${isActive
                                                    ? 'bg-white/20 text-white'
                                                    : 'bg-slate-100 text-slate-500'
                                                }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* AREA KONTEN UTAMA */}
                {kondisi === 'kosong' ? (
                    <EmptyState role={role} />
                ) : (
                    <div className="space-y-4">
                        {filteredSessions.length > 0 ? (
                            filteredSessions.map((session) => (
                                <SessionCard
                                    key={session.id}
                                    role={role}
                                    data={session}
                                    onOpenModal={onOpenModal}
                                    onNavigateRuangInteraksi={onNavigateRuangInteraksi}
                                />
                            ))
                        ) : (
                            <div className="rounded-2xl border border-dashed border-accent/70 bg-white p-8 text-center text-sm text-slate-500">
                                Tidak ada jadwal sesi untuk filter status ini.
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
