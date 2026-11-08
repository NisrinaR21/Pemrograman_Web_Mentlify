import { useEffect, useRef, useState } from 'react';
import {
    AlertTriangle,
    ArrowLeft,
    ArrowUpRight,
    Bell,
    BookOpen,
    CalendarDays,
    Check,
    CheckCheck,
    Clock,
    FileText,
    Lock,
    Paperclip,
    Search,
    Send,
    ShieldCheck,
    User,
    UserRound,
    Video,
} from 'lucide-react';

/* ============================================================
   DATA DUMMY
   ============================================================ */
const VIEW_OPTIONS = [
    { key: 'ruang-tunggu', label: 'Ruang Tunggu' },
    { key: 'obrolan', label: 'Obrolan' },
];

const CHAT_STATE_OPTIONS = [
    { key: 'aktif', label: 'Input Aktif' },
    { key: 'hanya-baca', label: 'Hanya-Baca' },
];

const SESSION = {
    mentorName: 'Farhan Akbar',
    topic: 'Kalkulus Dasar',
    time: 'Hari ini, 19:00 - 20:00 WIB',
    duration: '60 Menit',
    serverTime: '19:20 WIB',
    meetLink: 'meet.google.com/abc-defg-hij',
    mentorPresent: true,
};

const CONVERSATIONS = [
    {
        id: 'bk-089',
        name: 'Farhan Akbar',
        topic: 'Kalkulus Dasar',
        code: '#BK-2026-089',
        time: '19:24',
        status: 'dikonfirmasi',
        statusLabel: 'Dikonfirmasi',
        avatarBg: 'bg-emerald-600',
    },
    {
        id: 'bk-074',
        name: 'Salsabila Putri',
        topic: 'Analisis Data',
        code: '#BK-2026-074',
        time: 'Kemarin',
        status: 'selesai',
        statusLabel: 'Selesai',
        avatarBg: 'bg-violet-400',
    },
    {
        id: 'bk-061',
        name: 'Raka Pradipta',
        topic: 'Pemrograman Web',
        code: '#BK-2026-061',
        time: '12 Mei',
        status: 'peninjauan',
        statusLabel: 'Peninjauan Admin',
        avatarBg: 'bg-rose-500',
    },
];

const INITIAL_MESSAGES = {
    'bk-089': [
        {
            id: 1,
            from: 'them',
            text: 'Halo Nadine, untuk sesi nanti kita akan membahas konsep integral dan latihan penerapannya. Apakah ada bagian khusus yang ingin difokuskan?',
            time: '18:42',
        },
        {
            id: 2,
            from: 'me',
            text: 'Saya masih kesulitan memahami integral substitusi. Boleh kita mulai dari contoh yang dasar?',
            time: '18:46',
            read: true,
        },
        {
            id: 3,
            from: 'them',
            text: 'Silakan lihat soal nomor 1–5 sebelum sesi dimulai.',
            time: '18:51',
            file: { name: 'Latihan_Integral_UMRAH.pdf', meta: 'PDF • 2,1 MB' },
        },
    ],
    'bk-074': [
        {
            id: 1,
            from: 'them',
            text: 'Terima kasih sudah mengikuti sesi Analisis Data kemarin. Jangan ragu bertanya lagi ya.',
            time: '16:10',
        },
        {
            id: 2,
            from: 'me',
            text: 'Terima kasih banyak, Kak! Materinya sangat membantu.',
            time: '16:14',
            read: true,
        },
    ],
    'bk-061': [
        {
            id: 1,
            from: 'me',
            text: 'Mentor tidak hadir pada jadwal yang disepakati, saya ajukan peninjauan.',
            time: '20:05',
            read: true,
        },
        {
            id: 2,
            from: 'them',
            text: 'Mohon maaf, ada kendala koneksi di sisi saya.',
            time: '20:12',
        },
    ],
};

/* ============================================================
   KOMPONEN KECIL
   ============================================================ */
function Avatar({ size = 'md', bg = 'bg-emerald-600' }) {
    const dims = size === 'lg' ? 'h-16 w-16' : size === 'sm' ? 'h-9 w-9' : 'h-12 w-12';
    const icon = size === 'lg' ? 28 : size === 'sm' ? 16 : 22;
    return (
        <div
            className={`flex shrink-0 items-center justify-center rounded-full border-2 border-accent text-white ${dims} ${bg}`}
        >
            <User size={icon} />
        </div>
    );
}

