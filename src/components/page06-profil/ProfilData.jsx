// src/components/page06-profil/ProfilData.jsx
import { useState } from 'react';
import {
    User,
    Target,
    Lock,
    Pencil,
    Check,
    CheckCircle2,
    X,
    Plus,
    ArrowUpRight,
} from 'lucide-react';

import umrah01 from '../../assets/umrah-01.png';
import umrah02 from '../../assets/umrah-02.png';
import umrah03 from '../../assets/umrah-03.png';
import umrah04 from '../../assets/umrah-04.png';
import umrah05 from '../../assets/umrah-05.png';
import umrah06 from '../../assets/umrah-06.png';
import umrah07 from '../../assets/umrah-07.png';
import umrah08 from '../../assets/umrah-08.png';
import umrah09 from '../../assets/umrah-09.png';
import umrah10 from '../../assets/umrah-10.png';
import umrah11 from '../../assets/umrah-11.png';
import umrah12 from '../../assets/umrah-12.png';

/* =========================================================
   DATA DUMMY
   ========================================================= */

const DATA_AWAL = {
    nama: 'Nadine Amalia',
    email: 'nadine.amalia@umrah.ac.id',
    prodi: 'Teknik Informatika',
    bio: 'Mahasiswi semester 3 yang sedang mendalami matematika dasar dan analisis data. Senang belajar bersama dan memecahkan soal algoritma yang rumit! ✌️',
    avatarId: 1,
    topik: ['Pemrograman Web', 'Desain UI/UX', 'Metodologi Penelitian'],
};

// Statistik khusus role Mentor
const STATISTIK_MENTOR = [
    { id: 'sesi', nilai: '120', label: 'Sesi Selesai' },
    { id: 'rating', nilai: '—', label: 'Belum ada rating' },
    { id: 'topik', nilai: '15', label: 'Topik Dikuasai' },
];

const MAX_BIO = 180;

// 12 foto profil resmi mahasiswa UMRAH Mentlify
const DAFTAR_AVATAR = [
    { id: 1, foto: umrah01, nama: 'Avatar Mahasiswa 01' },
    { id: 2, foto: umrah02, nama: 'Avatar Mahasiswa 02' },
    { id: 3, foto: umrah03, nama: 'Avatar Mahasiswa 03' },
    { id: 4, foto: umrah04, nama: 'Avatar Mahasiswa 04' },
    { id: 5, foto: umrah05, nama: 'Avatar Mahasiswa 05' },
    { id: 6, foto: umrah06, nama: 'Avatar Mahasiswa 06' },
    { id: 7, foto: umrah07, nama: 'Avatar Mahasiswa 07' },
    { id: 8, foto: umrah08, nama: 'Avatar Mahasiswa 08' },
    { id: 9, foto: umrah09, nama: 'Avatar Mahasiswa 09' },
    { id: 10, foto: umrah10, nama: 'Avatar Mahasiswa 10' },
    { id: 11, foto: umrah11, nama: 'Avatar Mahasiswa 11' },
    { id: 12, foto: umrah12, nama: 'Avatar Mahasiswa 12' },
];

/* =========================================================
   KOMPONEN KECIL BANTUAN
   ========================================================= */

function AvatarBulat({ avatarId, ukuran = 'w-12 h-12', bingkai = '' }) {
    const avatar = DAFTAR_AVATAR.find((a) => a.id === avatarId) || DAFTAR_AVATAR[0];
    return (
        <div
            className={`${ukuran} ${bingkai} rounded-full overflow-hidden bg-white shrink-0 flex items-center justify-center shadow-inner`}
        >
            <img
                src={avatar.foto}
                alt={avatar.nama}
                className="h-full w-full object-cover object-center"
            />
        </div>
    );
}

function JudulSeksi({ ikon: Ikon, eyebrow, judul }) {
    return (
        <div className="flex items-center gap-3">
            <div className="bg-lightBg rounded-xl p-2.5 text-secondary">
                <Ikon size={18} />
            </div>
            <div>
                <p className="text-[11px] font-bold text-secondary tracking-widest uppercase">{eyebrow}</p>
                <h3 className="text-lg font-extrabold text-primary leading-tight">{judul}</h3>
            </div>
        </div>
    );
}

