import { useState, useEffect } from "react";
import {
    X,
    Clock,
    Database,
    BookOpen,
    Calendar,
    Video,
    Lock,
    AlertCircle,
    ShieldCheck,
    Sparkles,
    ArrowUpRight,
    Eye,
    Check,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Font (Montserrat untuk judul/tombol, Merriweather untuk teks isi)  */
/* ------------------------------------------------------------------ */
const FontStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;600;700;800&display=swap');
    .font-head { font-family: 'Montserrat', ui-sans-serif, system-ui, sans-serif; }
    .font-body { font-family: 'Merriweather', Georgia, serif; }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Pembungkus modal (overlay + wadah + header)                        */
/* ------------------------------------------------------------------ */
const ModalShell = ({ onClose, maxWidth = "max-w-lg", children }) => (
    <div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
    >
        <div
            className={`bg-white rounded-3xl overflow-hidden w-full ${maxWidth} shadow-2xl relative max-h-[90vh] overflow-y-auto border border-accent/70`}
            onClick={(e) => e.stopPropagation()}
        >
            {children}
        </div>
    </div>
);

const CloseButton = ({ onClose }) => (
    <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="rounded-full border border-slate-200 text-slate-400 p-2 hover:bg-slate-100 transition-colors shrink-0"
    >
        <X size={16} />
    </button>
);

/* ------------------------------------------------------------------ */
/*  1. Modal Batalkan Pengajuan / Sesi (Kalkulator Refund - Mentee)    */
/* ------------------------------------------------------------------ */
const HARGA_SESI = 20;
const KONDISI = [
    { id: "24", label: "≥ 24 Jam", persen: 100, teks: "Refund penuh (100%)", info: "Seluruh koin dikembalikan", sisa: "lebih dari 24 jam" },
    { id: "6-24", label: "6 - 24 Jam", persen: 50, teks: "Refund diterima (50%, ceil)", info: "Koin utama dikembalikan lebih dulu", sisa: "12 jam" },
    { id: "6", label: "< 6 Jam", persen: 0, teks: "Tidak ada refund (0%)", info: "Pembatalan mendadak tidak dikembalikan", sisa: "kurang dari 6 jam" },
];

const ModalBatalkan = ({ onClose }) => {
    const [kondisiId, setKondisiId] = useState("6-24");
    const [alasan, setAlasan] = useState("");

    const kondisi = KONDISI.find((k) => k.id === kondisiId);
    const refund = Math.ceil((HARGA_SESI * kondisi.persen) / 100);
    const biaya = HARGA_SESI - refund;
    const valid = alasan.trim().length > 0;

    return (
        <ModalShell onClose={onClose}>
            {/* Header */}
            <div className="px-6 pt-6 pb-5 border-b border-accent bg-white">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="font-head text-[11px] font-bold tracking-wider uppercase text-secondary">
                            Kalkulator Refund • SRS-F-BOOK
                        </p>
                        <h2 className="font-head text-2xl font-extrabold text-primary mt-1">
                            Batalkan Pengajuan / Sesi
                        </h2>
                    </div>
                    <CloseButton onClose={onClose} />
                </div>
                <p className="font-body text-sm text-slate-500 mt-2">
                    Tinjau jumlah refund berdasarkan sisa waktu sebelum mengonfirmasi pembatalan.
                </p>
            </div>

            {/* Isi */}
            <div className="bg-lightBg p-4">
                <div className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="font-head bg-secondary text-white text-xs font-bold w-8 h-8 rounded-lg flex items-center justify-center">
                            01
                        </span>
                        <h3 className="font-head text-lg text-primary">Hitung Refund Pembatalan</h3>
                    </div>

                    {/* Tab kondisi */}
                    <div className="bg-lightBg rounded-full p-1 grid grid-cols-3 gap-1 mb-4">
                        {KONDISI.map((k) => (
                            <button
                                key={k.id}
                                type="button"
                                onClick={() => setKondisiId(k.id)}
                                className={`font-head rounded-full py-2 text-sm font-bold transition-all ${kondisiId === k.id
                                        ? "bg-secondary text-white shadow-sm"
                                        : "text-slate-500 hover:text-primary"
                                    }`}
                            >
                                {k.label}
                            </button>
                        ))}
                    </div>

                    {/* Kotak kuning: kondisi aktif */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900">
                        <p className="font-body text-xs font-bold flex items-center gap-2 text-amber-800 mb-3">
                            <Clock size={16} /> Kondisi aktif • tersisa {kondisi.sisa}
                        </p>
                        <div className="flex items-start justify-between gap-3 border-b border-amber-200 pb-2.5">
                            <div className="font-body">
                                <p className="text-sm">{kondisi.teks}</p>
                                <p className="text-xs text-amber-800/80 mt-1">{kondisi.info}</p>
                            </div>
                            <p className="font-body text-sm font-bold text-primary whitespace-nowrap">{refund} Koin</p>
                        </div>
                        <div className="flex items-start justify-between gap-3 pt-2.5">
                            <div className="font-body">
                                <p className="text-sm">Biaya pembatalan</p>
                                <p className="text-xs text-amber-800/80 mt-1">Dihitung otomatis sesuai kebijakan</p>
                            </div>
                            <p className="font-body text-sm font-bold text-primary whitespace-nowrap">{biaya} Koin</p>
                        </div>
                    </div>

                    {/* Catatan lot promo */}
                    <div className="bg-lightBg rounded-lg p-3 mt-3 flex items-start gap-2.5">
                        <Database size={16} className="text-secondary mt-0.5 shrink-0" />
                        <p className="font-body text-xs text-slate-600">
                            Jika lot Koin Promo sudah kedaluwarsa, sistem membuat lot refund baru yang berlaku{" "}
                            <strong className="text-primary">7 hari</strong>.
                        </p>
                    </div>

                    {/* Alasan */}
                    <label className="font-body block text-sm font-bold text-primary mt-4 mb-2" htmlFor="alasan-batal">
                        Alasan Pembatalan <span className="text-red-500 text-xs font-bold">WAJIB</span>
                    </label>
                    <textarea
                        id="alasan-batal"
                        value={alasan}
                        onChange={(e) => setAlasan(e.target.value)}
                        rows={3}
                        placeholder="Jelaskan alasan pembatalan secara ringkas..."
                        className="font-head w-full bg-lightBg border border-accent rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-secondary focus:outline-none resize-none"
                    />

                    <button
                        type="button"
                        disabled={!valid}
                        onClick={onClose}
                        className={`font-head w-full mt-3 rounded-full py-2.5 text-sm font-bold transition-all duration-200 ${valid
                                ? "bg-red-500 text-white hover:brightness-110 shadow-sm"
                                : "bg-slate-200 text-slate-400 border border-red-300 cursor-not-allowed select-none"
                            }`}
                    >
                        Konfirmasi Pembatalan
                    </button>
                </div>
            </div>
        </ModalShell>
    );
};

/* ------------------------------------------------------------------ */
/*  2. Modal Konfirmasi & Kunci Jadwal (Mentor)                        */
/* ------------------------------------------------------------------ */
const validasiUrl = (platform, value) => {
    try {
        const u = new URL(value.trim());
        if (u.protocol !== "https:") return false;
        if (u.username || u.password || u.port) return false;
        if (u.pathname === "/" || u.pathname === "") return false;
        const host = u.hostname.toLowerCase();
        if (platform === "meet") return host === "meet.google.com";
        return host === "zoom.us" || host.endsWith(".zoom.us");
    } catch {
        return false;
    }
};

const ModalKonfirmasi = ({ onClose }) => {
    const [platform, setPlatform] = useState("meet");
    const [url, setUrl] = useState("https://meet.google.com/abc-defg-hij");
    const valid = validasiUrl(platform, url);

    const gantiPlatform = (p) => {
        setPlatform(p);
        setUrl(p === "meet" ? "https://meet.google.com/abc-defg-hij" : "https://zoom.us/j/123456789");
    };

    const buatOtomatis = () =>
        setUrl(
            platform === "meet"
                ? "https://meet.google.com/xyz-mnop-qrs"
                : "https://zoom.us/j/987654321"
        );

    return (
        <ModalShell onClose={onClose}>
            {/* Header */}
            <div className="bg-lightBg px-6 pt-6 pb-5">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="font-head text-2xl font-extrabold text-primary">
                        Konfirmasi &amp; Kunci Jadwal Bimbingan
                    </h2>
                    <CloseButton onClose={onClose} />
                </div>
                <p className="font-body text-sm text-slate-500 mt-2">
                    Periksa detail sesi dan pastikan tautan pertemuan valid sebelum mengunci jadwal.
                </p>
            </div>

            <div className="px-6 py-5 space-y-5">
                {/* Kartu mentee */}
                <div className="bg-white rounded-2xl border border-accent/70 p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="rounded-full w-14 h-14 border-2 border-accent bg-orange-300 flex items-center justify-center font-head font-extrabold text-white text-lg shrink-0">
                            RP
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-body text-[11px] font-bold text-secondary tracking-wider uppercase">
                                Mentee Terverifikasi
                            </p>
                            <p className="font-head text-base font-bold text-slate-800">Raka Pradipta</p>
                            <p className="font-body text-xs text-slate-500 truncate">raka.pradipta@umrah.ac.id</p>
                        </div>
                        <div className="bg-lightBg rounded-xl px-3 py-2 text-right shrink-0">
                            <p className="font-body text-xs text-slate-500">Tarif Terkunci</p>
                            <p className="font-head text-sm font-bold text-secondary">20 Koin</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 border-t border-accent/50 mt-4 pt-3">
                        <div>
                            <p className="font-body text-xs text-slate-500 flex items-center gap-1.5">
                                <BookOpen size={16} className="text-secondary" /> Topik
                            </p>
                            <p className="font-body text-xs font-bold text-slate-700 mt-1">Pemrograman Web Lanjut</p>
                        </div>
                        <div>
                            <p className="font-body text-xs text-slate-500 flex items-center gap-1.5">
                                <Calendar size={16} className="text-secondary" /> Jadwal
                            </p>
                            <p className="font-body text-xs font-bold text-slate-700 mt-1">
                                Senin, 18 Mei 2026 • 19:00 - 20:00 WIB
                            </p>
                        </div>
                        <div>
                            <p className="font-body text-xs text-slate-500 flex items-center gap-1.5">
                                <Clock size={16} className="text-secondary" /> Durasi
                            </p>
                            <p className="font-body text-xs font-bold text-slate-700 mt-1">60 Menit</p>
                        </div>
                    </div>
                </div>

                {/* Platform */}
                <div>
                    <p className="font-body text-sm font-bold text-primary mb-2">Platform Pertemuan</p>
                    <div className="bg-lightBg rounded-full p-1 grid grid-cols-2 gap-1">
                        {[
                            { id: "meet", label: "Google Meet" },
                            { id: "zoom", label: "Zoom Meeting" },
                        ].map((p) => (
                            <button
                                key={p.id}
                                type="button"
                                onClick={() => gantiPlatform(p.id)}
                                className={`font-head rounded-full py-2 text-sm font-bold flex items-center justify-center gap-2 transition-all ${platform === p.id ? "bg-secondary text-white shadow-sm" : "text-slate-500 hover:text-primary"
                                    }`}
                            >
                                <Video size={14} /> {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tautan */}
                <div>
                    <div className="flex items-end justify-between gap-3 mb-2">
                        <div>
                            <p className="font-body text-sm font-bold text-primary">Tautan Ruang Pertemuan</p>
                            <p className="font-body text-[11px] font-bold text-red-500 uppercase">Wajib diisi</p>
                        </div>
                        <button
                            type="button"
                            onClick={buatOtomatis}
                            className="font-head rounded-full bg-secondary hover:brightness-110 text-white font-bold px-4 py-2 text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                        >
                            <Sparkles size={14} /> Buat Tautan Otomatis via API
                        </button>
                    </div>
                    <div
                        className={`flex items-center gap-2 bg-lightBg rounded-lg border px-3 py-2.5 ${valid ? "border-secondary" : "border-red-400"
                            }`}
                    >
                        <Lock size={14} className="text-secondary shrink-0" />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://meet.google.com/abc-defg-hij"
                            className="font-head flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Kotak merah pudar: aturan validasi */}
                <div className="bg-red-100 border border-red-400 rounded-lg p-3.5 text-red-900">
                    <p className="font-body text-sm font-bold text-red-800 flex items-center gap-1.5">
                        <AlertCircle size={14} /> Aturan Validasi 5.14
                    </p>
                    <p className="font-body text-sm mt-1.5 leading-relaxed">
                        Wajib skema https://, domain resmi (meet.google.com, zoom.us, *.zoom.us), path tidak boleh
                        kosong, tanpa kredensial/port non-standar, dan dilarang memakai URL shortener.
                    </p>
                </div>

                {/* Keamanan OTP */}
                <div className="bg-lightBg rounded-lg p-3.5 flex items-start gap-3">
                    <span className="bg-secondary text-white rounded-lg p-1.5 shrink-0">
                        <ShieldCheck size={16} />
                    </span>
                    <div>
                        <p className="font-body text-sm font-bold text-primary">Keamanan OTP Terenkripsi</p>
                        <p className="font-body text-sm text-slate-500 mt-0.5">
                            Sistem membangkitkan OTP 6 digit dengan CSPRNG dan AES-256-GCM pada SessionLog. Kode
                            hanya tampil di layar Mentor saat sesi dimulai.
                        </p>
                    </div>
                </div>
            </div>

            {/* Aksi */}
            <div className="bg-lightBg px-6 py-4 grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="font-head rounded-full border border-red-400 text-red-500 bg-white hover:bg-red-50 font-bold px-4 py-2.5 text-sm transition-all duration-200"
                >
                    Tolak Request (Refund 100%)
                </button>
                <button
                    type="button"
                    disabled={!valid}
                    onClick={onClose}
                    className={`font-head rounded-full font-bold px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-200 ${valid
                            ? "bg-secondary hover:brightness-110 text-white shadow-sm"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed select-none"
                        }`}
                >
                    Konfirmasi &amp; Kunci Jadwal <ArrowUpRight size={14} />
                </button>
            </div>
        </ModalShell>
    );
};

/* ------------------------------------------------------------------ */
/*  3. Modal Aju Banding Sesi                                          */
/* ------------------------------------------------------------------ */
const JENIS_KONFLIK = [
    { id: "absen", judul: "Ketidakhadiran", desk: "Pihak lain tidak bergabung ke ruang sesi" },
    { id: "tidak-sesuai", judul: "Sesi tidak sesuai", desk: "Materi atau durasi berbeda dari kesepakatan" },
    { id: "perilaku", judul: "Perilaku tidak pantas", desk: "Terjadi perilaku yang melanggar panduan" },
];

const ModalBanding = ({ onClose }) => {
    const [jenis, setJenis] = useState("absen");
    const [kronologi, setKronologi] = useState("");
    const valid = kronologi.trim().length >= 10;

    return (
        <ModalShell onClose={onClose} maxWidth="max-w-4xl">
            {/* Hero */}
            <div className="bg-primary text-white p-6 md:p-8 relative">
                <div className="absolute top-4 right-4">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Tutup"
                        className="rounded-full border border-white/30 text-white/80 p-2 hover:bg-white/10 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
                <div className="grid md:grid-cols-[1fr_300px] gap-6 md:pr-10">
                    <div>
                        <span className="font-body inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Belum diajukan
                        </span>
                        <p className="font-body text-xs font-bold tracking-widest uppercase text-accent mt-5">
                            Aju Banding Sesi
                        </p>
                        <h2 className="font-head text-3xl md:text-4xl font-medium mt-1">Ajukan banding secara aman</h2>
                        <p className="font-body text-sm text-white/80 mt-3 max-w-md">
                            Ceritakan konflik yang terjadi. Dana 20 Koin tetap terlindungi di escrow selama proses
                            pemeriksaan.
                        </p>
                    </div>
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 self-start">
                        <p className="font-body text-xs font-bold tracking-widest uppercase text-accent">Booking Terkait</p>
                        <p className="font-body text-xl font-bold mt-1">#BK-2026-089</p>
                        <p className="font-body text-sm text-white/80 mt-1 pb-3 border-b border-white/20">
                            Kalkulus Dasar • 18 Mei 2026
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="rounded-full w-10 h-10 bg-accent text-primary font-head font-extrabold text-sm flex items-center justify-center">
                                FA
                            </div>
                            <div>
                                <p className="font-body text-sm font-bold">Farhan Akbar</p>
                                <p className="font-body text-xs text-accent">Sesi 19:00–20:00 WIB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Isi */}
            <div className="bg-lightBg p-4 grid md:grid-cols-[1fr_300px] gap-4">
                {/* Form */}
                <div className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                        <span className="font-head bg-secondary text-white text-xs font-bold w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-4">
                            01
                        </span>
                        <div>
                            <p className="font-body text-[11px] font-bold tracking-wider uppercase text-secondary">
                                Jenis Konflik
                            </p>
                            <h3 className="font-head text-2xl font-extrabold text-primary">Apa yang terjadi?</h3>
                            <p className="font-body text-sm text-slate-500">
                                Pilih kategori yang paling mendekati kendala Anda.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5">
                        {JENIS_KONFLIK.map((j) => {
                            const aktif = jenis === j.id;
                            return (
                                <button
                                    key={j.id}
                                    type="button"
                                    onClick={() => setJenis(j.id)}
                                    aria-pressed={aktif}
                                    className={`text-left rounded-xl p-3.5 bg-lightBg border transition-all ${aktif ? "border-secondary" : "border-transparent hover:border-accent"
                                        }`}
                                >
                                    <span
                                        className={`rounded-full w-6 h-6 flex items-center justify-center mb-3 border ${aktif ? "bg-secondary border-secondary text-white" : "border-accent text-transparent"
                                            }`}
                                    >
                                        <Check size={12} />
                                    </span>
                                    <p className="font-head text-sm font-bold text-primary">{j.judul}</p>
                                    <p className="font-head text-xs text-slate-500 mt-1">{j.desk}</p>
                                </button>
                            );
                        })}
                    </div>

                    <label htmlFor="kronologi" className="font-body block text-sm font-bold text-primary mb-2">
                        Kronologi singkat
                    </label>
                    <textarea
                        id="kronologi"
                        value={kronologi}
                        onChange={(e) => setKronologi(e.target.value)}
                        rows={4}
                        placeholder="Jelaskan waktu, kejadian, dan upaya penyelesaian yang sudah dilakukan..."
                        className="font-head w-full bg-lightBg border border-accent rounded-lg px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 placeholder:font-bold focus:border-secondary focus:outline-none resize-none"
                    />

                    <button
                        type="button"
                        disabled={!valid}
                        onClick={onClose}
                        className={`font-head w-full mt-4 rounded-full py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${valid
                                ? "bg-secondary hover:brightness-110 text-white shadow-sm"
                                : "bg-slate-200 text-slate-400 cursor-not-allowed select-none"
                            }`}
                    >
                        Lanjut Unggah Bukti <ArrowUpRight size={14} />
                    </button>
                </div>

                {/* Panel perlindungan */}
                <div className="bg-gradient-to-b from-secondary to-[#0E7490] text-white rounded-3xl p-5 shadow-md">
                    <span className="bg-white text-secondary rounded-xl w-11 h-11 flex items-center justify-center">
                        <ShieldCheck size={18} />
                    </span>
                    <p className="font-body text-xs font-bold tracking-widest uppercase text-accent mt-5">
                        Perlindungan Pengguna
                    </p>
                    <h3 className="font-head text-xl font-extrabold mt-2 leading-snug">
                        Yang terjadi setelah pengaduan dibuat
                    </h3>
                    <ul className="font-body text-sm space-y-3 mt-5">
                        <li className="flex items-center gap-2.5">
                            <Lock size={16} className="text-accent shrink-0" /> Dana escrow tetap dibekukan
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Eye size={16} className="text-accent shrink-0" /> Bukti hanya diakses petugas berwenang
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Clock size={16} className="text-accent shrink-0" /> Putusan maksimal 3 hari kerja
                        </li>
                    </ul>
                    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mt-5">
                        <p className="font-body text-xs text-accent">Saldo dilindungi</p>
                        <p className="font-body text-2xl font-bold mt-1">20 Koin</p>
                        <p className="font-body text-xs text-accent mt-2">Belum didistribusikan</p>
                    </div>
                </div>
            </div>
        </ModalShell>
    );
};

/* ------------------------------------------------------------------ */
/*  Komponen Modal Murni (Overlay + Kotak Pop-up)                     */
/* ------------------------------------------------------------------ */
export default function ModalJadwal({ modalAktif, onClose }) {
    // Tutup dengan tombol Escape
    useEffect(() => {
        if (!modalAktif) return;
        const onKey = (e) => e.key === "Escape" && onClose && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [modalAktif, onClose]);

    if (!modalAktif) return null;

    return (
        <>
            <FontStyle />
            {modalAktif === "batalkan" && <ModalBatalkan onClose={onClose} />}
            {modalAktif === "konfirmasi" && <ModalKonfirmasi onClose={onClose} />}
            {modalAktif === "banding" && <ModalBanding onClose={onClose} />}
        </>
    );
}