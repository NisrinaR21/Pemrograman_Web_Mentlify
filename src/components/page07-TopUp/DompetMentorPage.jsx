// src/components/page07-dompet/DompetMentorPage.jsx
import { useState, useEffect, useRef } from "react";
import { PaketTopUp, ModalInvoice, PAKET_LIST, WAKTU_BAYAR_AWAL } from "./DompetMenteePage.jsx";
import {
    Bell,
    ArrowUpRight,
    ArrowLeft,
    Wallet,
    Sparkles,
    Lock,
    Coins,
    ShieldCheck,
    ShieldAlert,
    Clock,
    Check,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Font (sesuai Figma: Montserrat untuk judul, Merriweather untuk isi) */
/* ------------------------------------------------------------------ */
const FONT_IMPORT =
    "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@500;600;700;800&display=swap');";
const HEAD_FONT = { fontFamily: "'Montserrat', 'Segoe UI', sans-serif" };
const BODY_FONT = { fontFamily: "'Merriweather', Georgia, serif" };

/* ------------------------------------------------------------------ */
/*  Konstanta & data dummy                                             */
/* ------------------------------------------------------------------ */
const KURS_PER_KOIN = 1000;
const MIN_TARIK = 100;
const BIAYA_ADMIN = 0.05;
const NAMA_MENTOR = "Farhan Akbar";

const NAV_ITEMS = ["Dasbor", "Cari Mentor", "Jadwal Sesi", "Rating", "Profil"];
const RBAC_ITEMS = ["Mentor", "Admin Verifikator", "Admin Keuangan"];

const SALDO_AWAL = {
    utama: 120,
    promo: 17,
    tertahan: 20, // escrow booking
    redeemable: 340,
    payoutTertahan: 100,
};

const PENYEDIA = {
    bank: ["Bank Mandiri", "Bank BCA", "Bank BNI", "Bank BRI", "Bank Syariah Indonesia"],
    ewallet: ["GoPay", "OVO", "DANA", "ShopeePay"],
};

const REKENING_AWAL = {
    tipe: "bank",
    penyedia: "Bank Mandiri",
    nomor: "1230004829",
    nama: NAMA_MENTOR,
    terverifikasi: true,
};

const RIWAYAT_AWAL = [
    { id: "#PY-9021", tanggal: "18 Mei 2026", koin: 100, status: "menunggu_admin", catatan: null },
    { id: "#PY-8894", tanggal: "08 Mei 2026", koin: 150, status: "diproses", catatan: null },
    { id: "#PY-8818", tanggal: "01 Mei 2026", koin: 120, status: "disetujui", catatan: null },
    { id: "#PY-8740", tanggal: "21 Apr 2026", koin: 200, status: "berhasil", catatan: null },
    { id: "#PY-8512", tanggal: "02 Apr 2026", koin: 100, status: "ditolak", catatan: "Nama rekening tidak sesuai. Koin dikembalikan." },
    { id: "#PY-8404", tanggal: "18 Mar 2026", koin: 100, status: "gagal", catatan: null },
];

const STATUS_STYLE = {
    menunggu_admin: "bg-amber-100 text-amber-800",
    diproses: "bg-slate-200 text-slate-700",
    disetujui: "bg-sky-100 text-secondary",
    berhasil: "bg-secondary text-white",
    ditolak: "bg-red-100 text-red-700",
    gagal: "bg-red-500 text-white",
};

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */
const formatRupiah = (angka) => "Rp " + Number(angka).toLocaleString("id-ID");

const sensorNomor = (nomor) => {
    const akhir = nomor.slice(-4);
    return `•••• •••• ${akhir}`;
};

const hitungPayout = (koin) => {
    const bruto = koin * KURS_PER_KOIN;
    const biaya = Math.round(bruto * BIAYA_ADMIN);
    return { bruto, biaya, bersih: bruto - biaya };
};

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Bar Simulasi Presentasi                              */
/* ------------------------------------------------------------------ */
function BarSimulasi({
    halaman,
    rekeningTerisi,
    sukses,
    onBukaPayout,
    onKembali,
    onToggleRekening,
    onSimulasiSukses,
    onReset,
}) {
    const base =
        "rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 whitespace-nowrap";
    const normal = `${base} border border-accent bg-white text-secondary hover:bg-secondary/10`;
    const aktif = `${base} bg-secondary text-white shadow-sm hover:brightness-110`;

    return (
        <div
            className="bg-white border-b border-accent/70 px-4 py-2 flex flex-wrap items-center gap-2 text-xs text-primary"
            style={HEAD_FONT}
        >
            <span className="font-bold mr-1">🛠️ Simulasi Presentasi:</span>

            <button type="button" className={halaman === "dompet" ? aktif : normal} onClick={onKembali}>
                Tampilan Dompet
            </button>
            <button type="button" className={halaman === "payout" ? aktif : normal} onClick={onBukaPayout}>
                Buka Halaman Payout
            </button>

            <span className="mx-1 text-slate-300">|</span>

            <button type="button" className={normal} onClick={onToggleRekening}>
                Rekening: {rekeningTerisi ? "Terisi → Kosongkan" : "Kosong → Isi"}
            </button>
            <button type="button" className={sukses ? aktif : normal} onClick={onSimulasiSukses}>
                Simulasi Sukses Ajukan Payout
            </button>

            <span className="mx-1 text-slate-300">|</span>

            <button type="button" className={normal} onClick={onReset}>
                Reset
            </button>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Banner (Tampilan Dompet)                             */
/* ------------------------------------------------------------------ */
function BannerKoin({ onTopUp }) {
    return (
        <section className="relative overflow-hidden bg-secondary text-white rounded-3xl p-8 shadow-sm">
            <div className="absolute -top-24 right-40 w-72 h-72 rounded-full border-[28px] border-white/10 pointer-events-none" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="max-w-xl">
                    <h1 className="text-3xl md:text-4xl font-semibold" style={HEAD_FONT}>
                        Dompet Koin Mentlify
                    </h1>
                    <p className="text-sm mt-4 text-white/90 leading-relaxed">
                        Kelola saldo, lot promo FEFO, pembelian paket, dan seluruh mutasi transaksi dalam satu tempat.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-start lg:self-center">
                    <div className="bg-white/10 border border-white/25 rounded-xl px-5 py-4 flex items-center gap-3">
                        <Coins size={18} className="text-accent" />
                        <div>
                            <p className="text-[11px] font-bold text-accent tracking-wider uppercase" style={HEAD_FONT}>
                                Kurs Resmi
                            </p>
                            <p className="text-xl font-bold mt-0.5" style={HEAD_FONT}>
                                1 Koin = {formatRupiah(KURS_PER_KOIN)}
                            </p>
                        </div>
                    </div>
                    {onTopUp && (
                        <button
                            type="button"
                            onClick={onTopUp}
                            className="rounded-full bg-[#F9C74F] hover:bg-[#F3B728] text-slate-900 font-bold px-5 py-3 text-sm flex items-center gap-2 shadow-sm transition-transform hover:scale-105"
                            style={HEAD_FONT}
                        >
                            Beli Paket Koin
                            <ArrowUpRight size={16} />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Grid 4 Kartu Saldo Mentor (Tampilan Dompet)          */
/* ------------------------------------------------------------------ */
function GridSaldoMentor({ saldo, onTarikDana }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* 1. Koin Utama */}
            <div className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm flex flex-col transition-all duration-200 hover:border-accent hover:shadow-md">
                <span className="w-10 h-10 rounded-xl bg-lightBg text-secondary flex items-center justify-center">
                    <Wallet size={18} />
                </span>
                <p className="mt-5 text-xs font-bold text-slate-500 tracking-wider uppercase" style={HEAD_FONT}>
                    Koin Utama
                </p>
                <p className="mt-2 text-primary">
                    <span className="text-3xl font-bold">{saldo.utama}</span>{" "}
                    <span className="text-sm text-slate-500">Koin</span>
                </p>
                <p className="mt-auto pt-6 text-sm text-slate-500 leading-relaxed">
                    Hasil top-up uang asli, tidak kedaluwarsa dan tidak dapat dicairkan tunai.
                </p>
            </div>

            {/* 2. Koin Promo Aktif */}
            <div className="bg-lightBg rounded-2xl border border-secondary p-5 shadow-sm flex flex-col transition-all duration-200 hover:shadow-md">
                <span className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center">
                    <Sparkles size={18} />
                </span>
                <p className="mt-5 text-xs font-bold text-slate-500 tracking-wider uppercase" style={HEAD_FONT}>
                    Koin Promo Aktif • FEFO
                </p>
                <p className="mt-2 text-primary">
                    <span className="text-3xl font-bold">{saldo.promo}</span>{" "}
                    <span className="text-sm text-slate-500">Koin</span>
                </p>
                <p className="mt-auto pt-6 text-sm text-slate-500 leading-relaxed">
                    Dipakai otomatis paling awal saat booking, berlaku 90 hari per lot.
                </p>
            </div>

            {/* 3. Koin Tertahan */}
            <div className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm flex flex-col transition-all duration-200 hover:border-accent hover:shadow-md">
                <span className="w-10 h-10 rounded-xl bg-lightBg text-secondary flex items-center justify-center">
                    <Lock size={18} />
                </span>
                <p className="mt-5 text-xs font-bold text-slate-500 tracking-wider uppercase" style={HEAD_FONT}>
                    Koin Tertahan
                </p>
                <p className="mt-2 text-primary">
                    <span className="text-3xl font-bold">{saldo.tertahan}</span>{" "}
                    <span className="text-sm text-slate-500">Koin</span>
                </p>
                <p className="mt-auto pt-6 text-sm text-slate-500 leading-relaxed">
                    Dikunci sementara pada booking aktif dan tidak kedaluwarsa selama ditahan.
                </p>
            </div>

            {/* 4. Pendapatan Mentor */}
            <div className="bg-primary text-white rounded-2xl border border-primary p-5 shadow-sm flex flex-col transition-all duration-200 hover:shadow-md">
                <span className="w-10 h-10 rounded-xl bg-accent text-primary flex items-center justify-center">
                    <Coins size={18} />
                </span>
                <p className="mt-5 text-xs font-bold text-accent tracking-wider uppercase" style={HEAD_FONT}>
                    Pendapatan Mentor
                </p>
                <p className="mt-2">
                    <span className="text-3xl font-bold">{saldo.redeemable}</span>{" "}
                    <span className="text-sm text-white/50">Koin</span>
                </p>
                <div className="mt-3 text-sm leading-relaxed">
                    <p className="font-bold">Setara {formatRupiah(saldo.redeemable * KURS_PER_KOIN)}</p>
                    <p className="text-accent">
                        Payout tertahan: <span className="text-white font-bold">{saldo.payoutTertahan} Koin</span>
                    </p>
                    <p className="text-accent">
                        Minimum tarik: <span className="text-white font-bold">{MIN_TARIK} Koin</span>
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onTarikDana}
                    className="mt-auto rounded-full bg-white text-secondary hover:bg-lightBg font-bold px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                    style={HEAD_FONT}
                >
                    <span className="mt-0">Tarik Dana (Payout)</span>
                    <ArrowUpRight size={16} />
                </button>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Header Payout (judul + RBAC + saldo)                 */
/* ------------------------------------------------------------------ */
function HeaderPayout({ saldo, rbac, onRbac, onKembali }) {
    return (
        <div>
            {/* Selector RBAC */}
            <div className="flex justify-end">
                <div
                    className="rounded-full border border-accent bg-white p-1 flex flex-wrap items-center gap-1"
                    style={HEAD_FONT}
                >
                    <span className="px-3 text-xs font-bold text-slate-500 tracking-wide uppercase">Akses RBAC</span>
                    {RBAC_ITEMS.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => onRbac(item)}
                            className={
                                rbac === item
                                    ? "rounded-full bg-secondary text-white font-bold px-3.5 py-1.5 text-xs shadow-sm transition-all duration-200"
                                    : "rounded-full text-primary font-semibold px-3.5 py-1.5 text-xs hover:bg-lightBg transition-all duration-200"
                            }
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {rbac !== "Mentor" && (
                <p className="mt-2 text-right text-xs text-slate-500 flex items-center justify-end gap-1.5">
                    <AlertCircle size={14} className="text-secondary" />
                    Halaman ini hanya merancang tampilan Mentor. Tampilan {rbac} dikerjakan terpisah.
                </p>
            )}

            {/* Judul */}
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                        UC-12 • Mentor Payout
                    </p>
                    <h1 className="text-3xl md:text-4xl font-semibold text-primary mt-3" style={HEAD_FONT}>
                        Pencairan Dana Mentor
                    </h1>
                    <p className="text-sm text-slate-500 mt-3">
                        Konversi saldo pendapatan menjadi transfer bank atau e-wallet terverifikasi.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={onKembali}
                    className="rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200"
                    style={HEAD_FONT}
                >
                    Kembali ke Dompet
                    <ArrowLeft size={16} />
                </button>
            </div>

            {/* Kartu saldo */}
            <section className="mt-6 bg-primary text-white rounded-3xl p-7 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-0">
                <div className="sm:pr-8 sm:border-r sm:border-white/20">
                    <p className="text-[11px] font-bold text-accent tracking-wider uppercase" style={HEAD_FONT}>
                        saldo_redeemable
                    </p>
                    <p className="mt-3">
                        <span className="text-4xl font-bold">{saldo.redeemable}</span>{" "}
                        <span className="text-lg text-accent">Koin</span>
                    </p>
                    <p className="text-sm mt-2 text-white/90">Setara {formatRupiah(saldo.redeemable * KURS_PER_KOIN)}</p>
                </div>
                <div className="sm:pl-8">
                    <p className="text-[11px] font-bold text-accent tracking-wider uppercase" style={HEAD_FONT}>
                        saldo_payout_tertahan
                    </p>
                    <p className="mt-3">
                        <span className="text-4xl font-bold">{saldo.payoutTertahan}</span>{" "}
                        <span className="text-lg text-accent">Koin</span>
                    </p>
                    <p className="text-sm mt-2 text-white/90">Sedang diproses</p>
                </div>
            </section>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Kartu Rekening Tujuan Aktif                          */
/* ------------------------------------------------------------------ */
function KartuRekening({ rekening, onTambah }) {
    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    <span className="w-10 h-10 shrink-0 rounded-xl bg-lightBg text-secondary flex items-center justify-center mt-1">
                        <Wallet size={18} />
                    </span>
                    <div>
                        <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                            Rekening Tujuan Aktif
                        </p>
                        <h2 className="text-xl font-bold text-primary mt-1" style={HEAD_FONT}>
                            {rekening
                                ? `${rekening.tipe === "bank" ? "Bank Transfer" : "E-Wallet"} • ${rekening.penyedia}`
                                : "Belum ada rekening"}
                        </h2>
                    </div>
                </div>

                {rekening &&
                    (rekening.terverifikasi ? (
                        <span
                            className="rounded-full bg-lightBg text-primary text-xs font-bold px-3 py-1.5 flex items-center gap-1.5 shrink-0"
                            style={HEAD_FONT}
                        >
                            <Check size={14} />
                            Terverifikasi Admin Keuangan
                        </span>
                    ) : (
                        <span
                            className="rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 flex items-center gap-1.5 shrink-0"
                            style={HEAD_FONT}
                        >
                            <Clock size={14} />
                            Menunggu verifikasi
                        </span>
                    ))}
            </div>

            {rekening ? (
                <>
                    <div className="grid grid-cols-[1fr_auto] gap-3 mt-6">
                        <div className="bg-lightBg rounded-xl p-4">
                            <p className="text-xs text-slate-500">Nomor rekening</p>
                            <p className="text-xl text-primary mt-1 tracking-wide">{sensorNomor(rekening.nomor)}</p>
                        </div>
                        <div className="bg-lightBg rounded-xl p-4">
                            <p className="text-xs text-slate-500">Nama Pemilik</p>
                            <p className="text-sm font-bold text-primary mt-2">{rekening.nama}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onTambah}
                        className="mt-4 rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-bold px-4 py-2 text-sm transition-all duration-200"
                        style={HEAD_FONT}
                    >
                        Tambah / Ganti Rekening
                    </button>
                </>
            ) : (
                <div className="mt-6 rounded-xl border border-dashed border-accent bg-[#F8FAF9] p-6 flex flex-col items-center text-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-lightBg text-secondary flex items-center justify-center">
                        <ShieldAlert size={18} />
                    </span>
                    <p className="text-sm font-bold text-primary" style={HEAD_FONT}>
                        Rekening tujuan belum ditambahkan
                    </p>
                    <p className="text-xs text-slate-500 max-w-xs">
                        Tambahkan rekening bank atau e-wallet atas namamu sebelum mengajukan penarikan dana.
                    </p>
                    <button
                        type="button"
                        onClick={onTambah}
                        className="mt-2 rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                        style={HEAD_FONT}
                    >
                        Tambah Rekening
                        <ArrowUpRight size={16} />
                    </button>
                </div>
            )}
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Form Tambah / Ganti Rekening                         */
/* ------------------------------------------------------------------ */
function FormRekening({ onSimpan, fokusSignal, rekeningAda }) {
    const [tipe, setTipe] = useState("bank");
    const [penyedia, setPenyedia] = useState(PENYEDIA.bank[0]);
    const [nomor, setNomor] = useState("");
    const [nama, setNama] = useState(NAMA_MENTOR);
    const [tersimpan, setTersimpan] = useState(false);
    const nomorRef = useRef(null);
    const wadahRef = useRef(null);

    // Fokus ke input nomor saat tombol "Tambah / Ganti Rekening" ditekan
    useEffect(() => {
        if (fokusSignal === 0) return;
        if (wadahRef.current) wadahRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        if (nomorRef.current) nomorRef.current.focus();
    }, [fokusSignal]);

    const ganti = (t) => {
        setTipe(t);
        setPenyedia(PENYEDIA[t][0]);
        setTersimpan(false);
    };

    const bisaSimpan = nomor.trim().length > 0 && nama.trim().length > 0;

    const simpan = () => {
        if (!bisaSimpan) return;
        onSimpan({ tipe, penyedia, nomor, nama: nama.trim(), terverifikasi: false });
        setNomor("");
        setTersimpan(true);
    };

    const inputKelas =
        "w-full rounded-lg border border-accent bg-lightBg px-4 py-3 text-sm font-bold text-primary placeholder:font-semibold placeholder:text-slate-400 focus:border-secondary focus:outline-none transition-all duration-200";

    return (
        <section ref={wadahRef} className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
            <div className="flex items-center gap-3">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-lightBg text-secondary flex items-center justify-center">
                    <ShieldCheck size={18} />
                </span>
                <div>
                    <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                        Bank Account
                    </p>
                    <h2 className="text-xl font-bold text-primary mt-1" style={HEAD_FONT}>
                        Tambah / Ganti Rekening Tujuan
                    </h2>
                </div>
            </div>

            {/* Toggle tipe */}
            <div className="mt-5 rounded-full bg-lightBg p-1 grid grid-cols-2 gap-1" style={HEAD_FONT}>
                {[
                    { id: "bank", label: "Rekening Bank" },
                    { id: "ewallet", label: "E-Wallet" },
                ].map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => ganti(t.id)}
                        className={
                            tipe === t.id
                                ? "rounded-full bg-secondary text-white font-bold py-2 text-sm shadow-sm transition-all duration-200"
                                : "rounded-full text-primary font-bold py-2 text-sm hover:bg-white/60 transition-all duration-200"
                        }
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <label className="block mt-4 text-sm font-bold text-primary" htmlFor="penyedia">
                Penyedia
            </label>
            <select
                id="penyedia"
                value={penyedia}
                onChange={(e) => setPenyedia(e.target.value)}
                className={`${inputKelas} mt-1.5`}
            >
                {PENYEDIA[tipe].map((p) => (
                    <option key={p} value={p}>
                        {p}
                    </option>
                ))}
            </select>

            <label className="block mt-4 text-sm font-bold text-primary" htmlFor="nomor-rekening">
                {tipe === "bank" ? "Nomor Rekening Lengkap" : "Nomor E-Wallet"}
            </label>
            <input
                id="nomor-rekening"
                ref={nomorRef}
                type="text"
                inputMode="numeric"
                value={nomor}
                onChange={(e) => {
                    setNomor(e.target.value.replace(/\D/g, ""));
                    setTersimpan(false);
                }}
                placeholder={tipe === "bank" ? "Masukkan nomor rekening" : "Masukkan nomor e-wallet"}
                className={`${inputKelas} mt-1.5`}
            />
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <Lock size={12} />
                Disimpan terenkripsi AES-256
            </p>

            <label className="block mt-4 text-sm font-bold text-primary" htmlFor="nama-pemilik">
                Nama Pemilik Rekening
            </label>
            <input
                id="nama-pemilik"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className={`${inputKelas} mt-1.5`}
            />
            <p className="text-xs text-slate-500 mt-2">Wajib sama persis dengan nama akun Mentor</p>

            <div className="mt-4 rounded-xl bg-lightBg p-3.5 flex items-start gap-2">
                <AlertCircle size={14} className="text-secondary mt-0.5 shrink-0" />
                <div>
                    <p className="text-xs font-bold text-primary" style={HEAD_FONT}>
                        Aturan PAYOUT-08
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Mengganti rekening membuat data baru yang belum terverifikasi dan tidak mengubah rekening
                        pada payout berjalan.
                    </p>
                </div>
            </div>

            {bisaSimpan ? (
                <button
                    type="button"
                    onClick={simpan}
                    className="mt-4 w-full rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                    style={HEAD_FONT}
                >
                    Simpan Rekening
                </button>
            ) : (
                <button
                    type="button"
                    disabled
                    className="mt-4 w-full rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2.5 text-sm cursor-not-allowed select-none"
                    style={HEAD_FONT}
                >
                    Simpan Rekening
                </button>
            )}

            {tersimpan && (
                <p className="mt-3 text-xs text-secondary flex items-center gap-1.5 font-semibold" style={HEAD_FONT}>
                    <CheckCircle2 size={14} />
                    {rekeningAda
                        ? "Rekening baru tersimpan dan menunggu verifikasi Admin Keuangan."
                        : "Rekening tersimpan."}
                </p>
            )}
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Form Ajukan Penarikan Dana                           */
/* ------------------------------------------------------------------ */
function FormPayout({ saldo, rekening, nominal, onNominal, sukses, onAjukan }) {
    const koin = parseInt(nominal, 10) || 0;
    const { bruto, biaya, bersih } = hitungPayout(koin);

    let galat = null;
    if (nominal !== "" && koin < MIN_TARIK) galat = `Minimum penarikan ${MIN_TARIK} Koin.`;
    else if (koin > saldo.redeemable) galat = `Melebihi saldo tersedia (${saldo.redeemable} Koin).`;

    let blokir = null;
    if (!rekening) blokir = "Tambahkan rekening tujuan terlebih dahulu.";
    else if (!rekening.terverifikasi) blokir = "Rekening baru menunggu verifikasi Admin Keuangan.";

    const bisaAjukan = !sukses && !galat && !blokir && koin >= MIN_TARIK;

    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
            <div className="flex items-center gap-3">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-lightBg text-secondary flex items-center justify-center">
                    <Coins size={18} />
                </span>
                <div>
                    <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                        PayoutRequest
                    </p>
                    <h2 className="text-xl font-bold text-primary mt-1" style={HEAD_FONT}>
                        Ajukan Penarikan Dana
                    </h2>
                </div>
            </div>

            <div className="flex items-center justify-between mt-5">
                <label htmlFor="nominal-koin" className="text-sm font-bold text-primary">
                    Nominal Koin
                </label>
                <span className="text-xs font-bold text-secondary" style={HEAD_FONT}>
                    Minimum {MIN_TARIK} Koin
                </span>
            </div>

            <div
                className={`mt-1.5 flex items-center rounded-lg border bg-lightBg px-4 transition-all duration-200 focus-within:border-secondary ${galat ? "border-red-400" : "border-secondary"
                    } ${sukses ? "opacity-70" : ""}`}
            >
                <input
                    id="nominal-koin"
                    type="text"
                    inputMode="numeric"
                    value={nominal}
                    disabled={sukses}
                    onChange={(e) => onNominal(e.target.value.replace(/\D/g, ""))}
                    placeholder="0"
                    className="flex-1 bg-transparent py-3 text-lg font-bold text-primary focus:outline-none disabled:cursor-not-allowed"
                    style={HEAD_FONT}
                />
                <span className="text-sm font-bold text-secondary" style={HEAD_FONT}>
                    Koin
                </span>
            </div>

            {galat ? (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1.5">
                    <AlertCircle size={13} />
                    {galat}
                </p>
            ) : (
                <p className="mt-2 text-xs text-slate-500">
                    Maksimal satu pengajuan aktif per Mentor • Saldo tersedia {saldo.redeemable} Koin
                </p>
            )}

            {/* Rincian */}
            <div className="mt-4 rounded-xl bg-lightBg p-4">
                <div className="flex items-center justify-between py-2 border-b border-accent/60 text-sm">
                    <span className="text-slate-500">Jumlah Koin Diajukan</span>
                    <span className="font-bold text-primary">{koin} Koin</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-accent/60 text-sm">
                    <span className="text-slate-500">Nominal Bruto</span>
                    <span className="font-bold text-primary">{formatRupiah(bruto)}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-accent/60 text-sm">
                    <span className="text-slate-500">Biaya Administrasi Payout (5%)</span>
                    <span className="font-bold text-red-600">- {formatRupiah(biaya)}</span>
                </div>
                <div className="mt-3 rounded-xl bg-white px-4 py-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">Nominal Bersih Diterima</span>
                    <span className="text-xl font-bold text-secondary" style={HEAD_FONT}>
                        {formatRupiah(bersih)}
                    </span>
                </div>
            </div>

            {blokir && !sukses && (
                <p className="mt-3 text-xs text-amber-800 bg-amber-100 rounded-xl px-3 py-2 flex items-center gap-1.5">
                    <AlertCircle size={14} className="shrink-0" />
                    {blokir}
                </p>
            )}

            {sukses ? (
                <>
                    <button
                        type="button"
                        disabled
                        className="mt-4 w-full rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2.5 text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none"
                        style={HEAD_FONT}
                    >
                        Pengajuan Berhasil Dibuat
                        <Check size={16} />
                    </button>
                    <p
                        className="mt-3 text-xs text-secondary bg-secondary/10 rounded-xl px-3 py-2 flex items-center gap-1.5 font-semibold"
                        style={HEAD_FONT}
                    >
                        <CheckCircle2 size={14} className="shrink-0" />
                        Pengajuan masuk dengan status menunggu_admin dan koin dipindah ke saldo payout tertahan.
                    </p>
                </>
            ) : bisaAjukan ? (
                <button
                    type="button"
                    onClick={() => onAjukan(koin)}
                    className="mt-4 w-full rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                    style={HEAD_FONT}
                >
                    Ajukan Penarikan Dana
                    <ArrowUpRight size={16} />
                </button>
            ) : (
                <button
                    type="button"
                    disabled
                    className="mt-4 w-full rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2.5 text-sm cursor-not-allowed select-none"
                    style={HEAD_FONT}
                >
                    Ajukan Penarikan Dana
                </button>
            )}
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Riwayat Payout                                       */
/* ------------------------------------------------------------------ */
function RiwayatPayout({ data }) {
    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
            <div className="flex items-center gap-3">
                <span className="w-10 h-10 shrink-0 rounded-xl bg-lightBg text-secondary flex items-center justify-center">
                    <Clock size={18} />
                </span>
                <div>
                    <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                        Audit Payout
                    </p>
                    <h2 className="text-xl font-bold text-primary mt-1" style={HEAD_FONT}>
                        Riwayat Payout
                    </h2>
                </div>
            </div>

            <ul className="mt-5">
                {data.map((item, index) => (
                    <li
                        key={item.id}
                        className={`py-3.5 transition-colors duration-200 hover:bg-[#F8FAF9] ${index > 0 ? "border-t border-slate-100" : ""
                            }`}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-sm font-bold text-primary" style={HEAD_FONT}>
                                    {item.id}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">{item.tanggal}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-bold text-primary" style={HEAD_FONT}>
                                    {item.koin} Koin
                                </span>
                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[item.status]}`}
                                    style={HEAD_FONT}
                                >
                                    {item.status}
                                </span>
                            </div>
                        </div>
                        {item.catatan && <p className="mt-2 text-xs text-red-600">{item.catatan}</p>}
                    </li>
                ))}
            </ul>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Halaman utama                                                      */
/* ------------------------------------------------------------------ */
export default function DompetMentorPage({ initialHalaman = "dompet" }) {
    const [halaman, setHalaman] = useState(initialHalaman); // dompet | payout

    useEffect(() => {
        if (initialHalaman) {
            setHalaman(initialHalaman);
        }
    }, [initialHalaman]);

    const [rekening, setRekening] = useState(REKENING_AWAL);
    const [saldo, setSaldo] = useState(SALDO_AWAL);
    const [riwayat, setRiwayat] = useState(RIWAYAT_AWAL);
    const [nominal, setNominal] = useState("100");
    const [sukses, setSukses] = useState(false);
    const [rbac, setRbac] = useState("Mentor");
    const [fokusSignal, setFokusSignal] = useState(0);

    // State untuk Paket Top-Up Mentor
    const [modalTopupTerbuka, setModalTopupTerbuka] = useState(false);
    const [paketTerpilih, setPaketTerpilih] = useState(null);
    const [sisaDetik, setSisaDetik] = useState(WAKTU_BAYAR_AWAL);
    const [statusBayar, setStatusBayar] = useState("pending");
    const paketRef = useRef(null);

    // Timer countdown modal invoice
    useEffect(() => {
        if (!modalTopupTerbuka) return;
        const timer = setInterval(() => {
            setSisaDetik((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [modalTopupTerbuka]);

    const bukaModalTopup = (paket) => {
        setPaketTerpilih(paket);
        setSisaDetik(WAKTU_BAYAR_AWAL);
        setStatusBayar("pending");
        setModalTopupTerbuka(true);
    };

    const tutupModalTopup = () => {
        setModalTopupTerbuka(false);
    };

    const scrollKePaket = () => {
        if (halaman !== "dompet") {
            setHalaman("dompet");
            setTimeout(() => {
                paketRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        } else {
            paketRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const bukaPayout = () => {
        setHalaman("payout");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const kembaliKeDompet = () => {
        setHalaman("dompet");
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const kirimPayout = (koin) => {
        const idBaru = "#PY-9022";
        setSaldo((s) => ({
            ...s,
            redeemable: s.redeemable - koin,
            payoutTertahan: s.payoutTertahan + koin,
        }));
        setRiwayat((r) => [
            { id: idBaru, tanggal: "19 Mei 2026", koin, status: "menunggu_admin", catatan: null },
            ...r,
        ]);
        setSukses(true);
    };

    const resetSemua = () => {
        setHalaman("dompet");
        setRekening(REKENING_AWAL);
        setSaldo(SALDO_AWAL);
        setRiwayat(RIWAYAT_AWAL);
        setNominal("100");
        setSukses(false);
        setRbac("Mentor");
        setModalTopupTerbuka(false);
        setPaketTerpilih(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleRekening = () => {
        setHalaman("payout");
        setRekening((r) => (r ? null : REKENING_AWAL));
    };

    const simulasiSukses = () => {
        if (sukses) return;
        setHalaman("payout");
        setRekening((r) => r || REKENING_AWAL);
        setRekening((r) => (r && !r.terverifikasi ? { ...r, terverifikasi: true } : r));
        setNominal("100");
        kirimPayout(100);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const simpanRekening = (rekeningBaru) => {
        setRekening(rekeningBaru);
    };

    return (
        <div className="min-h-screen bg-lightBg" style={BODY_FONT}>
            <style>{FONT_IMPORT}</style>

            <BarSimulasi
                halaman={halaman}
                rekeningTerisi={Boolean(rekening)}
                sukses={sukses}
                onBukaPayout={bukaPayout}
                onKembali={kembaliKeDompet}
                onToggleRekening={toggleRekening}
                onSimulasiSukses={simulasiSukses}
                onReset={resetSemua}
            />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                {halaman === "dompet" ? (
                    <div className="space-y-6">
                        <BannerKoin onTopUp={scrollKePaket} />
                        <GridSaldoMentor saldo={saldo} onTarikDana={bukaPayout} />
                        <PaketTopUp
                            paketTerpilih={modalTopupTerbuka && paketTerpilih ? paketTerpilih.id : null}
                            onBeli={bukaModalTopup}
                            sectionRef={paketRef}
                        />
                    </div>
                ) : (
                    <div>
                        <HeaderPayout
                            saldo={saldo}
                            rbac={rbac}
                            onRbac={setRbac}
                            onKembali={kembaliKeDompet}
                        />

                        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
                            <div className="space-y-5">
                                <KartuRekening
                                    rekening={rekening}
                                    onTambah={() => setFokusSignal((n) => n + 1)}
                                />
                                <FormPayout
                                    saldo={saldo}
                                    rekening={rekening}
                                    nominal={nominal}
                                    onNominal={setNominal}
                                    sukses={sukses}
                                    onAjukan={kirimPayout}
                                />
                            </div>

                            <div className="space-y-5">
                                <FormRekening
                                    onSimpan={simpanRekening}
                                    fokusSignal={fokusSignal}
                                    rekeningAda={Boolean(rekening)}
                                />
                                <RiwayatPayout data={riwayat} />
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {modalTopupTerbuka && paketTerpilih && (
                <ModalInvoice
                    paket={paketTerpilih}
                    sisaDetik={sisaDetik}
                    status={statusBayar}
                    onTutup={tutupModalTopup}
                    onLanjutBayar={() => setStatusBayar("redirect")}
                />
            )}
        </div>
    );
}