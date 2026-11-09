import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Check,
    Lock,
    ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data contoh                                                         */
/* ------------------------------------------------------------------ */

const ADMIN_USER = {
    name: "Theo Rodriguez",
    role: "admin_keuangan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TheoRodriguez",
};

const INITIAL_ROWS = [
    {
        id: "#PY-9021",
        mentor: "Farhan Akbar",
        namaPemilik: "FARHAN AKBAR",
        bank: "Bank Mandiri",
        rekening: "137-00-1293482-9",
        koin: 100,
        bruto: 100000,
        biaya: 5000,
        bersih: 95000,
        statusRekening: "Belum diverifikasi",
        pengajuan: "18 Mei · 10:30",
        status: "menunggu_admin",
    },
    {
        id: "#PY-9018",
        mentor: "Sarah Amelia",
        namaPemilik: "SARAH AMELIA",
        bank: "Bank BCA",
        rekening: "883-01-2447-16",
        koin: 150,
        bruto: 150000,
        biaya: 7500,
        bersih: 142500,
        statusRekening: "Terverifikasi",
        pengajuan: "18 Mei · 09:12",
        status: "menunggu_admin",
    },
    {
        id: "#PY-9007",
        mentor: "Bima Pratama",
        namaPemilik: "BIMA PRATAMA",
        bank: "Bank BNI",
        rekening: "065-432-1098",
        koin: 200,
        bruto: 200000,
        biaya: 10000,
        bersih: 190000,
        statusRekening: "Terverifikasi",
        pengajuan: "17 Mei · 15:42",
        status: "menunggu_admin",
    },
    {
        id: "#PY-8995",
        mentor: "Nadia Putri",
        namaPemilik: "NADIA PUTRI",
        bank: "Bank BRI",
        rekening: "0021-01-045678-50-3",
        koin: 100,
        bruto: 100000,
        biaya: 5000,
        bersih: 95000,
        statusRekening: "Terverifikasi",
        pengajuan: "17 Mei · 11:06",
        status: "menunggu_admin",
    },
    {
        id: "#PY-8960",
        mentor: "Rizky Maulana",
        namaPemilik: "RIZKY MAULANA",
        bank: "Bank BCA",
        rekening: "770-22-9183-04",
        koin: 120,
        bruto: 120000,
        biaya: 6000,
        bersih: 114000,
        statusRekening: "Terverifikasi",
        pengajuan: "13 Mei · 14:20",
        status: "disetujui_diproses",
    },
    {
        id: "#PY-8912",
        mentor: "Dewi Lestari",
        namaPemilik: "DEWI LESTARI",
        bank: "Bank Mandiri",
        rekening: "141-00-5520917-3",
        koin: 180,
        bruto: 180000,
        biaya: 9000,
        bersih: 171000,
        statusRekening: "Terverifikasi",
        pengajuan: "10 Mei · 08:45",
        status: "berhasil",
    },
    {
        id: "#PY-8871",
        mentor: "Andi Wijaya",
        namaPemilik: "ANDI W SAPUTRA",
        bank: "Bank BNI",
        rekening: "081-776-4420",
        koin: 90,
        bruto: 90000,
        biaya: 4500,
        bersih: 85500,
        statusRekening: "Belum diverifikasi",
        pengajuan: "08 Mei · 16:30",
        status: "ditolak_gagal",
    },
];

const FILTERS = [
    { key: "menunggu_admin", label: "menunggu_admin", showCount: true },
    { key: "disetujui_diproses", label: "disetujui / diproses", showCount: false },
    { key: "berhasil", label: "berhasil", showCount: false },
    { key: "ditolak_gagal", label: "ditolak / gagal", showCount: false },
];

const STATUS_LABEL = {
    menunggu_admin: "menunggu admin",
    disetujui_diproses: "disetujui / diproses",
    berhasil: "berhasil",
    ditolak_gagal: "ditolak / gagal",
};

