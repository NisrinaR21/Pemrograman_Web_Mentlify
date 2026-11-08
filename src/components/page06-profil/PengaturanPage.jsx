// src/components/page06-profil/PengaturanPage.jsx
import { useState, useEffect } from 'react';
import {
    ArrowLeft,
    ArrowRight,
    Lock,
    Eye,
    EyeOff,
    Bell,
    Mail,
    Smartphone,
    ShieldAlert,
    AlertCircle,
    CheckCircle2,
    XCircle,
    Check,
    X,
    Trash2,
} from 'lucide-react';

/* =========================================================
   DATA DUMMY
   ========================================================= */

// Kata sandi dummy awal (hanya untuk simulasi presentasi)
const SANDI_AWAL = 'Mentlify123';

const PREFERENSI_AWAL = {
    emailAktif: true,
    pushAktif: true,
    email: {
        statusSesi: true,
        pengingatSesi: true,
        ringkasanMingguan: false,
    },
    push: {
        pengingatSatuJam: true,
        pesanBaru: true,
        misiStreak: false,
    },
};

const DAFTAR_EMAIL = [
    { id: 'statusSesi', judul: 'Status pengajuan sesi', deskripsi: 'Dikonfirmasi, ditolak, atau dibatalkan oleh mentor.' },
    { id: 'pengingatSesi', judul: 'Pengingat jadwal sesi', deskripsi: 'Dikirim H-1 sebelum sesi bimbingan dimulai.' },
    { id: 'ringkasanMingguan', judul: 'Ringkasan mingguan', deskripsi: 'Rangkuman aktivitas dan rekomendasi mentor setiap pekan.' },
];

const DAFTAR_PUSH = [
    { id: 'pengingatSatuJam', judul: 'Pengingat 1 jam sebelum sesi', deskripsi: 'Notifikasi saat Ruang Sesi akan segera dibuka.' },
    { id: 'pesanBaru', judul: 'Pesan obrolan baru', deskripsi: 'Saat mentor atau mentee mengirim pesan kepada Anda.' },
    { id: 'misiStreak', judul: 'Misi & hari beruntun', deskripsi: 'Pengingat misi harian agar streak tidak terputus.' },
];

const KATA_KONFIRMASI_HAPUS = 'HAPUS';

/* =========================================================
   KOMPONEN KECIL BANTUAN
   ========================================================= */