function PageHeader({ eyebrow, title, subtitle, onBack }) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    {eyebrow}
                </p>
                <h1 className="mt-3 text-3xl font-light text-primary sm:text-4xl">
                    {title}
                </h1>
                <p className="mt-3 text-sm text-primary/70">{subtitle}</p>
            </div>
            <button
                type="button"
                onClick={onBack}
                className="flex items-center justify-center gap-2 self-start rounded-full border border-secondary bg-white px-5 py-2.5 text-sm font-bold text-secondary transition-all duration-200 hover:bg-secondary/10 sm:self-auto"
            >
                Kembali ke Jadwal
                <ArrowLeft size={14} />
            </button>
        </div>
    );
}

function InfoBox({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-2.5 rounded-xl border border-accent/50 bg-[#F8FAF9] p-3">
            <Icon size={18} className="shrink-0 text-secondary" />
            <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                    {label}
                </p>
                <p className="text-sm font-semibold text-primary">{value}</p>
            </div>
        </div>
    );
}

function ConvStatus({ status, label }) {
    if (status === 'dikonfirmasi')
        return <span className="text-xs font-bold text-secondary">{label}</span>;
    if (status === 'peninjauan')
        return (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                {label}
            </span>
        );
    return (
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {label}
        </span>
    );
}

/* ============================================================
   MODE: RUANG TUNGGU
   ============================================================ */
function RuangTunggu({ onBack, onOpenChat, onOpenModal }) {
    return (
        <div className="space-y-5">
            {/* Banner sesi berlangsung */}
            <div className="flex items-center justify-between rounded-full bg-secondary px-5 py-3 text-white shadow-sm">
                <span className="flex items-center gap-2 text-sm font-bold">
                    <span className="relative flex h-3 w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                    </span>
                    Sesi Sedang Berlangsung
                </span>
                <span className="text-xs font-semibold sm:text-sm">
                    Jam Server {SESSION.serverTime}
                </span>
            </div>

            <PageHeader
                eyebrow="Ruang Tunggu"
                title="Ruang Tunggu Sesi"
                subtitle="Pastikan perangkat dan koneksi Anda siap sebelum bergabung."
                onBack={onBack}
            />

            {/* Kartu mentor */}
            <section className="rounded-2xl border border-accent/70 bg-white p-5 shadow-sm transition-all hover:border-accent">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="flex items-center gap-4 lg:w-72">
                        <Avatar size="lg" />
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                Sesi Bersama Mentor
                            </p>
                            <h3 className="text-xl font-extrabold text-primary">
                                {SESSION.mentorName}
                            </h3>
                            {SESSION.mentorPresent && (
                                <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-lightBg px-3 py-1 text-xs font-bold text-primary">
                                    <Check size={14} />
                                    Mentor sudah hadir
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
                        <InfoBox icon={BookOpen} label="Topik" value={SESSION.topic} />
                        <InfoBox icon={Clock} label="Waktu" value={SESSION.time} />
                        <InfoBox icon={CalendarDays} label="Durasi" value={SESSION.duration} />
                    </div>
                </div>
            </section>

            {/* Panel video */}
            <section className="overflow-hidden rounded-2xl border border-accent/70 bg-white shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)]">
                    <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-primary">
                        <div className="absolute h-72 w-72 rounded-full bg-white/5" />
                        <div className="absolute h-52 w-52 rounded-full border border-white/10" />
                        <div className="absolute -bottom-6 right-10 h-14 w-14 rounded-full bg-white/5" />
                        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-accent text-primary shadow-lg">
                            <Video size={42} />
                        </div>
                    </div>

                    <div className="flex flex-col justify-center p-6 sm:p-10">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                            Ruang Pertemuan Siap
                        </p>
                        <h2 className="mt-2 text-2xl font-extrabold text-primary sm:text-3xl">
                            Bergabung ke sesi video
                        </h2>
                        <p className="mt-3 text-sm text-primary/70">
                            Tautan hanya tersedia mulai 15 menit sebelum jadwal sesi.
                        </p>

                        <div className="mt-5 flex items-center gap-3 rounded-full border border-accent bg-lightBg px-4 py-2.5">
                            <Lock size={16} className="shrink-0 text-secondary" />
                            <span className="min-w-0 flex-1 truncate text-sm text-primary">
                                {SESSION.meetLink}
                            </span>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary">
                                Terverifikasi
                            </span>
                        </div>

                        <button
                            type="button"
                            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:brightness-110"
                        >
                            <Video size={18} />
                            Bergabung ke Video Meet
                            <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </section>

            {/* Bar aksi bawah */}
            <section className="rounded-2xl border border-accent/70 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                    <button
                        type="button"
                        onClick={onOpenChat}
                        className="flex items-center justify-center gap-3 rounded-full border border-secondary bg-white px-6 py-3 text-sm font-bold text-secondary transition-all duration-200 hover:bg-secondary/10"
                    >
                        Buka Ruang Obrolan Teks
                        <UserRound size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => onOpenModal && onOpenModal('banding')}
                        className="flex items-center justify-center gap-3 rounded-full bg-secondary px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:brightness-110"
                    >
                        Ajukan Pengaduan Konflik
                        <AlertTriangle size={16} />
                    </button>
                    <p className="flex flex-1 items-start gap-2 text-sm text-primary/70">
                        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-secondary" />
                        Pengaduan konflik hanya dapat diajukan jika terdapat kendala
                        kehadiran atau pelaksanaan sesi.
                    </p>
                </div>
            </section>
        </div>
    );
}

/* ============================================================
   MODE: OBROLAN
   ============================================================ */
function MessageBubble({ msg }) {
    const isMe = msg.from === 'me';
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[85%] px-4 py-3 sm:max-w-[70%] ${isMe
                        ? 'rounded-l-2xl rounded-tr-2xl bg-secondary text-white'
                        : 'rounded-r-2xl rounded-tl-2xl bg-slate-100 text-primary'
                    }`}
            >
                {msg.file && (
                    <div className="mb-3 flex items-center gap-3 rounded-xl bg-white px-3 py-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500 text-white">
                            <FileText size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-primary">
                                {msg.file.name}
                            </p>
                            <p className="text-xs text-primary/60">{msg.file.meta}</p>
                        </div>
                        <button
                            type="button"
                            aria-label="Buka berkas"
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent text-secondary transition-all hover:bg-secondary/10"
                        >
                            <ArrowUpRight size={14} />
                        </button>
                    </div>
                )}
                <p className="text-sm leading-relaxed sm:text-[15px]">{msg.text}</p>
                <p
                    className={`mt-2 flex items-center justify-end gap-1 text-xs ${isMe ? 'text-white/90' : 'text-primary/60'
                        }`}
                >
                    {msg.time}
                    {isMe && msg.read && (
                        <>
                            <span>•</span>
                            <CheckCheck size={14} />
                            Dibaca
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

function Obrolan({
    onBack,
    chatState,
    setChatState,
    activeConvId,
    onSelectConv,
    messagesByConv,
    onSend,
}) {
    const [search, setSearch] = useState('');
    const [draft, setDraft] = useState('');
    const bottomRef = useRef(null);

    const activeConv = CONVERSATIONS.find((c) => c.id === activeConvId);
    const messages = messagesByConv[activeConvId] || [];
    const isReadOnly = chatState === 'hanya-baca';

    const filtered = CONVERSATIONS.filter((c) => {
        const q = search.trim().toLowerCase();
        if (!q) return true;
        return (
            c.name.toLowerCase().includes(q) ||
            c.topic.toLowerCase().includes(q) ||
            c.code.toLowerCase().includes(q)
        );
    });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages.length, activeConvId]);

    const handleSend = () => {
        const text = draft.trim();
        if (!text || isReadOnly) return;
        onSend(text);
        setDraft('');
    };

    return (
        <div className="space-y-5">
            <PageHeader
                eyebrow="Obrolan Sesi"
                title="Ruang Obrolan"
                subtitle="Pesan real-time dan pertukaran berkas yang aman untuk setiap booking."
                onBack={onBack}
            />

            {/* Switch state percakapan */}
            <div className="flex justify-end">
                <div className="flex items-center gap-1 rounded-full border border-accent bg-white p-1">
                    <span className="px-3 text-xs font-bold uppercase text-primary/70">
                        State Percakapan
                    </span>
                    {CHAT_STATE_OPTIONS.map((opt) => (
                        <button
                            key={opt.key}
                            type="button"
                            onClick={() => setChatState(opt.key)}
                            className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${chatState === opt.key
                                    ? 'bg-secondary text-white shadow-sm'
                                    : 'text-primary/70 hover:text-primary'
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Layout chat */}
            <section className="grid grid-cols-1 overflow-hidden rounded-2xl border border-accent/70 bg-white shadow-sm md:h-[680px] md:grid-cols-[320px_minmax(0,1fr)]">
                {/* Sisi kiri: daftar percakapan */}
                <aside className="flex min-h-0 flex-col border-b border-accent/40 bg-lightBg md:border-b-0 md:border-r">
                    <div className="px-5 pb-4 pt-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-extrabold text-primary">
                                Percakapan Booking
                            </h2>
                            <span className="text-sm font-bold text-secondary">
                                {CONVERSATIONS.length} Aktif
                            </span>
                        </div>
                        <div className="mt-4 flex items-center gap-2 rounded-full border border-accent bg-white px-4 py-2.5">
                            <Search size={16} className="shrink-0 text-secondary" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari percakapan..."
                                className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-primary/40"
                            />
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto">
                        {filtered.length === 0 && (
                            <p className="px-5 py-6 text-center text-sm text-primary/60">
                                Percakapan tidak ditemukan.
                            </p>
                        )}
                        {filtered.map((conv) => {
                            const isActive = conv.id === activeConvId;
                            return (
                                <button
                                    key={conv.id}
                                    type="button"
                                    onClick={() => onSelectConv(conv)}
                                    className={`flex w-full items-center gap-3 border-l-4 px-4 py-3.5 text-left transition-all ${isActive
                                            ? 'border-secondary bg-white'
                                            : 'border-transparent hover:bg-white/60'
                                        }`}
                                >
                                    <Avatar size="sm" bg={conv.avatarBg} />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-bold text-primary">{conv.name}</p>
                                        <p className="truncate text-sm text-primary/70">
                                            {conv.topic}
                                        </p>
                                        <p className="text-xs text-primary/60">{conv.code}</p>
                                    </div>
                                    <div className="flex shrink-0 flex-col items-end gap-2">
                                        <span className="text-xs text-primary/60">{conv.time}</span>
                                        <ConvStatus status={conv.status} label={conv.statusLabel} />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Sisi kanan: ruang pesan */}
                <div className="flex min-h-[560px] min-w-0 flex-col md:min-h-0">
                    {/* Header percakapan */}
                    <div className="flex items-center justify-between gap-3 border-b border-accent/30 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <Avatar bg={activeConv.avatarBg} />
                            <div>
                                <h3 className="text-lg font-extrabold text-primary">
                                    {activeConv.name}
                                </h3>
                                <p className="text-sm text-primary/70">
                                    {activeConv.topic} • {activeConv.code}
                                </p>
                            </div>
                        </div>
                        <span className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-lightBg px-3 py-1.5 text-xs font-bold text-primary">
                            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                            {activeConv.statusLabel}
                        </span>
                    </div>

                    {/* Isi pesan */}
                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-lightBg to-white px-5 py-4">
                        <div className="rounded-xl border border-accent bg-lightBg p-3.5">
                            <p className="flex items-center gap-2 text-sm font-bold text-primary">
                                <ShieldCheck size={16} className="text-secondary" />
                                Kebijakan Privasi
                            </p>
                            <p className="mt-1 pl-6 text-sm text-primary/70">
                                Admin Pengaduan Konflik hanya dapat membaca obrolan ketika
                                booking berstatus peninjauan_admin. Setiap akses dicatat dalam
                                AuditLog.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-primary/70">
                                Hari ini
                            </span>
                        </div>

                        {messages.map((msg) => (
                            <MessageBubble key={msg.id} msg={msg} />
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input / terkunci */}
                    <div className="border-t border-accent/30 bg-white p-3">
                        {isReadOnly ? (
                            <div className="flex items-center justify-center gap-3 rounded-full bg-slate-200 px-6 py-3 text-slate-500">
                                <Lock size={16} className="shrink-0" />
                                <div>
                                    <p className="text-sm font-bold">Percakapan hanya-baca</p>
                                    <p className="text-sm">
                                        Dikunci 7 hari setelah sesi selesai atau seketika ketika
                                        booking dibatalkan.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label="Lampirkan berkas"
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent bg-white text-secondary transition-all hover:bg-secondary/10"
                                >
                                    <Paperclip size={18} />
                                </button>
                                <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-accent bg-white px-4 py-2.5">
                                    <input
                                        type="text"
                                        value={draft}
                                        maxLength={2000}
                                        onChange={(e) => setDraft(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSend();
                                        }}
                                        placeholder="Ketik pesan..."
                                        className="min-w-0 flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-primary/40"
                                    />
                                    <span className="shrink-0 text-xs text-primary/60">
                                        {draft.length}/2000
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleSend}
                                    disabled={!draft.trim()}
                                    className="flex shrink-0 items-center gap-2 rounded-full bg-secondary px-5 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:brightness-100"
                                >
                                    <Send size={16} />
                                    Kirim
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

/* ============================================================
   KOMPONEN UTAMA
   ============================================================ */
export default function RuangInteraksi({ onOpenModal, initialView = 'ruang-tunggu', onBackToJadwal }) {
    const [viewMode, setViewMode] = useState(initialView);
    const [chatState, setChatState] = useState('aktif');
    const [activeConvId, setActiveConvId] = useState('bk-089');
    const [messagesByConv, setMessagesByConv] = useState(INITIAL_MESSAGES);

    useEffect(() => {
        if (initialView) {
            setViewMode(initialView);
        }
    }, [initialView]);

    const handleSelectConv = (conv) => {
        setActiveConvId(conv.id);
        // Hanya booking berstatus "Dikonfirmasi" yang inputnya aktif
        setChatState(conv.status === 'dikonfirmasi' ? 'aktif' : 'hanya-baca');
    };

    const handleSend = (text) => {
        const now = new Date();
        const time = `${String(now.getHours()).padStart(2, '0')}:${String(
            now.getMinutes()
        ).padStart(2, '0')}`;
        setMessagesByConv((prev) => ({
            ...prev,
            [activeConvId]: [
                ...prev[activeConvId],
                { id: Date.now(), from: 'me', text, time, read: false },
            ],
        }));
    };

    const pillBase =
        'rounded-full px-3 py-1 text-xs font-semibold transition-all border';
    const pillActive = 'bg-secondary text-white border-secondary';
    const pillIdle =
        'bg-white text-primary border-accent/60 hover:border-accent hover:bg-accent/10';

    return (
        <div className="min-h-screen bg-lightBg p-4 sm:p-8">
            <div className="mx-auto max-w-5xl">
                {/* Bar simulasi presentasi */}
                <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-accent/60 bg-white p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center">
                    <span className="text-sm font-bold text-primary">
                        🛠️ Simulasi Presentasi:
                    </span>

                    <div className="flex items-center gap-1.5">
                        <span className="text-xs text-primary/60">Tampilan:</span>
                        {VIEW_OPTIONS.map((opt) => (
                            <button
                                key={opt.key}
                                type="button"
                                onClick={() => setViewMode(opt.key)}
                                className={`${pillBase} ${viewMode === opt.key ? pillActive : pillIdle
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    {viewMode === 'obrolan' && (
                        <div className="flex items-center gap-1.5">
                            <span className="text-xs text-primary/60">Chat:</span>
                            {CHAT_STATE_OPTIONS.map((opt) => (
                                <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() => setChatState(opt.key)}
                                    className={`${pillBase} ${chatState === opt.key ? pillActive : pillIdle
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {viewMode === 'ruang-tunggu' ? (
                    <RuangTunggu
                        onBack={onBackToJadwal || (() => { })}
                        onOpenChat={() => setViewMode('obrolan')}
                        onOpenModal={onOpenModal}
                    />
                ) : (
                    <Obrolan
                        onBack={() => setViewMode('ruang-tunggu')}
                        chatState={chatState}
                        setChatState={setChatState}
                        activeConvId={activeConvId}
                        onSelectConv={handleSelectConv}
                        messagesByConv={messagesByConv}
                        onSend={handleSend}
                    />
                )}
            </div>
        </div>
    );
}