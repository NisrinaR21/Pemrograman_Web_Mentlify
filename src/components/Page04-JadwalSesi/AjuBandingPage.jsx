import { useState } from 'react';
import {
    ArrowLeft,
    Check,
    Clock,
    FileText,
    Lock,
    ShieldCheck,
    UploadCloud,
    Video,
    AlertCircle,
    Bell,
    ArrowUpRight,
    Sparkles,
} from 'lucide-react';

export default function AjuBandingPage({ onBack, onBackToJadwal }) {
    // Step: 1 = Form Sebelum Unggah, 2 = Unggah Bukti, 3 = Peninjauan Admin, 4 = Putusan Keluar
    const [step, setStep] = useState(2); // default ke step 2 sesuai gambar 1 user
    const [jenisKonflik, setJenisKonflik] = useState('Ketidakhadiran');
    const [kronologi, setKronologi] = useState(
        'Mentor tidak hadir pada ruang sesi setelah ditunggu selama 15 menit.'
    );
    const [simulasiPutusan, setSimulasiPutusan] = useState('distribusi6040'); // 'distribusi6040' default putusan
    const [uploadingItem, setUploadingItem] = useState({
        nama: 'rekaman-layar-sesi.png',
        info: 'PNG • 1,8 MB dari 2,6 MB',
        progress: 68,
    });
    const [readyFiles, setReadyFiles] = useState([
        {
            id: 1,
            nama: 'riwayat-panggilan.pdf',
            tipe: 'PDF • 820 KB',
            deskripsi: 'Riwayat waktu masuk ruang pertemuan.',
        },
    ]);
    const [clarificationSent, setClarificationSent] = useState(false);

    const handleUploadClick = () => {
        // Simulasi tambah file bukti baru
        if (readyFiles.length >= 10) return;
        const newFile = {
            id: Date.now(),
            nama: `tangkapan-layar-${readyFiles.length + 1}.png`,
            tipe: 'PNG • 1,2 MB',
            deskripsi: 'Bukti waktu dan panggilan ruang pertemuan.',
        };
        setReadyFiles((prev) => [...prev, newFile]);
    };

    return (
        <div className="min-h-screen bg-lightBg pb-16 font-sans">
            <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
                {/* BAR ATAS: Tombol Kembali di kiri (selaras semua page) & Info Booking di kanan */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <button
                        type="button"
                        onClick={onBack || onBackToJadwal}
                        className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-white px-4 py-2 text-xs font-bold text-secondary shadow-sm transition-all hover:bg-secondary/10"
                    >
                        <ArrowLeft size={14} />
                        Kembali ke Ruang Tunggu
                    </button>

                    <span className="text-xs font-bold text-slate-500">
                        ID Sesi Bimbingan: <strong className="text-primary">#BK-2026-089</strong>
                    </span>
                </div>

                {/* STEPPER HORIZONTAL (4 LANGKAH) */}
                <nav aria-label="Progres Pengaduan" className="mb-6 rounded-2xl border border-accent/70 bg-white p-2.5 shadow-sm">
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {/* Step 1 */}
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition-all ${
                                step === 1
                                    ? 'bg-secondary text-white shadow-sm'
                                    : step > 1
                                    ? 'text-primary hover:bg-slate-50'
                                    : 'text-slate-400'
                            }`}
                        >
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                    step > 1
                                        ? 'bg-emerald-500 text-white'
                                        : step === 1
                                        ? 'bg-white text-secondary'
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                {step > 1 ? <Check size={14} strokeWidth={3} /> : '01'}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-bold leading-tight">Sebelum Unggah</p>
                                <p className="truncate text-[10px] opacity-80">Lengkapi pengaduan</p>
                            </div>
                        </button>

                        {/* Step 2 */}
                        <button
                            type="button"
                            onClick={() => setStep(2)}
                            className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition-all ${
                                step === 2
                                    ? 'bg-secondary text-white shadow-sm'
                                    : step > 2
                                    ? 'text-primary hover:bg-slate-50'
                                    : 'text-slate-400'
                            }`}
                        >
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                    step > 2
                                        ? 'bg-emerald-500 text-white'
                                        : step === 2
                                        ? 'bg-white text-secondary'
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                {step > 2 ? <Check size={14} strokeWidth={3} /> : '02'}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-bold leading-tight">Unggah Bukti</p>
                                <p className="truncate text-[10px] opacity-80">Kirim dokumen</p>
                            </div>
                        </button>

                        {/* Step 3 */}
                        <button
                            type="button"
                            onClick={() => setStep(3)}
                            className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition-all ${
                                step === 3
                                    ? 'bg-secondary text-white shadow-sm'
                                    : step > 3
                                    ? 'text-primary hover:bg-slate-50'
                                    : 'text-slate-400'
                            }`}
                        >
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                    step > 3
                                        ? 'bg-emerald-500 text-white'
                                        : step === 3
                                        ? 'bg-white text-secondary'
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                {step > 3 ? <Check size={14} strokeWidth={3} /> : '03'}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-bold leading-tight">Peninjauan Admin</p>
                                <p className="truncate text-[10px] opacity-80">Verifikasi bukti</p>
                            </div>
                        </button>

                        {/* Step 4 */}
                        <button
                            type="button"
                            onClick={() => setStep(4)}
                            className={`flex items-center gap-2.5 rounded-xl p-2 text-left transition-all ${
                                step === 4
                                    ? 'bg-secondary text-white shadow-sm'
                                    : 'text-slate-400'
                            }`}
                        >
                            <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                    step === 4
                                        ? 'bg-white text-secondary'
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                04
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-xs font-bold leading-tight">Putusan Keluar</p>
                                <p className="truncate text-[10px] opacity-80">Hasil final</p>
                            </div>
                        </button>
                    </div>
                </nav>

                {/* ==============================================================
                    LANGKAH 1: SEBELUM UNGGAH (PILIH JENIS KONFLIK & KRONOLOGI)
                   ============================================================== */}
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="rounded-3xl bg-primary p-6 text-white shadow-md sm:p-8">
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                                • Langkah 1 dari 4
                            </span>
                            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-accent">
                                Pengaduan Sesi
                            </p>
                            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                                Ceritakan Masalah Bimbinganmu
                            </h2>
                            <p className="mt-2 text-xs text-white/80 sm:text-sm">
                                Pilih kategori permasalahan yang terjadi dan ceritakan kronologi secara ringkas.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm">
                            <label className="mb-2 block text-sm font-bold text-primary">Jenis Konflik</label>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {['Ketidakhadiran', 'Sesi Tidak Sesuai', 'Kendala Teknis Parah'].map((k) => (
                                    <button
                                        key={k}
                                        type="button"
                                        onClick={() => setJenisKonflik(k)}
                                        className={`rounded-2xl border p-4 text-left transition-all ${
                                            jenisKonflik === k
                                                ? 'border-secondary bg-secondary/10'
                                                : 'border-accent bg-lightBg hover:border-secondary/40'
                                        }`}
                                    >
                                        <p className="text-sm font-bold text-primary">{k}</p>
                                        <p className="mt-1 text-xs text-slate-500">
                                            {k === 'Ketidakhadiran'
                                                ? 'Pihak terlapor tidak masuk ruang sesi.'
                                                : k === 'Sesi Tidak Sesuai'
                                                ? 'Materi atau waktu tidak sesuai janji.'
                                                : 'Koneksi atau media sesi putus.'}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            <label className="mb-2 mt-5 block text-sm font-bold text-primary">Kronologi Singkat</label>
                            <textarea
                                rows={4}
                                value={kronologi}
                                onChange={(e) => setKronologi(e.target.value)}
                                className="w-full rounded-2xl border border-accent bg-lightBg p-3 text-sm text-slate-800 focus:border-secondary focus:outline-none"
                                placeholder="Jelaskan kronologi kejadian secara objektif..."
                            />

                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:brightness-110"
                                >
                                    Lanjut ke Unggah Bukti
                                    <ArrowUpRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==============================================================
                    LANGKAH 2: UNGGAH BUKTI PENGADUAN (GAMBAR 1)
                   ============================================================== */}
                {step === 2 && (
                    <div className="space-y-6">
                        {/* Dark Banner */}
                        <div className="relative rounded-3xl bg-primary p-6 text-white shadow-md sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="max-w-xl">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                                        • Draft tersimpan
                                    </span>
                                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-accent">
                                        DOKUMEN PENDUKUNG
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Unggah bukti pengaduan
                                    </h2>
                                    <p className="mt-2 text-xs text-white/80 sm:text-sm">
                                        Sertakan bukti yang memperjelas kronologi. Berkas belum dikirim ke admin sampai Anda menekan tombol konfirmasi.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:w-64">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
                                        PROGRES PENGADUAN
                                    </p>
                                    <p className="mt-1 text-xl font-extrabold text-white">2 dari 3 langkah</p>
                                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                                        <div className="h-full w-2/3 rounded-full bg-[#66D6AE]" />
                                    </div>
                                    <p className="mt-2 text-[11px] text-white/70">
                                        Kategori dan kronologi telah tersimpan
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Layout 2 Kolom Bawah */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* Kolom Kiri: Dokumen Pendukung */}
                            <div className="space-y-4 lg:col-span-8">
                                <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                                BUKTI PENGADUAN
                                            </p>
                                            <h3 className="text-xl font-extrabold text-primary flex items-center gap-2">
                                                <ShieldCheck size={20} className="text-secondary" />
                                                Dokumen pendukung
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Maksimal 10 berkas, masing-masing hingga 5 MB.
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-lightBg px-3 py-1 text-xs font-bold text-slate-600 border border-accent/60">
                                            {readyFiles.length + 1} / 10 Bukti
                                        </span>
                                    </div>

                                    {/* Upload Dropzone */}
                                    <div
                                        onClick={handleUploadClick}
                                        className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-accent bg-lightBg/50 p-7 text-center transition-all hover:border-secondary hover:bg-lightBg"
                                    >
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white shadow-sm">
                                            <UploadCloud size={24} />
                                        </div>
                                        <p className="mt-3 text-sm font-bold text-primary">
                                            Unggah atau tarik berkas ke sini
                                        </p>
                                        <p className="mt-1 text-xs text-slate-400">
                                            PDF, JPG, atau PNG · Klik untuk menambah simulasi berkas
                                        </p>
                                    </div>

                                    {/* Uploading progress item */}
                                    <div className="mt-4 rounded-2xl border border-accent/60 bg-[#F8FAF9] p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-white">
                                                <Video size={18} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="truncate text-xs font-bold text-primary">
                                                        {uploadingItem.nama}
                                                    </p>
                                                    <span className="text-[11px] font-bold text-secondary flex items-center gap-1">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                                                        Mengunggah {uploadingItem.progress}%
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-slate-400 mt-0.5">{uploadingItem.info}</p>
                                                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                                                    <div
                                                        className="h-full rounded-full bg-secondary transition-all"
                                                        style={{ width: `${uploadingItem.progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* File yang siap dikirim */}
                                    <div className="mt-5">
                                        <div className="flex items-center justify-between pb-2 text-xs font-bold text-slate-500 border-b border-slate-100">
                                            <span>Siap dikirim</span>
                                            <span className="text-emerald-600">Terverifikasi lokal</span>
                                        </div>
                                        <ul className="mt-2 space-y-2">
                                            {readyFiles.map((f) => (
                                                <li
                                                    key={f.id}
                                                    className="flex items-center justify-between rounded-xl border border-accent/40 bg-lightBg/50 p-3"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-xs font-bold text-red-600">
                                                            PDF
                                                        </span>
                                                        <div>
                                                            <p className="text-xs font-bold text-primary">{f.nama}</p>
                                                            <p className="text-[11px] text-slate-500">
                                                                {f.tipe} · {f.deskripsi}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                                                        <Check size={12} strokeWidth={3} /> Siap
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Kolom Kanan: Periksa Sebelum Mengirim */}
                            <div className="space-y-4 lg:col-span-4">
                                <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm">
                                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                                        Belum dikirim
                                    </span>
                                    <h3 className="mt-3 text-lg font-extrabold text-primary">
                                        Periksa sebelum mengirim
                                    </h3>

                                    <dl className="mt-4 divide-y divide-slate-100 text-xs">
                                        <div className="flex justify-between py-2.5">
                                            <dt className="text-slate-500">Jenis konflik</dt>
                                            <dd className="font-bold text-primary">{jenisKonflik}</dd>
                                        </div>
                                        <div className="flex justify-between py-2.5">
                                            <dt className="text-slate-500">Bukti siap</dt>
                                            <dd className="font-bold text-primary">{readyFiles.length + 1} berkas</dd>
                                        </div>
                                        <div className="flex justify-between py-2.5">
                                            <dt className="text-slate-500">Dana ditahan</dt>
                                            <dd className="font-bold text-secondary text-sm">20 Koin</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-4 flex items-start gap-2 rounded-xl bg-lightBg p-3 text-xs text-slate-600">
                                        <Lock size={16} className="shrink-0 text-slate-400 mt-0.5" />
                                        <p>
                                            Setelah dikirim, bukti tidak dapat dihapus atau diganti tanpa permintaan admin.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep(3)}
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                                    >
                                        Kirim Pengaduan ke Admin
                                        <ArrowUpRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==============================================================
                    LANGKAH 3: PENINJAUAN ADMIN (GAMBAR 2)
                   ============================================================== */}
                {step === 3 && (
                    <div className="space-y-6">
                        {/* Dark Banner */}
                        <div className="relative rounded-3xl bg-primary p-6 text-white shadow-md sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="max-w-xl">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                                        • Sedang ditinjau
                                    </span>
                                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-accent">
                                        PENGADUAN
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Admin sedang memeriksa bukti
                                    </h2>
                                    <p className="mt-2 text-xs text-white/80 sm:text-sm">
                                        Pengaduan telah dikunci. Dana escrow tidak akan bergerak sampai putusan final diterbitkan.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:w-64">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                                        <Clock size={12} /> BATAS SLA · 3 HARI KERJA WIB
                                    </p>
                                    <p className="mt-1 text-base font-bold text-white">Selasa, 23:59:59 WIB</p>
                                    <p className="mt-1 text-[11px] text-white/70">
                                        Estimasi tersisa 1 hari 8 jam
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Banner Permintaan Klarifikasi Admin */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                            <div className="flex items-start gap-3">
                                <Bell size={18} className="text-amber-700 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold text-amber-900">
                                        Permintaan klarifikasi admin
                                    </p>
                                    <p className="text-xs text-amber-800 mt-0.5">
                                        Mohon pastikan tangkapan layar menampilkan jam perangkat. Permintaan klarifikasi tidak menghentikan perhitungan SLA.
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setClarificationSent(true)}
                                className="shrink-0 rounded-full border border-secondary bg-white px-4 py-1.5 text-xs font-bold text-secondary shadow-sm hover:bg-secondary/10"
                            >
                                {clarificationSent ? '✓ Klarifikasi Terkirim' : 'Tambahkan Klarifikasi'}
                            </button>
                        </div>

                        {/* Layout 2 Kolom */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* Kiri: Linimasa Pemeriksaan */}
                            <div className="space-y-4 lg:col-span-7">
                                <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                        LINIMASA PEMERIKSAAN
                                    </p>
                                    <h3 className="text-xl font-extrabold text-primary mt-1">Linimasa</h3>

                                    <div className="mt-6 space-y-4 text-xs">
                                        {/* Item 1 */}
                                        <div className="flex items-start gap-3.5">
                                            <div className="flex flex-col items-center">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 shadow-sm">
                                                    <Check size={13} strokeWidth={3} />
                                                </span>
                                                <div className="w-0.5 h-12 bg-emerald-500 mt-1" />
                                            </div>
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                                    <p className="font-bold text-primary">Pengaduan diterima</p>
                                                    <span className="text-[11px] text-slate-400">18 Mei · 20:22 WIB</span>
                                                </div>
                                                <p className="text-slate-500 mt-1 leading-relaxed">
                                                    Validasi awal dan penguncian escrow berhasil.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Item 2 */}
                                        <div className="flex items-start gap-3.5">
                                            <div className="flex flex-col items-center">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 shadow-sm">
                                                    <Check size={13} strokeWidth={3} />
                                                </span>
                                                <div className="w-0.5 h-12 bg-secondary mt-1" />
                                            </div>
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                                    <p className="font-bold text-primary">Bukti diverifikasi</p>
                                                    <span className="text-[11px] text-slate-400">19 Mei · 09:14 WIB</span>
                                                </div>
                                                <p className="text-slate-500 mt-1 leading-relaxed">
                                                    Dua dokumen lolos pemeriksaan integritas berkas.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Item 3 */}
                                        <div className="flex items-start gap-3.5">
                                            <div className="flex flex-col items-center">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-white font-bold text-[10px] shrink-0 shadow-sm">
                                                    03
                                                </span>
                                                <div className="w-0.5 h-12 bg-slate-200 mt-1" />
                                            </div>
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                                    <p className="font-bold text-secondary">Analisis petugas</p>
                                                    <span className="text-[11px] font-semibold text-secondary">Sedang berlangsung</span>
                                                </div>
                                                <p className="text-slate-600 mt-1 leading-relaxed">
                                                    SessionLog dibandingkan dengan kronologi dan bukti.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Item 4 */}
                                        <div className="flex items-start gap-3.5 opacity-60">
                                            <div className="flex flex-col items-center">
                                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-500 font-bold text-[10px] shrink-0">
                                                    04
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0 pt-0.5">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                                                    <p className="font-bold text-slate-700">Putusan final</p>
                                                    <span className="text-[11px] text-slate-400">Belum dimulai</span>
                                                </div>
                                                <p className="text-slate-500 mt-1 leading-relaxed">
                                                    Hasil keputusan dan distribusi escrow.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Kanan: SessionLog & Bukti Terkunci */}
                            <div className="space-y-4 lg:col-span-5">
                                <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                                        SESSIONLOG
                                    </p>
                                    <h4 className="text-sm font-bold text-primary flex items-center gap-1.5 mt-0.5">
                                        <Clock size={14} className="text-secondary" />
                                        Rekaman Sistem
                                    </h4>

                                    <dl className="mt-3 divide-y divide-slate-100 text-xs">
                                        <div className="flex justify-between py-2">
                                            <dt className="text-slate-500">Check-in pelapor</dt>
                                            <dd className="font-bold text-emerald-600">19:01 · Hadir</dd>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <dt className="text-slate-500">Check-in terlapor</dt>
                                            <dd className="font-bold text-red-500">Tidak ditemukan</dd>
                                        </div>
                                        <div className="flex justify-between py-2">
                                            <dt className="text-slate-500">Status OTP</dt>
                                            <dd className="font-semibold text-slate-600">Dinonaktifkan</dd>
                                        </div>
                                    </dl>

                                    <div className="mt-4 rounded-xl border border-accent/40 bg-lightBg p-3.5">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck size={16} className="text-secondary" />
                                            <span className="text-xs font-bold text-primary">BUKTI TERKUNCI</span>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-700 mt-1">2 dokumen diterima</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">
                                            Hash dan waktu unggah telah dicatat pada AuditLog.
                                        </p>
                                    </div>

                                    {/* Tombol Simulasikan Putusan Admin */}
                                    <button
                                        type="button"
                                        onClick={() => setStep(4)}
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-secondary py-3 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
                                    >
                                        Simulasikan Putusan Admin
                                        <ArrowUpRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ==============================================================
                    LANGKAH 4: PUTUSAN KELUAR (GAMBAR 3, 4, 5)
                   ============================================================== */}
                {step === 4 && (
                    <div className="space-y-6">
                        {/* Dark Banner */}
                        <div className="relative rounded-3xl bg-primary p-6 text-white shadow-md sm:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="max-w-xl">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                                        • Putusan diterbitkan
                                    </span>
                                    <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-accent">
                                        KEPUTUSAN FINAL
                                    </p>
                                    <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                                        Aju Banding telah selesai
                                    </h2>
                                    <p className="mt-2 text-xs text-white/80 sm:text-sm">
                                        Putusan tercatat permanen dalam AuditLog dan distribusi escrow diproses otomatis.
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:w-64">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-accent flex items-center gap-1.5">
                                        <ShieldCheck size={14} className="text-[#66D6AE]" />
                                        DITETAPKAN OLEH
                                    </p>
                                    <p className="mt-1 text-base font-bold text-white">Admin Aju Banding</p>
                                    <p className="mt-1 text-[11px] text-white/70">
                                        20 Mei 2026 · 14:32 WIB
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Layout 2 Kolom Putusan */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                            {/* Kiri: Hasil Putusan */}
                            <div className="space-y-4 lg:col-span-7">
                                <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm">
                                    {/* Hasil 1: Refund 100% (Gambar 3) */}
                                    {simulasiPutusan === 'refund100' && (
                                        <>
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                                                ✓ Pengaduan diterima
                                            </span>
                                            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-secondary">
                                                REFUND PENUH
                                            </p>
                                            <h3 className="text-2xl font-extrabold text-primary">
                                                Refund 100% kepada pelapor
                                            </h3>

                                            <div className="mt-5 grid grid-cols-2 gap-3">
                                                <div className="rounded-2xl border border-accent/60 bg-lightBg p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>Pelapor</span>
                                                        <span className="font-bold text-emerald-600">100%</span>
                                                    </div>
                                                    <p className="mt-1 text-2xl font-extrabold text-primary">20 Koin</p>
                                                </div>
                                                <div className="rounded-2xl border border-accent/60 bg-lightBg p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>Pihak terlapor</span>
                                                        <span className="font-bold text-slate-400">0%</span>
                                                    </div>
                                                    <p className="mt-1 text-2xl font-extrabold text-slate-400">0 Koin</p>
                                                </div>
                                            </div>

                                            <div className="mt-5 rounded-2xl border border-accent/60 bg-[#F8FAF9] p-4 text-xs text-slate-700">
                                                <p className="font-bold text-primary flex items-center gap-1.5">
                                                    <ShieldCheck size={16} className="text-secondary" />
                                                    Dasar pertimbangan admin
                                                </p>
                                                <p className="mt-1 text-slate-600 leading-relaxed">
                                                    Bukti waktu dan SessionLog menunjukkan pihak terlapor tidak hadir hingga batas toleransi berakhir.
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {/* Hasil 2: Distribusi 60/40 (Gambar 5) */}
                                    {simulasiPutusan === 'distribusi6040' && (
                                        <>
                                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                                                ✓ Pengaduan diterima sebagian
                                            </span>
                                            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-secondary">
                                                DISTRIBUSI PROPORSIONAL
                                            </p>
                                            <h3 className="text-2xl font-extrabold text-primary">
                                                Escrow dibagi secara proporsional
                                            </h3>

                                            <div className="mt-5 grid grid-cols-2 gap-3">
                                                <div className="rounded-2xl border border-accent/60 bg-lightBg p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>Pelapor</span>
                                                        <span className="font-bold text-secondary">60%</span>
                                                    </div>
                                                    <p className="mt-1 text-2xl font-extrabold text-primary">12 Koin</p>
                                                </div>
                                                <div className="rounded-2xl border border-accent/60 bg-lightBg p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>Pihak terlapor</span>
                                                        <span className="font-bold text-secondary">40%</span>
                                                    </div>
                                                    <p className="mt-1 text-2xl font-extrabold text-primary">8 Koin</p>
                                                </div>
                                            </div>

                                            <div className="mt-5 rounded-2xl border border-accent/60 bg-[#F8FAF9] p-4 text-xs text-slate-700">
                                                <p className="font-bold text-primary flex items-center gap-1.5">
                                                    <ShieldCheck size={16} className="text-secondary" />
                                                    Dasar pertimbangan admin
                                                </p>
                                                <p className="mt-1 text-slate-600 leading-relaxed">
                                                    Kedua pihak terbukti hadir, namun sesi terhenti akibat kendala teknis bersama setelah sebagian materi tersampaikan.
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    {/* Hasil 3: Pengaduan Ditolak (Gambar 4) */}
                                    {simulasiPutusan === 'tolak' && (
                                        <>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                                                ✓ Bukti tidak mencukupi
                                            </span>
                                            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-red-500">
                                                PENGADUAN DITOLAK
                                            </p>
                                            <h3 className="text-2xl font-extrabold text-primary">
                                                Pembayaran sesi tetap diteruskan
                                            </h3>

                                            <div className="mt-5 grid grid-cols-2 gap-3">
                                                <div className="rounded-2xl border border-accent/60 bg-lightBg p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>Pelapor</span>
                                                        <span className="font-bold text-slate-400">0%</span>
                                                    </div>
                                                    <p className="mt-1 text-2xl font-extrabold text-slate-400">0 Koin</p>
                                                </div>
                                                <div className="rounded-2xl border border-accent/60 bg-lightBg p-4">
                                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                                        <span>Pihak terlapor</span>
                                                        <span className="font-bold text-secondary">80%</span>
                                                    </div>
                                                    <p className="mt-1 text-2xl font-extrabold text-primary">16 Koin</p>
                                                </div>
                                            </div>

                                            <div className="mt-5 rounded-2xl border border-accent/60 bg-[#F8FAF9] p-4 text-xs text-slate-700">
                                                <p className="font-bold text-primary flex items-center gap-1.5">
                                                    <ShieldCheck size={16} className="text-secondary" />
                                                    Dasar pertimbangan admin
                                                </p>
                                                <p className="mt-1 text-slate-600 leading-relaxed">
                                                    SessionLog membuktikan sesi berjalan dan OTP valid. Bukti yang diajukan tidak menunjukkan pelanggaran layanan.
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Kanan: Tindak Lanjut Otomatis */}
                            <div className="space-y-4 lg:col-span-5">
                                <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                        TINDAK LANJUT OTOMATIS
                                    </p>
                                    <h3 className="text-lg font-extrabold text-primary mt-1">
                                        Apa yang terjadi selanjutnya?
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {simulasiPutusan === 'refund100'
                                            ? 'Dana escrow dikembalikan ke sumber pembayaran dan pelanggaran kehadiran dicatat.'
                                            : simulasiPutusan === 'distribusi6040'
                                            ? 'Dana dibagi berdasarkan durasi layanan terverifikasi tanpa pencatatan pelanggaran.'
                                            : 'Escrow dicairkan setelah komisi platform dan pengaduan ditutup tanpa sanksi.'}
                                    </p>

                                    <dl className="mt-5 divide-y divide-slate-100 text-xs">
                                        <div className="flex justify-between py-2.5">
                                            <dt className="text-slate-500 flex items-center gap-1.5">
                                                <Clock size={14} className="text-secondary" /> Distribusi escrow
                                            </dt>
                                            <dd className="font-bold text-primary">Diproses</dd>
                                        </div>
                                        <div className="flex justify-between py-2.5">
                                            <dt className="text-slate-500 flex items-center gap-1.5">
                                                <Bell size={14} className="text-secondary" /> Notifikasi pihak terkait
                                            </dt>
                                            <dd className="font-bold text-primary">Terkirim</dd>
                                        </div>
                                        <div className="flex justify-between py-2.5">
                                            <dt className="text-slate-500 flex items-center gap-1.5">
                                                <Lock size={14} className="text-secondary" /> AuditLog keputusan
                                            </dt>
                                            <dd className="font-bold text-primary">Terkunci</dd>
                                        </div>
                                    </dl>

                                    {/* Tombol Kembali ke Jadwal (di kiri, selaras dengan semua tombol kembali) */}
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            onClick={onBackToJadwal || onBack}
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-secondary/50 bg-white py-2.5 text-xs font-bold text-secondary shadow-sm transition-all hover:bg-secondary/10"
                                        >
                                            <ArrowLeft size={14} />
                                            Kembali ke Jadwal
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