function KepalaSeksi({ ikon: Ikon, eyebrow, judul, deskripsi, bahaya = false }) {
    return (
        <div className="flex items-start gap-4">
            <div
                className={`rounded-xl p-2.5 shrink-0 ${bahaya ? 'bg-red-50 text-red-500' : 'bg-lightBg text-secondary'
                    }`}
            >
                <Ikon size={18} />
            </div>
            <div className="min-w-0">
                <p
                    className={`text-[11px] font-bold tracking-widest uppercase ${bahaya ? 'text-red-500' : 'text-secondary'
                        }`}
                >
                    {eyebrow}
                </p>
                <h3 className={`text-xl font-extrabold leading-tight mt-0.5 ${bahaya ? 'text-red-500' : 'text-primary'}`}>
                    {judul}
                </h3>
                {deskripsi && <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">{deskripsi}</p>}
            </div>
        </div>
    );
}

function BannerStatus({ jenis, children }) {
    const gaya =
        jenis === 'sukses'
            ? 'bg-secondary/10 border-secondary text-secondary'
            : 'bg-red-50 border-red-400 text-red-500';
    const Ikon = jenis === 'sukses' ? CheckCircle2 : XCircle;
    return (
        <div
            role="status"
            className={`rounded-xl border p-3.5 flex items-start gap-2.5 text-sm font-medium transition-all duration-200 ${gaya}`}
        >
            <Ikon size={18} className="shrink-0 mt-0.5" />
            <div>{children}</div>
        </div>
    );
}

function InputSandi({ id, label, value, onChange, placeholder, error, autoComplete }) {
    const [tampil, setTampil] = useState(false);
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-bold text-primary mb-1.5">
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={tampil ? 'text' : 'password'}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    aria-invalid={error ? 'true' : 'false'}
                    className={`w-full rounded-lg border bg-lightBg px-4 py-2.5 pr-11 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none transition-all duration-200 ${error ? 'border-red-400 focus:border-red-500' : 'border-accent focus:border-secondary'
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setTampil((t) => !t)}
                    aria-label={tampil ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary transition-all duration-200"
                >
                    {tampil ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {error && (
                <p className="text-xs text-red-500 font-medium mt-1.5 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {error}
                </p>
            )}
        </div>
    );
}

function SaklarToggle({ aktif, onUbah, label, disabled = false }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={aktif}
            aria-label={label}
            disabled={disabled}
            onClick={onUbah}
            className={`relative rounded-full w-11 h-6 shrink-0 transition-all duration-200 ${aktif ? 'bg-secondary' : 'bg-slate-300'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:brightness-110'}`}
        >
            <span
                className={`absolute top-0.5 left-0.5 rounded-full bg-white w-5 h-5 shadow-sm transition-all duration-200 ${aktif ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    );
}

/* =========================================================
   SUB-KOMPONEN 1: HeaderPengaturan
   ========================================================= */

function HeaderPengaturan({ onKembali }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <button
                type="button"
                onClick={onKembali}
                className="self-start rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0"
            >
                <ArrowLeft size={14} />
                Kembali ke Profil
            </button>
            <div>
                <p className="text-[11px] font-bold text-secondary tracking-widest uppercase">Pengaturan Akun</p>
                <h1 className="text-3xl font-light text-primary mt-1">Keamanan Akun</h1>
                <p className="text-sm text-slate-500 mt-2">
                    Kelola kata sandi, preferensi notifikasi, dan status akun Mentlify Anda.
                </p>
            </div>
        </div>
    );
}

/* =========================================================
   SUB-KOMPONEN 2: FormGantiSandi
   ========================================================= */

function FormGantiSandi() {
    const [sandiTersimpan, setSandiTersimpan] = useState(SANDI_AWAL);
    const [lama, setLama] = useState('');
    const [baru, setBaru] = useState('');
    const [konfirmasi, setKonfirmasi] = useState('');
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState(null); // null | 'sukses' | 'gagal'
    const [memproses, setMemproses] = useState(false);

    const syarat = [
        { id: 'panjang', label: 'Minimal 8 karakter', terpenuhi: baru.length >= 8 },
        { id: 'huruf', label: 'Mengandung huruf', terpenuhi: /[A-Za-z]/.test(baru) },
        { id: 'angka', label: 'Mengandung angka', terpenuhi: /[0-9]/.test(baru) },
    ];
    const semuaSyaratTerpenuhi = syarat.every((s) => s.terpenuhi);

    const validasi = () => {
        const hasil = {};
        if (!lama) hasil.lama = 'Kata sandi saat ini wajib diisi.';
        else if (lama !== sandiTersimpan) hasil.lama = 'Kata sandi saat ini tidak sesuai.';

        if (!baru) hasil.baru = 'Kata sandi baru wajib diisi.';
        else if (!semuaSyaratTerpenuhi) hasil.baru = 'Kata sandi baru belum memenuhi syarat keamanan.';
        else if (baru === lama) hasil.baru = 'Kata sandi baru tidak boleh sama dengan kata sandi saat ini.';

        if (!konfirmasi) hasil.konfirmasi = 'Konfirmasi kata sandi wajib diisi.';
        else if (konfirmasi !== baru) hasil.konfirmasi = 'Konfirmasi tidak cocok dengan kata sandi baru.';

        return hasil;
    };

    const kirim = (e) => {
        e.preventDefault();
        setStatus(null);
        const hasil = validasi();
        setErrors(hasil);

        if (Object.keys(hasil).length > 0) {
            setStatus('gagal');
            return;
        }

        setMemproses(true);
        setTimeout(() => {
            setSandiTersimpan(baru);
            setLama('');
            setBaru('');
            setKonfirmasi('');
            setErrors({});
            setMemproses(false);
            setStatus('sukses');
        }, 800);
    };

    return (
        <section className="p-6 md:p-8">
            <KepalaSeksi
                ikon={Lock}
                eyebrow="SRS-F-AUTH-06"
                judul="Ganti Kata Sandi"
                deskripsi="Pastikan akun Anda menggunakan kata sandi yang kuat (minimal 8 karakter, mengandung huruf & angka)."
            />

            <form onSubmit={kirim} className="mt-6 md:pl-14" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputSandi
                        id="sandi-lama"
                        label="Kata Sandi Saat Ini"
                        value={lama}
                        onChange={setLama}
                        placeholder="Masukkan kata sandi saat ini"
                        error={errors.lama}
                        autoComplete="current-password"
                    />
                    <InputSandi
                        id="sandi-baru"
                        label="Kata Sandi Baru"
                        value={baru}
                        onChange={setBaru}
                        placeholder="Minimal 8 karakter"
                        error={errors.baru}
                        autoComplete="new-password"
                    />
                    <InputSandi
                        id="sandi-konfirmasi"
                        label="Konfirmasi Kata Sandi Baru"
                        value={konfirmasi}
                        onChange={setKonfirmasi}
                        placeholder="Ulangi kata sandi baru"
                        error={errors.konfirmasi}
                        autoComplete="new-password"
                    />
                </div>

                {/* Daftar syarat kata sandi */}
                <ul className="flex flex-wrap gap-2 mt-4">
                    {syarat.map((s) => (
                        <li
                            key={s.id}
                            className={`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1 transition-all duration-200 ${s.terpenuhi ? 'bg-secondary text-white' : 'bg-slate-200 text-slate-400'
                                }`}
                        >
                            {s.terpenuhi ? <Check size={12} /> : <X size={12} />}
                            {s.label}
                        </li>
                    ))}
                </ul>

                <div className="mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1">
                        {status === 'sukses' && (
                            <BannerStatus jenis="sukses">Kata sandi berhasil diperbarui. Gunakan kata sandi baru saat login berikutnya.</BannerStatus>
                        )}
                        {status === 'gagal' && (
                            <BannerStatus jenis="gagal">Kata sandi belum dapat diperbarui. Periksa kembali isian yang ditandai merah.</BannerStatus>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={memproses}
                        className={
                            memproses
                                ? 'rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm cursor-not-allowed select-none shrink-0'
                                : 'rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm shrink-0'
                        }
                    >
                        {memproses ? 'Memproses...' : 'Perbarui Kata Sandi'}
                    </button>
                </div>
            </form>
        </section>
    );
}

/* =========================================================
   SUB-KOMPONEN 3: PreferensiNotifikasi
   ========================================================= */

function KelompokNotifikasi({ ikon: Ikon, judul, deskripsi, aktifUtama, onUbahUtama, daftar, nilai, onUbahItem }) {
    return (
        <div className="bg-[#F8FAF9] border border-accent/50 rounded-xl p-4 transition-all duration-200">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                    <Ikon size={18} className="text-secondary mt-0.5" />
                    <div>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">{judul}</p>
                        <p className="text-sm font-semibold text-slate-700">{deskripsi}</p>
                    </div>
                </div>
                <SaklarToggle aktif={aktifUtama} onUbah={onUbahUtama} label={`Aktifkan ${judul}`} />
            </div>

            <ul className="mt-3 divide-y divide-slate-200">
                {daftar.map((item) => (
                    <li key={item.id} className="flex items-center justify-between gap-3 py-3">
                        <div>
                            <p className={`text-sm font-semibold ${aktifUtama ? 'text-slate-700' : 'text-slate-400'}`}>{item.judul}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{item.deskripsi}</p>
                        </div>
                        <SaklarToggle
                            aktif={aktifUtama && nilai[item.id]}
                            disabled={!aktifUtama}
                            onUbah={() => onUbahItem(item.id)}
                            label={item.judul}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function PreferensiNotifikasi() {
    const [pref, setPref] = useState(PREFERENSI_AWAL);
    const [tersimpanPref, setTersimpanPref] = useState(PREFERENSI_AWAL);
    const [pesanSimpan, setPesanSimpan] = useState(false);

    const adaPerubahan = JSON.stringify(pref) !== JSON.stringify(tersimpanPref);

    const ubahUtama = (kunci) => setPref((p) => ({ ...p, [kunci]: !p[kunci] }));
    const ubahItem = (kelompok, id) =>
        setPref((p) => ({ ...p, [kelompok]: { ...p[kelompok], [id]: !p[kelompok][id] } }));

    const simpan = () => {
        setTersimpanPref(pref);
        setPesanSimpan(true);
        setTimeout(() => setPesanSimpan(false), 3000);
    };

    const batal = () => {
        setPref(tersimpanPref);
    };

    return (
        <section className="p-6 md:p-8 border-t border-slate-200">
            <KepalaSeksi
                ikon={Bell}
                eyebrow="Notifikasi"
                judul="Preferensi Notifikasi"
                deskripsi="Pilih kabar apa saja yang ingin Anda terima melalui email dan notifikasi push."
            />

            <div className="mt-6 md:pl-14 space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <KelompokNotifikasi
                        ikon={Mail}
                        judul="Email"
                        deskripsi="Terima kabar lewat kotak masuk email"
                        aktifUtama={pref.emailAktif}
                        onUbahUtama={() => ubahUtama('emailAktif')}
                        daftar={DAFTAR_EMAIL}
                        nilai={pref.email}
                        onUbahItem={(id) => ubahItem('email', id)}
                    />
                    <KelompokNotifikasi
                        ikon={Smartphone}
                        judul="Push Notification"
                        deskripsi="Terima kabar langsung di perangkat Anda"
                        aktifUtama={pref.pushAktif}
                        onUbahUtama={() => ubahUtama('pushAktif')}
                        daftar={DAFTAR_PUSH}
                        nilai={pref.push}
                        onUbahItem={(id) => ubahItem('push', id)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        {pesanSimpan && (
                            <span className="rounded-full bg-secondary text-white px-3 py-1 text-xs font-semibold inline-flex items-center gap-1 shadow-sm">
                                <CheckCircle2 size={14} />
                                Preferensi notifikasi tersimpan
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={batal}
                            disabled={!adaPerubahan}
                            className={
                                adaPerubahan
                                    ? 'rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm transition-all duration-200'
                                    : 'rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm cursor-not-allowed select-none'
                            }
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={simpan}
                            disabled={!adaPerubahan}
                            className={
                                adaPerubahan
                                    ? 'rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm'
                                    : 'rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm cursor-not-allowed select-none'
                            }
                        >
                            Simpan Preferensi
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* =========================================================
   SUB-KOMPONEN 4: SesiAkun (Keluar)
   ========================================================= */

function SesiAkun({ onKeluar }) {
    return (
        <section className="p-6 md:p-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <KepalaSeksi
                ikon={ArrowRight}
                eyebrow="Sesi Akun"
                judul="Keluar dari Akun"
                deskripsi="Akhiri sesi akun saat ini dan kembali ke halaman login atau registrasi Mentlify."
            />
            <button
                type="button"
                onClick={onKeluar}
                className="self-start sm:self-center rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0"
            >
                Keluar
                <ArrowRight size={14} />
            </button>
        </section>
    );
}

/* =========================================================
   SUB-KOMPONEN 5: ZonaBahaya
   ========================================================= */

function ZonaBahaya({ statusAkun, onBukaModal, onBatalkanPengajuan }) {
    return (
        <section className="p-6 md:p-8 border-t border-slate-200">
            <KepalaSeksi
                ikon={ShieldAlert}
                eyebrow="SRS-F-ADM-06 • Zona Bahaya"
                judul="Hapus Akun"
                deskripsi="Sesuai regulasi UU PDP, menghapus akun akan menganonimisasi data pribadi Anda. Pastikan Anda tidak memiliki sesi bimbingan aktif atau pengaduan konflik yang sedang berjalan."
                bahaya
            />

            <div className="mt-6 md:pl-14 flex flex-col sm:flex-row gap-3">
                {statusAkun === 'aktif' && (
                    <button
                        type="button"
                        onClick={onBukaModal}
                        className="rounded-full border border-red-400 text-red-500 bg-white hover:bg-red-50 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200"
                    >
                        <Trash2 size={14} />
                        Ajukan Penghapusan Akun
                    </button>
                )}

                {statusAkun === 'dihapus' && (
                    <button
                        type="button"
                        onClick={onBatalkanPengajuan}
                        className="rounded-full border border-red-400 text-red-500 bg-white hover:bg-red-50 font-medium px-4 py-1.5 text-sm transition-all duration-200"
                    >
                        Batalkan Pengajuan
                    </button>
                )}
            </div>
        </section>
    );
}

/* =========================================================
   SUB-KOMPONEN 6: ModalKonfirmasi (Penghapusan Akun)
   ========================================================= */

function ModalKonfirmasi({ sesiAktif, onTutup, onKonfirmasi }) {
    const [teks, setTeks] = useState('');

    useEffect(() => {
        const tekanTombol = (e) => {
            if (e.key === 'Escape') onTutup();
        };
        window.addEventListener('keydown', tekanTombol);
        return () => window.removeEventListener('keydown', tekanTombol);
    }, [onTutup]);

    const bisaLanjut = !sesiAktif && teks === KATA_KONFIRMASI_HAPUS;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4"
            onClick={onTutup}
            role="presentation"
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="judul-modal"
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl border border-accent/70 shadow-md w-full max-w-md p-6"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="rounded-xl p-3 bg-red-50 text-red-500">
                        <Trash2 size={22} />
                    </div>
                    <button
                        type="button"
                        onClick={onTutup}
                        aria-label="Tutup"
                        className="rounded-full w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all duration-200"
                    >
                        <X size={16} />
                    </button>
                </div>

                <h2 id="judul-modal" className="text-xl font-extrabold text-primary mt-4">
                    Ajukan Penghapusan Akun?
                </h2>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Data pribadi Anda akan dianonimisasi dan tindakan ini tidak dapat dibatalkan setelah proses selesai. Riwayat koin yang tersisa tidak dapat dikembalikan.
                </p>

                {sesiAktif && (
                    <div className="mt-4 rounded-xl border border-red-400 bg-red-50 p-3.5 flex items-start gap-2.5 text-sm text-red-500 font-medium">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <p>Anda masih memiliki sesi bimbingan aktif atau pengaduan konflik yang berjalan. Selesaikan terlebih dahulu sebelum melanjutkan.</p>
                    </div>
                )}

                {!sesiAktif && (
                    <div className="mt-4">
                        <label htmlFor="teks-hapus" className="block text-sm font-bold text-primary mb-1.5">
                            Ketik <span className="text-red-500">{KATA_KONFIRMASI_HAPUS}</span> untuk melanjutkan
                        </label>
                        <input
                            id="teks-hapus"
                            type="text"
                            autoFocus
                            value={teks}
                            onChange={(e) => setTeks(e.target.value)}
                            placeholder={KATA_KONFIRMASI_HAPUS}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 tracking-widest focus:border-red-400 focus:outline-none transition-all duration-200"
                        />
                    </div>
                )}

                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
                    <button
                        type="button"
                        onClick={onTutup}
                        className="rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm transition-all duration-200"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        disabled={!bisaLanjut}
                        onClick={onKonfirmasi}
                        className={
                            bisaLanjut
                                ? 'rounded-full font-medium px-4 py-2 text-sm transition-all duration-200 shadow-sm bg-red-500 hover:brightness-110 text-white'
                                : 'rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm cursor-not-allowed select-none'
                        }
                    >
                        Ya, Ajukan Penghapusan
                    </button>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   KOMPONEN UTAMA (merakit semua sub-komponen)
   ========================================================= */

export default function PengaturanPage({ onKembali, onKeluar }) {
    const [statusAkun, setStatusAkun] = useState('aktif'); // 'aktif' | 'dihapus'
    const [bukaModalHapus, setBukaModalHapus] = useState(false);
    const [sesiAktif, setSesiAktif] = useState(false); // simulasi: ada sesi bimbingan aktif
    const [kunciReset, setKunciReset] = useState(0);

    const tutupModal = () => setBukaModalHapus(false);

    const handleKembali = () => {
        if (onKembali) onKembali();
        else alert('TODO: Kembali ke halaman Profil (dikendalikan oleh ProfilePage.jsx)');
    };

    const handleKeluar = () => {
        if (onKeluar) onKeluar();
        else alert('TODO: Proses logout dan arahkan ke halaman login (dikendalikan oleh router/AuthContext)');
    };

    const konfirmasiHapus = () => {
        setStatusAkun('dihapus');
        setBukaModalHapus(false);
    };

    const resetSimulasi = () => {
        setStatusAkun('aktif');
        setBukaModalHapus(false);
        setSesiAktif(false);
        setKunciReset((k) => k + 1);
    };

    const tombolSimulasi = (aktif) =>
        `rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${aktif
            ? 'bg-secondary text-white shadow-sm hover:brightness-110'
            : 'border border-accent bg-white text-secondary hover:bg-slate-50'
        }`;

    return (
        <div className="bg-lightBg min-h-screen px-4 py-6 md:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* ===== BAR SIMULASI PRESENTASI ===== */}
                <div className="rounded-xl border border-dashed border-accent bg-white px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-xs font-bold text-primary">🛠️ Simulasi Presentasi:</span>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pop-up</span>
                        <button type="button" onClick={() => setBukaModalHapus(true)} className={tombolSimulasi(bukaModalHapus)}>
                            Modal Hapus
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sesi Bimbingan</span>
                        <button type="button" onClick={() => setSesiAktif(false)} className={tombolSimulasi(!sesiAktif)}>
                            Tidak Ada
                        </button>
                        <button type="button" onClick={() => setSesiAktif(true)} className={tombolSimulasi(sesiAktif)}>
                            Ada Sesi Aktif
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <button type="button" onClick={resetSimulasi} className={tombolSimulasi(false)}>
                            Reset Semua
                        </button>
                        <span className="text-[10px] text-slate-400">
                            Sandi dummy awal: <span className="font-bold text-slate-500">{SANDI_AWAL}</span>
                        </span>
                    </div>
                </div>

                <HeaderPengaturan onKembali={handleKembali} />

                {statusAkun === 'dihapus' && (
                    <div className="rounded-xl border border-red-400 bg-white p-3.5 flex items-start gap-2.5 text-sm font-medium text-slate-700">
                        <span className="rounded-full bg-red-500 text-white px-3 py-1 text-xs font-semibold flex items-center gap-1 shrink-0">
                            <XCircle size={12} />
                            Penghapusan Diajukan
                        </span>
                        <p className="pt-0.5">Permintaan penghapusan akun sedang diproses. Anda masih dapat membatalkannya dari bagian Zona Bahaya.</p>
                    </div>
                )}

                {/* ===== KARTU PENGATURAN UTAMA ===== */}
                <div className="bg-white rounded-2xl border border-accent/70 shadow-sm overflow-hidden transition-all duration-200 hover:border-accent">
                    <FormGantiSandi key={`sandi-${kunciReset}`} />
                    <PreferensiNotifikasi key={`notif-${kunciReset}`} />
                    <SesiAkun onKeluar={handleKeluar} />
                    <ZonaBahaya
                        statusAkun={statusAkun}
                        onBukaModal={() => setBukaModalHapus(true)}
                        onBatalkanPengajuan={() => setStatusAkun('aktif')}
                    />
                </div>
            </div>

            {bukaModalHapus && (
                <ModalKonfirmasi
                    sesiAktif={sesiAktif}
                    onTutup={tutupModal}
                    onKonfirmasi={konfirmasiHapus}
                />
            )}
        </div>
    );
}