function StatistikMentor() {
    return (
        <div className="grid grid-cols-3 divide-x divide-white/20 rounded-2xl border border-white/20 bg-white/10 overflow-hidden">
            {STATISTIK_MENTOR.map((stat) => (
                <div key={stat.id} className="px-4 py-3 text-center min-w-[104px]">
                    <p className="text-2xl font-bold text-white leading-none">{stat.nilai}</p>
                    <p className="text-xs text-accent mt-1.5">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}

/* =========================================================
   SUB-KOMPONEN 1: HeaderProfil
   (saklar MODE AKUN: Mentor / Mentee)
   ========================================================= */

function HeaderProfil({ userRole, onGantiRole, isEditing }) {
    const daftarRole = [
        { id: 'mentor', label: 'Mentor' },
        { id: 'mentee', label: 'Mentee' },
    ];

    return (
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
                <p className="text-[11px] font-bold text-secondary tracking-widest uppercase">
                    Identitas Akun
                </p>
                <h1 className="text-3xl font-extrabold text-primary mt-1">Profil Utama</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Avatar, profil akademik, dan topik bimbingan Anda dalam satu tampilan.
                </p>
            </div>

            {!isEditing && (
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">Mode Akun</span>
                    <div className="flex items-center rounded-full border border-accent bg-white p-1 shadow-sm">
                        {daftarRole.map((role) => {
                            const isAktif = userRole === role.id;
                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => onGantiRole(role.id)}
                                    className={`rounded-full px-5 py-1.5 text-sm font-bold transition-all duration-200 ${
                                        isAktif
                                            ? 'bg-secondary text-white shadow-sm hover:brightness-110'
                                            : 'text-slate-500 hover:text-secondary'
                                    }`}
                                >
                                    {role.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

/* =========================================================
   SUB-KOMPONEN 2: FormBiodata
   (menerima isEditing, onStartEdit, onEndEdit dari induk)
   ========================================================= */

function FormBiodata({ userRole, isEditing, onStartEdit, onEndEdit }) {
    const [profil, setProfil] = useState(DATA_AWAL);
    const [draft, setDraft] = useState(DATA_AWAL);
    const [tampilInputTopik, setTampilInputTopik] = useState(false);
    const [topikBaru, setTopikBaru] = useState('');
    const [tersimpan, setTersimpan] = useState(false);

    const isMentor = userRole === 'mentor';
    const formValid = draft.nama.trim() !== '' && draft.email.trim() !== '' && draft.prodi.trim() !== '';

    const mulaiEdit = () => {
        setDraft(profil);
        setTampilInputTopik(false);
        setTopikBaru('');
        setTersimpan(false);
        if (onStartEdit) onStartEdit();
    };

    const batalEdit = () => {
        setDraft(profil);
        setTampilInputTopik(false);
        setTopikBaru('');
        if (onEndEdit) onEndEdit();
    };

    const simpanPerubahan = () => {
        if (!formValid) return;
        setProfil(draft);
        setTampilInputTopik(false);
        setTopikBaru('');
        if (onEndEdit) onEndEdit();
        setTersimpan(true);
        setTimeout(() => setTersimpan(false), 3000);
    };

    const ubahField = (field, nilai) => setDraft((prev) => ({ ...prev, [field]: nilai }));

    const hapusTopik = (topik) =>
        setDraft((prev) => ({ ...prev, topik: prev.topik.filter((t) => t !== topik) }));

    const tambahTopik = () => {
        const bersih = topikBaru.trim();
        if (bersih === '' || draft.topik.includes(bersih)) {
            setTopikBaru('');
            return;
        }
        setDraft((prev) => ({ ...prev, topik: [...prev.topik, bersih] }));
        setTopikBaru('');
        setTampilInputTopik(false);
    };

    const kelasInputBanner =
        'w-full rounded-lg bg-sky-50 text-slate-700 text-sm px-4 py-2.5 border border-transparent focus:border-accent focus:outline-none transition-all duration-200';

    return (
        <div className="space-y-3">
            {tersimpan && (
                <div className="flex">
                    <span className="rounded-full bg-secondary text-white px-3 py-1 text-xs font-semibold flex items-center gap-1 shadow-sm">
                        <CheckCircle2 size={14} />
                        Perubahan profil berhasil disimpan
                    </span>
                </div>
            )}

            <div className="bg-white rounded-3xl border border-accent/70 shadow-sm overflow-hidden transition-all duration-200">
                {/* ===== BANNER ATAS (HERO) ===== */}
                <div className="relative bg-secondary text-white px-6 py-7 overflow-hidden">
                    <div className="absolute -top-20 -right-12 w-56 h-56 rounded-full border-[32px] border-white/10 pointer-events-none" />

                    <div
                        className={`relative flex flex-col lg:flex-row gap-5 ${isEditing ? 'lg:items-start' : 'lg:items-center'
                            }`}
                    >
                        {/* Avatar */}
                        <AvatarBulat
                            avatarId={isEditing ? draft.avatarId : profil.avatarId}
                            ukuran="w-28 h-28"
                            ukuranIkon={52}
                            bingkai="border-4 border-accent shadow-md"
                        />

                        {/* Kolom tengah: info (baca) / form (edit) */}
                        {!isEditing ? (
                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-accent tracking-widest uppercase">Mentlify #01</p>
                                <h2 className="text-3xl font-light mt-0.5">{profil.nama}</h2>
                                <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <span className="rounded-full bg-lightBg text-secondary px-3 py-1 text-xs font-semibold inline-flex items-center gap-1">
                                        <Check size={12} />
                                        Mahasiswa Terverifikasi
                                    </span>
                                    <span className="text-sm font-semibold">{profil.prodi}</span>
                                </div>
                                <p className="text-sm mt-3 text-white/90">{profil.email}</p>
                            </div>
                        ) : (
                            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-accent mb-1">Nama Lengkap</label>
                                    <input
                                        type="text"
                                        value={draft.nama}
                                        onChange={(e) => ubahField('nama', e.target.value)}
                                        className={kelasInputBanner}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-accent mb-1">Email UMRAH</label>
                                    <input
                                        type="email"
                                        value={draft.email}
                                        onChange={(e) => ubahField('email', e.target.value)}
                                        className={kelasInputBanner}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-accent mb-1">Program Studi</label>
                                    <input
                                        type="text"
                                        value={draft.prodi}
                                        onChange={(e) => ubahField('prodi', e.target.value)}
                                        className={kelasInputBanner}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Kolom kanan: statistik (khusus mentor) + tombol aksi */}
                        <div className="flex flex-col items-stretch lg:items-end gap-3 lg:self-start shrink-0">
                            {isMentor && <StatistikMentor />}

                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={mulaiEdit}
                                    className="self-start lg:self-end rounded-full border border-white/70 text-white bg-white/10 hover:bg-white/20 font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200"
                                >
                                    Edit Profil
                                    <Pencil size={14} />
                                </button>
                            ) : (
                                <div className="flex items-center gap-2 self-start lg:self-end">
                                    <button
                                        type="button"
                                        onClick={batalEdit}
                                        className="rounded-full bg-primary/40 hover:bg-primary/60 text-white font-bold px-5 py-2 text-sm transition-all duration-200"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        onClick={simpanPerubahan}
                                        disabled={!formValid}
                                        className={`rounded-full font-bold px-5 py-2 text-sm transition-all duration-200 ${formValid
                                            ? 'bg-white text-secondary hover:brightness-95 shadow-sm'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed select-none'
                                            }`}
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pemilih avatar (hanya mode edit) */}
                    {isEditing && (
                        <div className="relative mt-5 pt-5 border-t border-white/20 flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="lg:w-44 shrink-0">
                                <p className="text-sm font-bold">Pilih foto avatar</p>
                                <p className="text-xs text-white/80 mt-1">Gunakan salah satu dari 12 foto profil resmi mahasiswa UMRAH.</p>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {DAFTAR_AVATAR.map((avatar) => {
                                    const terpilih = draft.avatarId === avatar.id;
                                    return (
                                        <button
                                            key={avatar.id}
                                            type="button"
                                            onClick={() => ubahField('avatarId', avatar.id)}
                                            aria-label={`Pilih ${avatar.nama}`}
                                            className={`relative rounded-full p-0.5 transition-all duration-200 hover:scale-110 ${
                                                terpilih
                                                    ? 'ring-4 ring-accent shadow-md scale-105'
                                                    : 'opacity-85 hover:opacity-100 hover:ring-2 hover:ring-white/80'
                                            }`}
                                        >
                                            <AvatarBulat avatarId={avatar.id} ukuran="w-12 h-12" />
                                            {terpilih && (
                                                <span className="absolute -top-1 -right-1 rounded-full bg-secondary text-white w-5 h-5 flex items-center justify-center border-2 border-white shadow">
                                                    <Check size={11} strokeWidth={3} />
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* ===== BIO SINGKAT ===== */}
                <div className="px-6 py-6 border-b border-slate-100">
                    <JudulSeksi ikon={User} eyebrow="Tentang Saya" judul="Bio Singkat" />

                    {!isEditing ? (
                        <p className="text-sm md:text-base text-slate-600 mt-4 leading-relaxed">{profil.bio}</p>
                    ) : (
                        <div className="mt-4">
                            <textarea
                                value={draft.bio}
                                maxLength={MAX_BIO}
                                rows={4}
                                onChange={(e) => ubahField('bio', e.target.value)}
                                className="w-full rounded-xl border border-secondary bg-lightBg text-slate-700 text-sm px-4 py-3 focus:outline-none focus:border-secondary resize-none transition-all duration-200"
                            />
                            <p className="text-xs text-slate-500 text-right mt-2">
                                {draft.bio.length}/{MAX_BIO} karakter
                            </p>
                        </div>
                    )}
                </div>

                {/* ===== TOPIK BIMBINGAN ===== */}
                <div className="px-6 py-6">
                    <JudulSeksi ikon={Target} eyebrow="Topik Bimbingan" judul="Topik yang Dikuasai" />

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                        {(isEditing ? draft.topik : profil.topik).map((topik) => (
                            <span
                                key={topik}
                                className="rounded-full bg-secondary text-white px-3.5 py-1.5 text-sm font-semibold inline-flex items-center gap-1.5"
                            >
                                {topik}
                                {isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => hapusTopik(topik)}
                                        aria-label={`Hapus topik ${topik}`}
                                        className="rounded-full hover:bg-white/20 transition-all duration-200"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </span>
                        ))}
                    </div>

                    {isEditing && (
                        <div className="mt-3">
                            {tampilInputTopik ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        autoFocus
                                        value={topikBaru}
                                        placeholder="Nama topik baru"
                                        onChange={(e) => setTopikBaru(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') tambahTopik();
                                        }}
                                        className="rounded-full border border-secondary bg-white px-4 py-1.5 text-sm text-slate-700 focus:outline-none transition-all duration-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={tambahTopik}
                                        className="rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-1.5 text-sm transition-all duration-200 shadow-sm"
                                    >
                                        Tambah
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setTampilInputTopik(true)}
                                    className="rounded-full border border-dashed border-secondary text-secondary bg-white hover:bg-secondary/10 font-bold px-3.5 py-1.5 text-sm inline-flex items-center gap-1.5 transition-all duration-200"
                                >
                                    <Plus size={14} />
                                    Tambah Topik
                                </button>
                            )}
                        </div>
                    )}

                    <p className="text-xs text-slate-500 mt-4">Digunakan untuk rekomendasi sistem.</p>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   SUB-KOMPONEN 3: KartuPengaturan
   ========================================================= */

function KartuPengaturan({ onBukaPengaturan }) {
    const bukaPengaturan = () => {
        if (onBukaPengaturan) {
            onBukaPengaturan();
        } else {
            // fallback bila tidak di-pass props
            alert('TODO: Navigasi ke halaman Pengaturan Akun (dikendalikan oleh ProfilePage.jsx)');
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-accent/70 p-5 shadow-sm hover:border-accent transition-all duration-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <div className="bg-lightBg rounded-xl p-3 text-secondary">
                    <Lock size={18} />
                </div>
                <div>
                    <h3 className="text-base font-bold text-primary">Keamanan Akun</h3>
                    <p className="text-sm text-slate-500 mt-0.5">Kelola kata sandi dan penghapusan akun</p>
                </div>
            </div>

            <button
                type="button"
                onClick={bukaPengaturan}
                className="rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200 shrink-0"
            >
                Buka Pengaturan
                <ArrowUpRight size={14} />
            </button>
        </div>
    );
}

/* =========================================================
   KOMPONEN UTAMA (hanya merakit 3 sub-komponen)
   ========================================================= */

export default function ProfilData({ onBukaPengaturan, userRole: externalRole, onGantiRole }) {
    const [internalRole, setInternalRole] = useState(externalRole || 'mentee'); // 'mentee' | 'mentor'
    const [isEditing, setIsEditing] = useState(false);
    const userRole = externalRole ?? internalRole;

    const gantiRole = (role) => {
        setInternalRole(role);
        if (onGantiRole) onGantiRole(role);
    };

    return (
        <div className="bg-lightBg min-h-screen px-4 py-6 md:px-8">
            <div className="max-w-5xl mx-auto space-y-6">
                <HeaderProfil userRole={userRole} onGantiRole={gantiRole} isEditing={isEditing} />
                <FormBiodata
                    userRole={userRole}
                    isEditing={isEditing}
                    onStartEdit={() => setIsEditing(true)}
                    onEndEdit={() => setIsEditing(false)}
                />
                <KartuPengaturan onBukaPengaturan={onBukaPengaturan} />
            </div>
        </div>
    );
}