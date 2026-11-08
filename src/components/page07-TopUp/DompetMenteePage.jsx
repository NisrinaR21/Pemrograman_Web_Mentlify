// src/components/page07-dompet/DompetMenteePage.jsx
import { useState, useEffect, useMemo, useRef } from "react";
import {
    Bell,
    ArrowUpRight,
    Coins,
    Clock,
    Calendar,
    Check,
    Sparkles,
    ShieldCheck,
    Wallet,
    X,
    AlertCircle,
    CheckCircle2,
    Inbox,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Font (sesuai Figma: Montserrat untuk judul, Merriweather untuk isi) */
/* ------------------------------------------------------------------ */
const FONT_IMPORT =
    "@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Montserrat:wght@500;600;700;800&display=swap');";
const HEAD_FONT = { fontFamily: "'Montserrat', 'Segoe UI', sans-serif" };
const BODY_FONT = { fontFamily: "'Merriweather', Georgia, serif" };

/* ------------------------------------------------------------------ */
/*  Data dummy                                                         */
/* ------------------------------------------------------------------ */
const KURS_PER_KOIN = 1000;

const NAV_ITEMS = ["Dasbor", "Cari Mentor", "Jadwal Sesi", "Rating", "Profil"];

export const PAKET_LIST = [
    { id: "P10", harga: 10000, utama: 10, bonus: 0, label: null, orderNo: "8821" },
    { id: "P25", harga: 25000, utama: 25, bonus: 2, label: null, orderNo: "8822" },
    { id: "P50", harga: 50000, utama: 50, bonus: 5, label: null, orderNo: "8823" },
    { id: "P100", harga: 100000, utama: 100, bonus: 15, label: "Populer", orderNo: "8824" },
    { id: "P200", harga: 200000, utama: 200, bonus: 40, label: "Best Value", orderNo: "8825" },
];

const LOT_PROMO = [
    {
        id: 1,
        prioritas: "Prioritas dipakai pertama",
        jumlah: 2,
        sumber: "Pengembalian (Refund)",
        masaAktif: "Masa aktif pengembalian: 7 hari",
        sisaHari: 5,
        mendesak: true,
    },
    {
        id: 2,
        prioritas: "Bonus pembelian • Peti Poin",
        jumlah: 15,
        sumber: "Bonus Promo",
        masaAktif: "Masa aktif standar: 90 hari",
        sisaHari: 82,
        mendesak: false,
    },
];

const FILTER_RIWAYAT = [
    "Semua",
    "top_up",
    "bonus_promo",
    "escrow_tahan",
    "escrow_kembali",
    "pendapatan_sesi",
    "payout_berhasil",
    "promo_kedaluwarsa",
];

const RIWAYAT = [
    { id: 1, waktu: "18 Mei 2026 • 19:00", jenis: "escrow_tahan", saldoJenis: "utama + promo", mutasi: -20, rupiah: 20000, sesudah: 117 },
    { id: 2, waktu: "16 Mei 2026 • 12:14", jenis: "bonus_promo", saldoJenis: "promo", mutasi: 15, rupiah: null, sesudah: 17 },
    { id: 3, waktu: "16 Mei 2026 • 12:14", jenis: "top_up", saldoJenis: "utama", mutasi: 100, rupiah: 100000, sesudah: 120 },
    { id: 4, waktu: "12 Mei 2026 • 20:05", jenis: "pendapatan_sesi", saldoJenis: "redeemable", mutasi: 16, rupiah: 16000, sesudah: 340 },
    { id: 5, waktu: "10 Mei 2026 • 09:30", jenis: "escrow_kembali", saldoJenis: "utama", mutasi: 20, rupiah: 20000, sesudah: 20 },
    { id: 6, waktu: "03 Mei 2026 • 16:45", jenis: "payout_berhasil", saldoJenis: "redeemable", mutasi: -100, rupiah: 100000, sesudah: 324 },
    { id: 7, waktu: "01 Mei 2026 • 00:01", jenis: "promo_kedaluwarsa", saldoJenis: "promo", mutasi: -3, rupiah: null, sesudah: 2 },
];

const SALDO_TOTAL = 117;
const SALDO_PROMO = 17;
const SALDO_UTAMA = SALDO_TOTAL - SALDO_PROMO;

export const WAKTU_BAYAR_AWAL = 23 * 3600 + 45 * 60 + 10; // 23:45:10

/* ------------------------------------------------------------------ */
/*  Helper                                                             */
/* ------------------------------------------------------------------ */
const formatRupiah = (angka) =>
    "Rp " + Number(angka).toLocaleString("id-ID");

const formatDetik = (total) => {
    const detik = Math.max(0, total);
    const j = String(Math.floor(detik / 3600)).padStart(2, "0");
    const m = String(Math.floor((detik % 3600) / 60)).padStart(2, "0");
    const d = String(detik % 60).padStart(2, "0");
    return `${j}:${m}:${d}`;
};

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Bar Simulasi Presentasi                              */
/* ------------------------------------------------------------------ */
function BarSimulasi({
    filterAktif,
    onFilter,
    onBukaModal,
    onTutupModal,
    onPercepatTimer,
    onKosongkanRiwayat,
    onResetSemua,
    modalTerbuka,
    riwayatKosong,
}) {
    const tombolBase =
        "rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 whitespace-nowrap";
    const tombolNormal = `${tombolBase} border border-accent bg-white text-secondary hover:bg-secondary/10`;
    const tombolAktif = `${tombolBase} bg-secondary text-white shadow-sm hover:brightness-110`;

    return (
        <div
            className="bg-white border-b border-accent/70 px-4 py-2 flex flex-wrap items-center gap-2 text-xs text-primary"
            style={HEAD_FONT}
        >
            <span className="font-bold mr-1">🛠️ Simulasi Presentasi:</span>

            <button type="button" className={modalTerbuka ? tombolAktif : tombolNormal} onClick={() => onBukaModal(PAKET_LIST[0])}>
                Modal Invoice (P10)
            </button>
            <button type="button" className={tombolNormal} onClick={() => onBukaModal(PAKET_LIST[3])}>
                Modal Invoice (P100)
            </button>
            <button type="button" className={tombolNormal} onClick={onPercepatTimer} disabled={!modalTerbuka}>
                Timer → 00:00:05
            </button>
            <button type="button" className={tombolNormal} onClick={onTutupModal}>
                Tutup Modal
            </button>

            <span className="mx-1 text-slate-300">|</span>

            <button type="button" className={filterAktif === "top_up" ? tombolAktif : tombolNormal} onClick={() => onFilter("top_up")}>
                Filter top_up
            </button>
            <button type="button" className={filterAktif === "escrow_tahan" ? tombolAktif : tombolNormal} onClick={() => onFilter("escrow_tahan")}>
                Filter escrow_tahan
            </button>
            <button type="button" className={riwayatKosong ? tombolAktif : tombolNormal} onClick={onKosongkanRiwayat}>
                Riwayat Kosong
            </button>

            <span className="mx-1 text-slate-300">|</span>

            <button type="button" className={tombolNormal} onClick={onResetSemua}>
                Reset
            </button>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Banner Koin                                          */
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

                    <div className="flex flex-wrap items-center gap-3 mt-5" style={HEAD_FONT}>
                        <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold">
                            Total saldo: {SALDO_TOTAL} Koin
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                            {SALDO_UTAMA} Utama
                        </span>
                        <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
                            {SALDO_PROMO} Promo
                        </span>
                    </div>
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
/*  Sub-komponen: Urutan Pemakaian Koin Promo (FEFO)                   */
/* ------------------------------------------------------------------ */
function UrutanPromo() {
    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-primary" style={HEAD_FONT}>
                        Urutan Pemakaian Koin Promo
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Sistem memakai lot dengan masa aktif terpendek terlebih dahulu.
                    </p>
                </div>
                <span
                    className="rounded-full bg-lightBg text-secondary text-sm font-bold px-4 py-2"
                    style={HEAD_FONT}
                >
                    {SALDO_PROMO} Koin Aktif
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                {LOT_PROMO.map((lot, index) => (
                    <div
                        key={lot.id}
                        className="bg-[#F8FAF9] border border-accent/50 rounded-xl p-4 flex items-center justify-between gap-3 transition-all duration-200 hover:border-secondary"
                    >
                        <div className="flex items-center gap-3 min-w-0">
                            <span
                                className="bg-secondary text-white rounded-xl w-10 h-10 shrink-0 flex items-center justify-center text-sm font-bold"
                                style={HEAD_FONT}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                                <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                                    {lot.prioritas}
                                </p>
                                <p className="text-base font-bold text-primary mt-0.5">
                                    {lot.jumlah} Koin • {lot.sumber}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">{lot.masaAktif}</p>
                            </div>
                        </div>

                        <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 shrink-0 ${lot.mendesak ? "bg-amber-100 text-amber-800" : "bg-lightBg text-secondary"
                                }`}
                            style={HEAD_FONT}
                        >
                            {lot.mendesak ? <Clock size={14} /> : <Calendar size={14} />}
                            Kedaluwarsa {lot.sisaHari} hari lagi
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Paket Top-Up                                         */
/* ------------------------------------------------------------------ */
export function PaketTopUp({ paketTerpilih, onBeli, sectionRef }) {
    return (
        <section
            ref={sectionRef}
            className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm scroll-mt-4"
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                        TopUpPackage
                    </p>
                    <h2 className="text-xl md:text-2xl font-bold text-primary mt-1" style={HEAD_FONT}>
                        Pilih Paket Top-Up
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Bonus masuk sebagai Koin Promo dan digunakan dengan aturan FEFO.
                    </p>
                </div>
                <span
                    className="rounded-full bg-lightBg text-secondary text-sm font-bold px-4 py-2 flex items-center gap-1.5"
                    style={HEAD_FONT}
                >
                    <ShieldCheck size={16} />
                    Pembayaran Aman
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
                {PAKET_LIST.map((paket) => {
                    const aktif = paketTerpilih === paket.id || paket.label === "Populer";
                    const total = paket.utama + paket.bonus;
                    return (
                        <div
                            key={paket.id}
                            className={`relative bg-[#F8FAF9] rounded-xl p-4 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${aktif
                                    ? "border-2 border-secondary"
                                    : "border border-accent/50 hover:border-secondary"
                                }`}
                        >
                            {paket.label && (
                                <span
                                    className="absolute -top-3 right-3 rounded-full bg-secondary text-white text-xs font-bold px-3 py-1 shadow-sm"
                                    style={HEAD_FONT}
                                >
                                    {paket.label}
                                </span>
                            )}

                            <p className="text-xs font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                                Paket {paket.id}
                            </p>
                            <p className="text-lg text-primary mt-3">{formatRupiah(paket.harga)}</p>

                            <p className="mt-4 text-primary">
                                <span className="text-3xl font-bold">{total}</span>{" "}
                                <span className="text-sm text-slate-500">Total Koin</span>
                            </p>

                            <ul className="mt-4 space-y-2 text-sm text-slate-700">
                                <li className="flex items-center gap-2">
                                    <Check size={16} className="text-secondary" />
                                    {paket.utama} Koin Utama
                                </li>
                                <li className={`flex items-center gap-2 ${paket.bonus === 0 ? "text-slate-400" : ""}`}>
                                    <Sparkles size={16} className="text-secondary" />
                                    {paket.bonus} Bonus Promo
                                </li>
                            </ul>

                            <button
                                type="button"
                                onClick={() => onBeli(paket)}
                                className="mt-4 w-full rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                                style={HEAD_FONT}
                            >
                                Beli Paket
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Tabel Riwayat Transaksi (Ledger)                     */
/* ------------------------------------------------------------------ */
function TabelRiwayat({ data, filterAktif, onFilter }) {
    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm">
            <p className="text-[11px] font-bold text-secondary tracking-wider uppercase" style={HEAD_FONT}>
                Append-only Ledger
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-primary mt-1" style={HEAD_FONT}>
                Riwayat Transaksi
            </h2>
            <p className="text-sm text-slate-500 mt-2">
                Catatan tidak dapat diubah atau dihapus setelah dibuat.
            </p>

            {/* Pill filter */}
            <div className="flex flex-wrap gap-2 mt-4" style={HEAD_FONT}>
                {FILTER_RIWAYAT.map((f) => {
                    const aktif = filterAktif === f;
                    return (
                        <button
                            key={f}
                            type="button"
                            onClick={() => onFilter(f)}
                            className={
                                aktif
                                    ? "rounded-full bg-secondary text-white font-semibold px-4 py-1.5 text-sm shadow-sm transition-all duration-200 hover:brightness-110"
                                    : "rounded-full border border-accent bg-white text-secondary hover:bg-slate-50 font-semibold px-4 py-1.5 text-sm transition-all duration-200"
                            }
                        >
                            {f}
                        </button>
                    );
                })}
            </div>

            {/* Tabel */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-accent/50">
                <table className="w-full min-w-[760px] text-sm text-left">
                    <thead>
                        <tr className="bg-lightBg text-slate-500 text-[11px] uppercase tracking-wider" style={HEAD_FONT}>
                            <th className="px-5 py-3.5 font-bold">Tanggal / Jam</th>
                            <th className="px-5 py-3.5 font-bold">Jenis Transaksi</th>
                            <th className="px-5 py-3.5 font-bold">Jenis Saldo</th>
                            <th className="px-5 py-3.5 font-bold">Mutasi Koin</th>
                            <th className="px-5 py-3.5 font-bold">Nominal Rupiah</th>
                            <th className="px-5 py-3.5 font-bold">Saldo Sesudah</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((baris) => {
                            const masuk = baris.mutasi > 0;
                            return (
                                <tr
                                    key={baris.id}
                                    className="border-t border-slate-100 hover:bg-[#F8FAF9] transition-colors duration-200"
                                >
                                    <td className="px-5 py-3.5 text-slate-700 whitespace-nowrap">{baris.waktu}</td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className="rounded-full bg-lightBg text-secondary text-xs font-bold px-3 py-1"
                                            style={HEAD_FONT}
                                        >
                                            {baris.jenis}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-700">{baris.saldoJenis}</td>
                                    <td
                                        className={`px-5 py-3.5 font-bold ${masuk ? "text-secondary" : "text-red-600"}`}
                                        style={HEAD_FONT}
                                    >
                                        {masuk ? "+" : ""}
                                        {baris.mutasi}
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-700 whitespace-nowrap">
                                        {baris.rupiah === null ? "—" : formatRupiah(baris.rupiah)}
                                    </td>
                                    <td className="px-5 py-3.5 font-bold text-slate-800 whitespace-nowrap">
                                        {baris.sesudah} Koin
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {data.length === 0 && (
                    <div className="flex flex-col items-center gap-2 py-10 text-slate-500">
                        <Inbox size={28} className="text-accent" />
                        <p className="text-sm font-semibold text-primary" style={HEAD_FONT}>
                            Belum ada transaksi
                        </p>
                        <p className="text-xs text-center px-4">
                            Transaksi akan muncul di sini setelah kamu membeli paket atau memesan sesi.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/*  Sub-komponen: Modal Invoice Pending                                */
/* ------------------------------------------------------------------ */
export function ModalInvoice({ paket, sisaDetik, status, onTutup, onLanjutBayar }) {
    const kedaluwarsa = sisaDetik <= 0;
    const diproses = status === "redirect";

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onTutup();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onTutup]);

    const badge = kedaluwarsa
        ? { teks: "Payment: expired", kelas: "bg-red-500 text-white", titik: "bg-white" }
        : diproses
            ? { teks: "Payment: diproses", kelas: "bg-secondary text-white", titik: "bg-white" }
            : { teks: "Payment: pending", kelas: "bg-amber-100 text-amber-800", titik: "bg-amber-500" };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm"
            onClick={onTutup}
            role="dialog"
            aria-modal="true"
            aria-label="Invoice pembayaran"
        >
            <div
                className="relative bg-white rounded-3xl border border-accent/70 shadow-xl w-full max-w-md p-7"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onTutup}
                    aria-label="Tutup"
                    className="absolute top-5 right-5 rounded-full w-9 h-9 border border-accent text-primary flex items-center justify-center hover:bg-slate-50 transition-all duration-200"
                >
                    <X size={16} />
                </button>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold inline-flex items-center gap-1.5 ${badge.kelas}`}
                    style={HEAD_FONT}
                >
                    <span className={`w-1.5 h-1.5 rounded-full ${badge.titik}`} />
                    {badge.teks}
                </span>

                <div className="mt-5 w-14 h-14 rounded-xl bg-secondary text-white flex items-center justify-center shadow-sm">
                    <Wallet size={26} />
                </div>

                <p className="mt-5 text-[11px] font-bold text-slate-500 tracking-wider uppercase" style={HEAD_FONT}>
                    Order ID
                </p>
                <p className="text-3xl font-extrabold text-primary mt-2" style={HEAD_FONT}>
                    #ORD-2026-{paket.orderNo}
                </p>

                <div className="mt-5 bg-lightBg rounded-xl py-3 grid grid-cols-3 text-center">
                    <div className="px-2">
                        <p className="text-xs text-slate-500">Paket</p>
                        <p className="text-sm font-bold text-primary mt-1" style={HEAD_FONT}>
                            {paket.id}
                        </p>
                    </div>
                    <div className="px-2 border-x border-accent">
                        <p className="text-xs text-slate-500">Nominal</p>
                        <p className="text-sm font-bold text-primary mt-1" style={HEAD_FONT}>
                            {formatRupiah(paket.harga)}
                        </p>
                    </div>
                    <div className="px-2">
                        <p className="text-xs text-slate-500">Total</p>
                        <p className="text-sm font-bold text-primary mt-1" style={HEAD_FONT}>
                            {paket.utama + paket.bonus} Koin
                        </p>
                    </div>
                </div>

                <div
                    className={`mt-4 rounded-xl p-3.5 flex items-start gap-2.5 border ${kedaluwarsa
                            ? "bg-red-50 border-red-200 text-red-700"
                            : "bg-amber-100/60 border-amber-200 text-amber-800"
                        }`}
                >
                    {kedaluwarsa ? <AlertCircle size={16} className="mt-0.5" /> : <Clock size={16} className="mt-0.5" />}
                    <div>
                        <p className="text-sm">{kedaluwarsa ? "Waktu pembayaran habis" : "Sisa waktu bayar"}</p>
                        <p className="text-lg font-bold mt-0.5" style={HEAD_FONT}>
                            {kedaluwarsa ? "Silakan buat pesanan baru" : formatDetik(sisaDetik)}
                        </p>
                    </div>
                </div>

                {kedaluwarsa || diproses ? (
                    <button
                        type="button"
                        disabled
                        className="mt-4 w-full rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm cursor-not-allowed select-none"
                        style={HEAD_FONT}
                    >
                        {kedaluwarsa ? "Invoice Kedaluwarsa" : "Mengarahkan ke Payment Gateway…"}
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onLanjutBayar}
                        className="mt-4 w-full rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                        style={HEAD_FONT}
                    >
                        Lanjut ke Payment Gateway
                        <ArrowUpRight size={16} />
                    </button>
                )}

                <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                    {diproses ? (
                        <CheckCircle2 size={14} className="text-secondary shrink-0" />
                    ) : (
                        <ShieldCheck size={14} className="shrink-0" />
                    )}
                    Saldo otomatis bertambah melalui webhook unik bertanda tangan.
                </p>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Halaman utama                                                      */
/* ------------------------------------------------------------------ */
export default function DompetMenteePage() {
    const [paketTerpilih, setPaketTerpilih] = useState(null); // paket di modal
    const [modalTerbuka, setModalTerbuka] = useState(false);
    const [sisaDetik, setSisaDetik] = useState(WAKTU_BAYAR_AWAL);
    const [statusBayar, setStatusBayar] = useState("pending"); // pending | redirect
    const [filterAktif, setFilterAktif] = useState("Semua");
    const [riwayatKosong, setRiwayatKosong] = useState(false);
    const paketRef = useRef(null);

    // Timer hitung mundur saat modal terbuka
    useEffect(() => {
        if (!modalTerbuka) return undefined;
        const timer = setInterval(() => {
            setSisaDetik((s) => (s > 0 ? s - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [modalTerbuka]);

    const dataRiwayat = useMemo(() => {
        if (riwayatKosong) return [];
        if (filterAktif === "Semua") return RIWAYAT;
        return RIWAYAT.filter((r) => r.jenis === filterAktif);
    }, [filterAktif, riwayatKosong]);

    const bukaModal = (paket) => {
        setPaketTerpilih(paket);
        setSisaDetik(WAKTU_BAYAR_AWAL);
        setStatusBayar("pending");
        setModalTerbuka(true);
    };

    const tutupModal = () => setModalTerbuka(false);

    const pilihFilter = (f) => {
        setRiwayatKosong(false);
        setFilterAktif(f);
    };

    const scrollKePaket = () => {
        if (paketRef.current) {
            paketRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const resetSemua = () => {
        setModalTerbuka(false);
        setPaketTerpilih(null);
        setSisaDetik(WAKTU_BAYAR_AWAL);
        setStatusBayar("pending");
        setFilterAktif("Semua");
        setRiwayatKosong(false);
    };

    return (
        <div className="min-h-screen bg-lightBg" style={BODY_FONT}>
            <style>{FONT_IMPORT}</style>

            <BarSimulasi
                filterAktif={filterAktif}
                onFilter={pilihFilter}
                onBukaModal={bukaModal}
                onTutupModal={tutupModal}
                onPercepatTimer={() => setSisaDetik(5)}
                onKosongkanRiwayat={() => setRiwayatKosong((v) => !v)}
                onResetSemua={resetSemua}
                modalTerbuka={modalTerbuka}
                riwayatKosong={riwayatKosong}
            />

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
                <BannerKoin onTopUp={scrollKePaket} />
                <UrutanPromo />
                <PaketTopUp
                    paketTerpilih={modalTerbuka && paketTerpilih ? paketTerpilih.id : null}
                    onBeli={bukaModal}
                    sectionRef={paketRef}
                />
                <TabelRiwayat
                    data={dataRiwayat}
                    filterAktif={riwayatKosong ? "Semua" : filterAktif}
                    onFilter={pilihFilter}
                />
            </main>

            {modalTerbuka && paketTerpilih && (
                <ModalInvoice
                    paket={paketTerpilih}
                    sisaDetik={sisaDetik}
                    status={statusBayar}
                    onTutup={tutupModal}
                    onLanjutBayar={() => setStatusBayar("redirect")}
                />
            )}
        </div>
    );
}