const TABLE_COLUMNS = [
    { label: "ID Payout", className: "w-[11%]" },
    { label: "Mentor", className: "w-[15%]" },
    { label: "Koin", className: "w-[8%]" },
    { label: "Bruto", className: "w-[12%]" },
    { label: "Biaya 5%", className: "w-[11%]" },
    { label: "Bersih", className: "w-[12%]" },
    { label: "Status Rekening", className: "w-[17%]" },
    { label: "Pengajuan", className: "w-[14%]" },
];

const FIRST_ID = "#PY-9021";

/* ------------------------------------------------------------------ */
/* Helper                                                              */
/* ------------------------------------------------------------------ */

const formatRupiah = (value) => "Rp" + value.toLocaleString("id-ID");

const pad2 = (n) => String(n).padStart(2, "0");

const normalizeName = (name) => name.trim().replace(/\s+/g, " ").toUpperCase();

/* ------------------------------------------------------------------ */
/* Bar Simulasi Presentasi                                             */
/* ------------------------------------------------------------------ */

function SimulationBar({
    showBanner,
    onToggleBanner,
    emptyQueue,
    onToggleEmpty,
    onReset,
}) {
    const btn =
        "rounded-xl border border-accent bg-white text-secondary hover:bg-secondary/10 font-medium px-3 py-1 text-xs transition-colors";

    return (
        <div className="bg-primary text-white px-8 py-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="font-bold">🛠️ Simulasi Presentasi:</span>
            <button type="button" onClick={onToggleBanner} className={btn}>
                {showBanner ? "Sembunyikan Banner" : "Tampilkan Banner"}
            </button>
            <button type="button" onClick={onToggleEmpty} className={btn}>
                {emptyQueue ? "Isi Antrean" : "Kosongkan Antrean"}
            </button>
            <button type="button" onClick={onReset} className={btn}>
                Reset Data
            </button>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Header Admin                                                        */
/* ------------------------------------------------------------------ */

function AdminHeader({ user, onLogout }) {
    return (
        <header className="bg-white border-b border-accent/70 px-6 sm:px-8 py-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white font-bold text-lg shadow-sm">
                    M
                </div>
                <div>
                    <h1 className="text-base font-extrabold text-primary">Portal Admin Keuangan</h1>
                    <p className="text-[11px] text-slate-500 font-medium">Divisi Rekonsiliasi, Payout &amp; Dispute</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right leading-tight">
                    <p className="text-sm font-bold text-primary">{user.name}</p>
                    <p className="text-xs text-slate-500">{user.role}</p>
                </div>
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full border border-accent object-cover bg-lightBg"
                />
                <button
                    type="button"
                    onClick={onLogout}
                    className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-50 focus:outline-none"
                >
                    <ArrowLeft size={13} />
                    Keluar
                </button>
            </div>
        </header>
    );
}

/* ------------------------------------------------------------------ */
/* Header Halaman + Total Menunggu                                     */
/* ------------------------------------------------------------------ */

function PageHeader({ totalMenunggu }) {
    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h2 className="text-3xl font-normal text-primary">Persetujuan Payout</h2>
                <p className="text-sm text-slate-500 mt-2">
                    Validasi rekening, rekonsiliasi, dan eksekusi disbursement Mentor.
                </p>
            </div>

            <div className="rounded-xl bg-secondary px-5 py-4 flex items-center gap-4 shadow-sm shrink-0">
                <span className="text-sm text-accent">Total Menunggu</span>
                <span className="text-3xl font-extrabold text-white leading-none">
                    {pad2(totalMenunggu)}
                </span>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Banner Perhatian Operasional                                        */
/* ------------------------------------------------------------------ */

function OperationalBanner({ onAction }) {
    return (
        <div
            role="alert"
            className="rounded-xl bg-amber-100 border border-amber-300 px-5 py-3 flex items-center justify-between gap-4"
        >
            <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-800 mt-0.5 shrink-0" />
                <div>
                    <p className="text-sm font-bold text-amber-900">Perhatian Operasional</p>
                    <p className="text-sm text-amber-900">
                        Terdapat 1 transaksi Payout berstatus “diproses” lebih dari 3 hari
                        kerja. Segera lakukan rekonsiliasi dengan penyedia pembayaran.
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onAction}
                className="rounded-xl border border-red-400 text-red-500 bg-white hover:bg-red-50 font-bold px-6 py-2 text-sm shrink-0 transition-colors"
            >
                Tindak Lanjut
            </button>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Tabel Antrean Penarikan Dana                                        */
/* ------------------------------------------------------------------ */

function RekeningBadge({ status }) {
    const verified = status === "Terverifikasi";
    return (
        <span
            className={
                "rounded-xl inline-block px-3 py-1 text-xs font-bold " +
                (verified ? "bg-lightBg text-primary" : "bg-amber-100 text-amber-800")
            }
        >
            {status}
        </span>
    );
}

function PayoutQueueTable({
    rows,
    filters,
    activeFilter,
    onFilterChange,
    selectedId,
    onSelectRow,
    counts,
}) {
    return (
        <section className="rounded-xl bg-white border border-slate-200 min-w-0">
            {/* Judul kartu */}
            <div className="px-5 pt-5 pb-4 border-b border-slate-100">
                <p className="text-[11px] font-bold text-secondary tracking-wider uppercase">
                    PayoutRequest Queue
                </p>
                <h3 className="text-xl font-bold text-primary mt-1">
                    Antrean Penarikan Dana
                </h3>
            </div>

            {/* Filter status */}
            <div className="px-5 py-4 flex flex-wrap items-center gap-2">
                {filters.map((f) => {
                    const active = f.key === activeFilter;
                    return (
                        <button
                            key={f.key}
                            type="button"
                            onClick={() => onFilterChange(f.key)}
                            className={
                                "rounded-xl px-4 py-1.5 text-sm font-bold transition-all " +
                                (active
                                    ? "bg-secondary text-white shadow-sm"
                                    : "border border-accent bg-white text-secondary hover:bg-slate-50")
                            }
                        >
                            {f.label}
                            {f.showCount ? ` (${counts[f.key] ?? 0})` : ""}
                        </button>
                    );
                })}
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[820px] table-fixed text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-100">
                            {TABLE_COLUMNS.map((col) => (
                                <th
                                    key={col.label}
                                    className={
                                        "px-4 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wide " +
                                        col.className
                                    }
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={TABLE_COLUMNS.length}
                                    className="px-4 py-12 text-center text-sm text-slate-500 border-t border-accent/60"
                                >
                                    Tidak ada payout pada status ini.
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => {
                                const selected = row.id === selectedId;
                                return (
                                    <tr
                                        key={row.id}
                                        onClick={() => onSelectRow(row.id)}
                                        className={
                                            "cursor-pointer border-t border-accent/60 text-sm text-slate-700 transition-colors " +
                                            (selected ? "bg-lightBg" : "bg-white hover:bg-slate-50")
                                        }
                                    >
                                        <td
                                            className={
                                                "px-4 py-4 font-bold break-words " +
                                                (selected
                                                    ? "text-secondary border-l-4 border-secondary"
                                                    : "text-slate-600 border-l-4 border-transparent")
                                            }
                                        >
                                            {row.id}
                                        </td>
                                        <td className="px-4 py-4">{row.mentor}</td>
                                        <td className="px-4 py-4">{row.koin}</td>
                                        <td className="px-4 py-4">{formatRupiah(row.bruto)}</td>
                                        <td className="px-4 py-4">{formatRupiah(row.biaya)}</td>
                                        <td className="px-4 py-4">{formatRupiah(row.bersih)}</td>
                                        <td className="px-4 py-4">
                                            <RekeningBadge status={row.statusRekening} />
                                        </td>
                                        <td className="px-4 py-4">{row.pengajuan}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Panel Kanan: Eksekusi Payout                                        */
/* ------------------------------------------------------------------ */

function SquareCheckbox({ checked, disabled, onChange, id }) {
    return (
        <span className="relative inline-flex w-4 h-4 shrink-0 mt-0.5">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(e) => onChange(e.target.checked)}
                className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <span
                aria-hidden="true"
                className={
                    "rounded-xl w-4 h-4 border flex items-center justify-center transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-secondary/50 " +
                    (checked
                        ? "bg-secondary border-secondary text-white"
                        : "bg-white border-slate-400")
                }
            >
                {checked && <Check size={12} strokeWidth={3} />}
            </span>
        </span>
    );
}

function ExecutionPanel({
    row,
    isVerified,
    onVerifiedChange,
    reason,
    onReasonChange,
    result,
    onApprove,
    onReject,
}) {
    if (!row) {
        return (
            <aside className="rounded-xl bg-white border border-slate-200 p-5">
                <p className="text-[11px] font-bold text-secondary tracking-wider uppercase">
                    Detail Payout
                </p>
                <h3 className="text-xl font-bold text-primary mt-1">Eksekusi Payout</h3>
                <p className="text-sm text-slate-500 mt-4">
                    Pilih salah satu baris pada antrean untuk melihat detail dan
                    mengeksekusi payout.
                </p>
            </aside>
        );
    }

    const pending = row.status === "menunggu_admin";
    const nameMatch = normalizeName(row.mentor) === normalizeName(row.namaPemilik);
    const canApprove = pending && isVerified;
    const canReject = pending && reason.trim().length > 0;

    const approveClass = canApprove
        ? "rounded-xl bg-secondary hover:brightness-110 text-white font-bold"
        : "rounded-xl bg-slate-200 text-slate-400 font-bold cursor-not-allowed select-none";

    const rejectClass = canReject
        ? "rounded-xl border border-red-400 bg-white hover:bg-red-50 text-red-500 font-bold"
        : "rounded-xl border border-red-400 bg-slate-200 text-slate-400 font-bold cursor-not-allowed select-none";

    return (
        <aside className="rounded-xl bg-white border border-slate-200 p-5">
            {/* Judul */}
            <div className="flex items-start gap-3">
                <span className="rounded-xl w-10 h-10 bg-lightBg flex items-center justify-center text-secondary shrink-0">
                    <ShieldCheck size={18} />
                </span>
                <div>
                    <p className="text-[11px] font-bold text-secondary tracking-wider uppercase">
                        Detail {row.id}
                    </p>
                    <h3 className="text-xl font-bold text-primary mt-0.5">
                        Eksekusi Payout
                    </h3>
                </div>
            </div>

            {/* Validasi nama */}
            <div className="rounded-xl bg-lightBg p-4 mt-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs text-slate-500 uppercase">Nama akun mentor</p>
                        <p className="text-sm font-bold text-primary mt-1 break-words">
                            {row.mentor.toUpperCase()}
                        </p>
                    </div>
                    <ArrowRight size={14} className="text-primary mt-5 shrink-0" />
                    <div className="min-w-0 w-[45%]">
                        <p className="text-xs text-slate-500 uppercase">
                            Nama pemilik rekening
                        </p>
                        <p className="text-sm font-bold text-primary mt-1 break-words">
                            {row.namaPemilik}
                        </p>
                    </div>
                </div>
                <p
                    className={
                        "mt-3 text-xs font-bold flex items-center gap-1.5 " +
                        (nameMatch ? "text-primary" : "text-red-500")
                    }
                >
                    {nameMatch ? <Check size={14} /> : <AlertCircle size={14} />}
                    {nameMatch ? "Nama Cocok" : "Nama Tidak Cocok"}
                </p>
            </div>

            {/* Rekening terdekripsi */}
            <div className="rounded-xl bg-white border border-accent p-4 mt-4">
                <p className="text-sm font-bold text-secondary flex items-center gap-2">
                    <Lock size={14} />
                    Rekening didekripsi untuk Admin Keuangan
                </p>
                <p className="text-2xl font-semibold text-primary mt-3 break-all">
                    {row.rekening}
                </p>
                <p className="text-sm text-slate-500 mt-3">
                    {row.bank} · Akses tercatat di AuditLog
                </p>
            </div>

            {/* Checkbox verifikasi */}
            <label
                htmlFor="verifikasi-rekening"
                className={
                    "rounded-xl bg-lightBg p-4 mt-4 flex items-start gap-3 " +
                    (pending ? "cursor-pointer" : "cursor-not-allowed opacity-80")
                }
            >
                <SquareCheckbox
                    id="verifikasi-rekening"
                    checked={isVerified}
                    disabled={!pending}
                    onChange={onVerifiedChange}
                />
                <span>
                    <span className="block text-sm font-bold text-primary">
                        Verifikasi &amp; tandai rekening ini sah
                    </span>
                    <span className="block text-sm text-slate-600 mt-1">
                        Dapat dipakai ulang oleh Mentor untuk payout berikutnya.
                    </span>
                </span>
            </label>

            {/* Rincian nominal */}
            <div className="rounded-xl bg-primary text-white p-4 mt-4">
                <div className="grid grid-cols-3 gap-3 pb-3 border-b border-white/20">
                    <div>
                        <p className="text-xs text-accent">Koin</p>
                        <p className="text-sm font-bold mt-1">{row.koin}</p>
                    </div>
                    <div>
                        <p className="text-xs text-accent">Bruto</p>
                        <p className="text-sm font-bold mt-1">{formatRupiah(row.bruto)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-accent">Biaya (5%)</p>
                        <p className="text-sm font-bold mt-1">-{formatRupiah(row.biaya)}</p>
                    </div>
                </div>
                <p className="text-xs text-accent mt-3">Transfer Bersih</p>
                <p className="text-2xl font-bold text-accent mt-1">
                    {formatRupiah(row.bersih)}
                </p>
            </div>

            {/* Alasan penolakan */}
            <label
                htmlFor="alasan-penolakan"
                className="block text-sm font-bold text-primary mt-5"
            >
                Alasan Penolakan
            </label>
            <textarea
                id="alasan-penolakan"
                value={reason}
                disabled={!pending}
                onChange={(e) => onReasonChange(e.target.value)}
                placeholder="Wajib diisi jika payout ditolak…"
                rows={3}
                className="rounded-xl w-full mt-2 bg-lightBg border border-accent p-3 text-sm font-semibold text-primary placeholder:text-slate-400 resize-none focus:outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-70"
            />

            {/* Tombol aksi */}
            <div className="mt-4 space-y-2">
                <button
                    type="button"
                    onClick={onApprove}
                    disabled={!canApprove}
                    className={
                        approveClass +
                        " w-full px-4 py-3 text-sm flex items-center justify-center gap-2 transition-all duration-200"
                    }
                >
                    Setujui &amp; Kirim Disbursement
                    <ArrowUpRight size={16} />
                </button>
                <button
                    type="button"
                    onClick={onReject}
                    disabled={!canReject}
                    className={
                        rejectClass +
                        " w-full px-4 py-3 text-sm transition-all duration-200"
                    }
                >
                    Tolak Payout &amp; Kembalikan Koin
                </button>
            </div>

            {/* Pesan status */}
            <div aria-live="polite">
                {result ? (
                    <p className="mt-4 text-sm font-bold text-secondary flex items-start gap-2">
                        <Check size={14} className="mt-1 shrink-0" />
                        <span>{result.text}</span>
                    </p>
                ) : (
                    !pending && (
                        <p className="mt-4 text-sm text-slate-500">
                            Payout ini berstatus “{STATUS_LABEL[row.status]}” dan tidak
                            menunggu tindakan admin.
                        </p>
                    )
                )}
            </div>
        </aside>
    );
}

/* ------------------------------------------------------------------ */
/* Halaman Utama                                                       */
/* ------------------------------------------------------------------ */

export default function AdminFinancePage({ onLogout }) {
    const navigate = useNavigate();
    const handleLogout = onLogout || (() => navigate('/admin/login'));
    const [rows, setRows] = useState(INITIAL_ROWS);
    const [showBanner, setShowBanner] = useState(true);
    const [emptyQueue, setEmptyQueue] = useState(false);
    const [activeFilter, setActiveFilter] = useState("menunggu_admin");
    const [selectedId, setSelectedId] = useState(FIRST_ID);

    // State per-payout agar tiap baris punya centang, alasan, dan hasil sendiri
    const [verifiedMap, setVerifiedMap] = useState({});
    const [reasonMap, setReasonMap] = useState({});
    const [resultMap, setResultMap] = useState({});

    const data = emptyQueue ? [] : rows;

    const counts = useMemo(() => {
        return data.reduce((acc, row) => {
            acc[row.status] = (acc[row.status] || 0) + 1;
            return acc;
        }, {});
    }, [data]);

    const visibleRows = useMemo(
        () => data.filter((row) => row.status === activeFilter),
        [data, activeFilter]
    );

    const selectedRow = data.find((row) => row.id === selectedId) || null;
    const selectedPending = selectedRow?.status === "menunggu_admin";
    const isVerified = selectedRow
        ? selectedPending
            ? !!verifiedMap[selectedRow.id]
            : true
        : false;
    const reason = selectedRow ? reasonMap[selectedRow.id] || "" : "";
    const result = selectedRow ? resultMap[selectedRow.id] : null;

    const updateRow = (id, patch) =>
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

    const handleVerifiedChange = (checked) => {
        if (!selectedRow) return;
        setVerifiedMap((prev) => ({ ...prev, [selectedRow.id]: checked }));
    };

    const handleReasonChange = (value) => {
        if (!selectedRow) return;
        setReasonMap((prev) => ({ ...prev, [selectedRow.id]: value }));
    };

    const handleApprove = () => {
        if (!selectedRow || !selectedPending || !isVerified) return;
        updateRow(selectedRow.id, {
            status: "disetujui_diproses",
            statusRekening: "Terverifikasi",
        });
        setResultMap((prev) => ({
            ...prev,
            [selectedRow.id]: {
                type: "approve",
                text: "Disbursement dikirim. Status berubah menjadi diproses.",
            },
        }));
    };

    const handleReject = () => {
        if (!selectedRow || !selectedPending || reason.trim() === "") return;
        updateRow(selectedRow.id, { status: "ditolak_gagal" });
        setResultMap((prev) => ({
            ...prev,
            [selectedRow.id]: {
                type: "reject",
                text: `Payout ditolak. ${selectedRow.koin} Koin dikembalikan ke saldo redeemable.`,
            },
        }));
    };

    const handleReset = () => {
        setRows(INITIAL_ROWS);
        setShowBanner(true);
        setEmptyQueue(false);
        setActiveFilter("menunggu_admin");
        setSelectedId(FIRST_ID);
        setVerifiedMap({});
        setReasonMap({});
        setResultMap({});
    };

    return (
        <div className="min-h-screen bg-lightBg text-slate-800">
            <SimulationBar
                showBanner={showBanner}
                onToggleBanner={() => setShowBanner((v) => !v)}
                emptyQueue={emptyQueue}
                onToggleEmpty={() => setEmptyQueue((v) => !v)}
                onReset={handleReset}
            />

            <AdminHeader user={ADMIN_USER} onLogout={handleLogout} />

            <main className="px-8 py-7 space-y-5">
                <PageHeader totalMenunggu={counts.menunggu_admin || 0} />

                {showBanner && (
                    <OperationalBanner onAction={() => setActiveFilter("disetujui_diproses")} />
                )}

                <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_400px] gap-5 items-start">
                    <PayoutQueueTable
                        rows={visibleRows}
                        filters={FILTERS}
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                        selectedId={selectedId}
                        onSelectRow={setSelectedId}
                        counts={counts}
                    />

                    <ExecutionPanel
                        row={selectedRow}
                        isVerified={isVerified}
                        onVerifiedChange={handleVerifiedChange}
                        reason={reason}
                        onReasonChange={handleReasonChange}
                        result={result}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                </div>
            </main>
        </div>
    );
}
