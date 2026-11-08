// src/components/page04-cari-mentor/CariMentorPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    ChevronDown,
    Sparkles,
    BadgeCheck,
    Check,
    Star,
    Bookmark,
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    X,
    Clock,
    Calendar,
    ShieldCheck,
    Lock,
    AlertCircle,
    SearchX,
    Code,
    Headphones,
    Palette,
    Microscope,
    Globe,
    BookOpen,
    Calculator,
    Camera,
    Rocket,
    Music,
    GraduationCap,
    User,
} from 'lucide-react';

/* =========================================================
   KONSTANTA & DATA DUMMY
   ========================================================= */

const MENTOR_PER_HALAMAN = 6;
const KOIN_PROMO = 5; // koin promo yang dimiliki pengguna (dummy)
const SALDO_CUKUP = 50; // saldo utama pengguna (dummy)
const SALDO_KURANG = 10; // dipakai untuk simulasi saldo tidak cukup

const DAFTAR_TOPIK = ['Semua Topik', 'UI/UX', 'Product Design', 'Frontend', 'Data', 'Penelitian'];

const DAFTAR_HARI = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Tanggal dummy untuk tiap hari (mengikuti referensi desain)
const HARI_TANGGAL = {
    Senin: { singkat: 'Sen', tanggal: '12 Mei' },
    Selasa: { singkat: 'Sel', tanggal: '13 Mei' },
    Rabu: { singkat: 'Rab', tanggal: '14 Mei' },
    Kamis: { singkat: 'Kam', tanggal: '15 Mei' },
    Jumat: { singkat: 'Jum', tanggal: '16 Mei' },
    Sabtu: { singkat: 'Sab', tanggal: '17 Mei' },
    Minggu: { singkat: 'Min', tanggal: '18 Mei' },
};

const OPSI_URUTAN = [
    { id: 'kecocokan', label: 'Skor Kecocokan Tertinggi' },
    { id: 'rating', label: 'Rating Tertinggi' },
    { id: 'tarif', label: 'Tarif Terendah' },
];

const DAFTAR_MENTOR = [
    {
        id: 1,
        nama: 'David Bowie',
        profesi: 'Product Designer',
        subjudul: 'Product Designer · Mobile App Designer',
        kategori: 'Product Design',
        match: 98,
        rating: 5.0,
        ulasan: 42,
        tarif: 20,
        pro: true,
        bio: 'Design Partner for Startup Founders. Saya membantu mengubah ide kompleks menjadi produk digital yang intuitif, dengan pengalaman lebih dari 5 tahun.',
        keahlian: ['Adobe Photoshop', 'Figma', 'UX Research'],
        hari: ['Senin', 'Selasa', 'Kamis'],
        jam: ['14:00 - 15:00', '19:00 - 20:00'],
        ikon: Code,
        warna: '#0F766E',
        banner: 'terang',
    },
    {
        id: 2,
        nama: 'Kelly Victor',
        profesi: 'UI/UX Designer',
        subjudul: 'UI/UX Designer · Design System Specialist',
        kategori: 'UI/UX',
        match: 96,
        rating: 4.9,
        ulasan: 31,
        tarif: 15,
        pro: true,
        bio: 'Desainer antarmuka yang fokus pada design system dan aksesibilitas. Senang membimbing mahasiswa membangun portofolio UI/UX yang rapi.',
        keahlian: ['Figma', 'Design System', 'Prototyping'],
        hari: ['Senin', 'Rabu', 'Jumat'],
        jam: ['10:00 - 11:00', '16:00 - 17:00'],
        ikon: User,
        warna: '#FF6B5B',
        banner: 'gelap',
    },
    {
        id: 3,
        nama: 'Raka Pradipta',
        profesi: 'Frontend Developer',
        subjudul: 'Frontend Developer · React Specialist',
        kategori: 'Frontend',
        match: 91,
        rating: 4.8,
        ulasan: 18,
        tarif: 20,
        pro: false,
        bio: 'Frontend developer dengan pengalaman membangun aplikasi web skala produksi. Siap membantu dari dasar HTML/CSS sampai React dan Tailwind.',
        keahlian: ['React', 'Tailwind CSS', 'JavaScript'],
        hari: ['Selasa', 'Kamis', 'Sabtu'],
        jam: ['13:00 - 14:00', '20:00 - 21:00'],
        ikon: Music,
        warna: '#BE123C',
        banner: 'terang',
    },
    {
        id: 4,
        nama: 'Alya Maharani',
        profesi: 'UX Researcher',
        subjudul: 'UX Researcher · Usability Testing',
        kategori: 'UI/UX',
        match: 88,
        rating: 5.0,
        ulasan: 0,
        tarif: 15,
        pro: false,
        bio: 'Peneliti UX yang terbiasa merancang wawancara pengguna dan usability testing. Cocok untuk tugas akhir yang butuh riset berbasis pengguna.',
        keahlian: ['User Interview', 'Usability Testing', 'Survey'],
        hari: ['Rabu', 'Kamis'],
        jam: ['09:00 - 10:00', '15:00 - 16:00'],
        ikon: Microscope,
        warna: '#F97316',
        banner: 'terang',
    },
    {
        id: 5,
        nama: 'Naufal Ardi',
        profesi: 'Data Analyst',
        subjudul: 'Data Analyst · Business Intelligence',
        kategori: 'Data',
        match: 84,
        rating: 4.9,
        ulasan: 27,
        tarif: 25,
        pro: true,
        bio: 'Data analyst yang gemar bercerita lewat data. Membimbing analisis data dengan Python, SQL, dan dashboard yang mudah dipahami.',
        keahlian: ['Python', 'SQL', 'Power BI'],
        hari: ['Senin', 'Selasa', 'Jumat'],
        jam: ['11:00 - 12:00', '19:00 - 20:00'],
        ikon: Calculator,
        warna: '#EC4899',
        banner: 'gelap',
    },
    {
        id: 6,
        nama: 'Amira Zahra',
        profesi: 'Academic Writer',
        subjudul: 'Academic Writer · Penulisan Ilmiah',
        kategori: 'Penelitian',
        match: 81,
        rating: 5.0,
        ulasan: 0,
        tarif: 30,
        pro: false,
        bio: 'Membantu menyusun proposal, skripsi, dan artikel ilmiah dengan struktur argumen yang kuat serta sitasi yang konsisten.',
        keahlian: ['Penulisan Ilmiah', 'Sitasi', 'Proposal Skripsi'],
        hari: ['Rabu', 'Sabtu', 'Minggu'],
        jam: ['10:00 - 11:00', '14:00 - 15:00'],
        ikon: BookOpen,
        warna: '#5EEAD4',
        banner: 'gelap',
    },
    {
        id: 7,
        nama: 'Dimas Prakoso',
        profesi: 'Frontend Engineer',
        subjudul: 'Frontend Engineer · Web Performance',
        kategori: 'Frontend',
        match: 79,
        rating: 4.7,
        ulasan: 22,
        tarif: 20,
        pro: false,
        bio: 'Fokus pada performa web dan arsitektur komponen. Senang mengulas kode mentee dan memberi saran yang bisa langsung diterapkan.',
        keahlian: ['React', 'Vite', 'Web Performance'],
        hari: ['Rabu', 'Jumat'],
        jam: ['16:00 - 17:00', '20:00 - 21:00'],
        ikon: Rocket,
        warna: '#A78BFA',
        banner: 'terang',
    },
    {
        id: 8,
        nama: 'Citra Lestari',
        profesi: 'Product Manager',
        subjudul: 'Product Manager · Product Discovery',
        kategori: 'Product Design',
        match: 77,
        rating: 4.8,
        ulasan: 14,
        tarif: 25,
        pro: true,
        bio: 'Product manager yang membantu mahasiswa memvalidasi ide, menyusun roadmap, dan menentukan prioritas fitur secara terukur.',
        keahlian: ['Product Discovery', 'Roadmapping', 'Prioritisasi'],
        hari: ['Senin', 'Kamis'],
        jam: ['13:00 - 14:00', '18:00 - 19:00'],
        ikon: GraduationCap,
        warna: '#E6177A',
        banner: 'gelap',
    },
    {
        id: 9,
        nama: 'Fajar Nugroho',
        profesi: 'Data Scientist',
        subjudul: 'Data Scientist · Machine Learning',
        kategori: 'Data',
        match: 75,
        rating: 4.9,
        ulasan: 36,
        tarif: 30,
        pro: true,
        bio: 'Data scientist dengan latar belakang statistika. Membimbing dari eksplorasi data sampai membangun model prediksi sederhana.',
        keahlian: ['Machine Learning', 'Python', 'Statistika'],
        hari: ['Selasa', 'Jumat', 'Minggu'],
        jam: ['09:00 - 10:00', '19:00 - 20:00'],
        ikon: Globe,
        warna: '#FACC15',
        banner: 'terang',
    },
    {
        id: 10,
        nama: 'Salsa Maharani',
        profesi: 'Research Assistant',
        subjudul: 'Research Assistant · Metode Kuantitatif',
        kategori: 'Penelitian',
        match: 72,
        rating: 4.6,
        ulasan: 9,
        tarif: 15,
        pro: false,
        bio: 'Asisten peneliti yang berpengalaman dengan survei dan analisis kuantitatif. Cocok untuk kamu yang baru mulai menyusun penelitian.',
        keahlian: ['Metode Kuantitatif', 'SPSS', 'Desain Survei'],
        hari: ['Senin', 'Rabu'],
        jam: ['10:00 - 11:00', '15:00 - 16:00'],
        ikon: Microscope,
        warna: '#F97316',
        banner: 'gelap',
    },
    {
        id: 11,
        nama: 'Bima Saputra',
        profesi: 'Interaction Designer',
        subjudul: 'Interaction Designer · Motion & Microinteraction',
        kategori: 'UI/UX',
        match: 70,
        rating: 4.7,
        ulasan: 12,
        tarif: 20,
        pro: false,
        bio: 'Interaction designer yang suka merancang alur dan animasi mikro agar produk terasa hidup namun tetap mudah digunakan.',
        keahlian: ['Interaction Design', 'Figma', 'Motion'],
        hari: ['Kamis', 'Sabtu'],
        jam: ['14:00 - 15:00', '20:00 - 21:00'],
        ikon: Palette,
        warna: '#EC4899',
        banner: 'terang',
    },
    {
        id: 12,
        nama: 'Laras Wulandari',
        profesi: 'Design Strategist',
        subjudul: 'Design Strategist · Branding Produk Digital',
        kategori: 'Product Design',
        match: 68,
        rating: 5.0,
        ulasan: 0,
        tarif: 20,
        pro: false,
        bio: 'Membantu mahasiswa merumuskan identitas dan strategi desain produk, dari riset kompetitor sampai penyusunan panduan merek.',
        keahlian: ['Branding', 'Riset Kompetitor', 'Design Thinking'],
        hari: ['Selasa', 'Jumat'],
        jam: ['11:00 - 12:00', '17:00 - 18:00'],
        ikon: Camera,
        warna: '#22D3EE',
        banner: 'gelap',
    },
    {
        id: 13,
        nama: 'Rizky Hidayat',
        profesi: 'Web Developer',
        subjudul: 'Web Developer · Fullstack JavaScript',
        kategori: 'Frontend',
        match: 66,
        rating: 4.5,
        ulasan: 7,
        tarif: 15,
        pro: false,
        bio: 'Web developer fullstack yang sabar membimbing pemula memahami alur kerja frontend, API, dan deployment sederhana.',
        keahlian: ['JavaScript', 'Node.js', 'REST API'],
        hari: ['Senin', 'Selasa', 'Minggu'],
        jam: ['09:00 - 10:00', '13:00 - 14:00'],
        ikon: Code,
        warna: '#0F766E',
        banner: 'terang',
    },
    {
        id: 14,
        nama: 'Tania Putri',
        profesi: 'Statistik Terapan',
        subjudul: 'Statistik Terapan · Visualisasi Data',
        kategori: 'Data',
        match: 63,
        rating: 4.8,
        ulasan: 19,
        tarif: 25,
        pro: false,
        bio: 'Membantu memilih uji statistik yang tepat dan menyajikan hasilnya lewat visualisasi yang jujur dan mudah dibaca.',
        keahlian: ['Statistika', 'R', 'Visualisasi Data'],
        hari: ['Rabu', 'Kamis', 'Jumat'],
        jam: ['10:00 - 11:00', '16:00 - 17:00'],
        ikon: Calculator,
        warna: '#1D4ED8',
        banner: 'gelap',
    },
    {
        id: 15,
        nama: 'Yoga Pratama',
        profesi: 'Metodologi Penelitian',
        subjudul: 'Dosen Muda · Metodologi Penelitian',
        kategori: 'Penelitian',
        match: 60,
        rating: 4.7,
        ulasan: 11,
        tarif: 20,
        pro: true,
        bio: 'Dosen muda yang berpengalaman membimbing skripsi. Membantu merumuskan masalah, kerangka teori, dan desain penelitian yang layak.',
        keahlian: ['Metodologi Penelitian', 'Kerangka Teori', 'Bimbingan Skripsi'],
        hari: ['Selasa', 'Sabtu'],
        jam: ['13:00 - 14:00', '19:00 - 20:00'],
        ikon: GraduationCap,
        warna: '#84CC16',
        banner: 'terang',
    },
];

/* =========================================================
   KOMPONEN KECIL BANTUAN
   ========================================================= */

function AvatarMentor({ mentor, ukuran = 'w-[88px] h-[88px]', ukuranIkon = 40, lencana = true }) {
    const Ikon = mentor.ikon;
    return (
        <div className="relative shrink-0">
            <div
                className={`${ukuran} rounded-full border-4 border-white flex items-center justify-center text-white shadow-md`}
                style={{ backgroundColor: mentor.warna }}
            >
                <Ikon size={ukuranIkon} strokeWidth={1.8} />
            </div>
            {lencana && (
                <span className="absolute bottom-0 right-0 rounded-full bg-secondary text-white w-5 h-5 flex items-center justify-center border-2 border-white">
                    <Check size={10} strokeWidth={3} />
                </span>
            )}
        </div>
    );
}

function teksUlasan(mentor) {
    return mentor.ulasan > 0 ? `${mentor.ulasan} Ulasan` : 'Mentor Baru';
}

function labelHari(hari) {
    const info = HARI_TANGGAL[hari];
    return `${info.singkat}, ${info.tanggal}`;
}

/* =========================================================
   SUB-KOMPONEN 1: BannerPencarian
   ========================================================= */

function BannerPencarian({ kataKunci, onKataKunci, hari, onHari, urutan, onUrutan }) {
    const kelasSelect =
        'appearance-none rounded-full bg-white text-primary text-sm font-bold pl-5 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer transition-all duration-200 hover:brightness-95';

    return (
        <div className="relative bg-secondary text-white rounded-3xl px-8 py-8 overflow-hidden shadow-sm">
            <div className="absolute -top-32 left-1/3 w-80 h-80 rounded-full border-[48px] border-white/10 pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                <div className="max-w-md">
                    <h1 className="text-4xl font-light leading-tight">Temukan Mentor Terbaikmu</h1>
                    <p className="text-sm md:text-base mt-3 text-white/90 leading-relaxed">
                        Rekomendasi berdasarkan topik, ketersediaan, dan performa mentor.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                        <input
                            type="text"
                            value={kataKunci}
                            onChange={(e) => onKataKunci(e.target.value)}
                            placeholder="Cari mentor atau topik..."
                            aria-label="Cari mentor atau topik"
                            className="w-full sm:w-64 rounded-full bg-white text-sm text-slate-700 placeholder:text-slate-400 pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={hari}
                            onChange={(e) => onHari(e.target.value)}
                            aria-label="Filter hari"
                            className={kelasSelect}
                        >
                            <option value="semua">Semua Hari</option>
                            {DAFTAR_HARI.map((h) => (
                                <option key={h} value={h}>
                                    {h}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={urutan}
                            onChange={(e) => onUrutan(e.target.value)}
                            aria-label="Urutkan mentor"
                            className={kelasSelect}
                        >
                            {OPSI_URUTAN.map((o) => (
                                <option key={o.id} value={o.id}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   KOMPONEN: FilterTopik
   ========================================================= */

function FilterTopik({ topikAktif, onPilih }) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {DAFTAR_TOPIK.map((topik) => (
                <button
                    key={topik}
                    type="button"
                    onClick={() => onPilih(topik)}
                    className={
                        topikAktif === topik
                            ? 'rounded-full bg-secondary text-white font-medium px-4 py-1.5 text-sm shadow-sm transition-all duration-200 hover:brightness-110'
                            : 'rounded-full border border-accent bg-white text-secondary hover:bg-slate-50 font-medium px-4 py-1.5 text-sm transition-all duration-200'
                    }
                >
                    {topik}
                </button>
            ))}
        </div>
    );
}

/* =========================================================
   SUB-KOMPONEN 2: GridMentor
   ========================================================= */

function KartuMentor({ mentor, tersimpan, onSimpan, onLihatDetail }) {
    const gelap = mentor.banner === 'gelap';

    return (
        <article className="bg-white rounded-2xl border border-accent/70 shadow-sm overflow-hidden hover:border-accent hover:shadow-md transition-all duration-200">
            {/* Banner kartu */}
            <div
                className={`relative h-36 bg-gradient-to-br ${gelap ? 'from-secondary to-primary' : 'from-secondary to-accent'
                    }`}
            >
                <div className="absolute -top-16 right-6 w-44 h-44 rounded-full border-[28px] border-white/10 pointer-events-none" />
                <span className="absolute top-3.5 left-3.5 rounded-full bg-lightBg text-primary px-3 py-1 text-xs font-bold flex items-center gap-1">
                    <Sparkles size={12} className="text-secondary" />
                    {mentor.match}% Match
                </span>
            </div>

            {/* Avatar menimpa banner */}
            <div className="px-5 -mt-11">
                <AvatarMentor mentor={mentor} />
            </div>

            {/* Identitas */}
            <div className="px-5 pt-3 pb-4">
                <h3 className="text-xl font-extrabold text-primary flex items-center gap-1.5">
                    {mentor.nama}
                    <BadgeCheck size={18} className="text-secondary shrink-0" />
                </h3>
                <p className="text-sm text-slate-500 mt-1">{mentor.profesi}</p>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 border-y border-slate-100">
                <div className="py-3 text-center">
                    <p className="text-sm font-bold text-primary">{mentor.match}%</p>
                    <p className="text-xs text-slate-500 mt-0.5">Kecocokan</p>
                </div>
                <div className="py-3 text-center">
                    <p className="text-sm font-bold text-primary flex items-center justify-center gap-1">
                        <Star size={13} className="text-[#F9C74F]" fill="currentColor" />
                        {mentor.rating.toFixed(1)}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{teksUlasan(mentor)}</p>
                </div>
                <div className="py-3 text-center">
                    <p className="text-sm font-bold text-primary">{mentor.tarif} Koin</p>
                    <p className="text-xs text-slate-500 mt-0.5">Per Sesi</p>
                </div>
            </div>

            {/* Aksi */}
            <div className="p-4 flex items-center gap-2.5">
                <button
                    type="button"
                    onClick={() => onLihatDetail(mentor.id)}
                    className="flex-1 rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                >
                    Lihat Detail &amp; Pesan
                </button>
                <button
                    type="button"
                    onClick={() => onSimpan(mentor.id)}
                    aria-pressed={tersimpan}
                    aria-label={tersimpan ? `Hapus ${mentor.nama} dari simpanan` : `Simpan ${mentor.nama}`}
                    className={`rounded-full w-10 h-10 flex items-center justify-center shrink-0 transition-all duration-200 ${tersimpan
                            ? 'bg-secondary text-white hover:brightness-110'
                            : 'bg-lightBg text-primary hover:bg-secondary/10'
                        }`}
                >
                    <Bookmark size={16} fill={tersimpan ? 'currentColor' : 'none'} />
                </button>
            </div>
        </article>
    );
}

function GridMentor({ daftar, simpanan, onSimpan, onLihatDetail, onResetFilter }) {
    if (daftar.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-accent/70 shadow-sm p-10 flex flex-col items-center text-center transition-all duration-200">
                <div className="bg-lightBg rounded-xl p-3 text-secondary">
                    <SearchX size={24} />
                </div>
                <h3 className="text-lg font-extrabold text-primary mt-4">Mentor tidak ditemukan</h3>
                <p className="text-sm text-slate-500 mt-1 max-w-sm">
                    Coba ubah kata kunci, topik, atau hari yang kamu pilih untuk melihat lebih banyak mentor.
                </p>
                <button
                    type="button"
                    onClick={onResetFilter}
                    className="mt-5 rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm transition-all duration-200"
                >
                    Reset Filter
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {daftar.map((mentor) => (
                <KartuMentor
                    key={mentor.id}
                    mentor={mentor}
                    tersimpan={simpanan.includes(mentor.id)}
                    onSimpan={onSimpan}
                    onLihatDetail={onLihatDetail}
                />
            ))}
        </div>
    );
}

/* =========================================================
   KOMPONEN: Paginasi
   ========================================================= */

function Paginasi({ halaman, totalHalaman, onUbah }) {
    if (totalHalaman <= 1) return null;

    const nomor = Array.from({ length: totalHalaman }, (_, i) => i + 1);
    const kelasAktif = 'rounded-full bg-secondary text-white font-bold w-8 h-8 text-sm shadow-sm transition-all duration-200';
    const kelasNonAktif =
        'rounded-full border border-accent bg-white text-secondary hover:bg-slate-50 font-bold w-8 h-8 text-sm transition-all duration-200';
    const kelasNavAktif =
        'rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-1.5 text-sm flex items-center justify-center gap-1.5 transition-all duration-200';
    const kelasNavMati =
        'rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-1.5 text-sm flex items-center justify-center gap-1.5 cursor-not-allowed select-none';

    return (
        <nav className="flex items-center justify-center gap-2 pt-2" aria-label="Paginasi mentor">
            <button
                type="button"
                disabled={halaman === 1}
                onClick={() => onUbah(halaman - 1)}
                className={halaman === 1 ? kelasNavMati : kelasNavAktif}
            >
                <ArrowLeft size={14} />
                Sebelumnya
            </button>

            {nomor.map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onUbah(n)}
                    aria-current={n === halaman ? 'page' : undefined}
                    className={n === halaman ? kelasAktif : kelasNonAktif}
                >
                    {n}
                </button>
            ))}

            <button
                type="button"
                disabled={halaman === totalHalaman}
                onClick={() => onUbah(halaman + 1)}
                className={halaman === totalHalaman ? kelasNavMati : kelasNavAktif}
            >
                Selanjutnya
                <ArrowRight size={14} />
            </button>
        </nav>
    );
}

/* =========================================================
   SUB-KOMPONEN 3: ModalDetailMentor
   ========================================================= */

function ModalDetailMentor({ mentor, hariFilter, saldoUtama, initialSukses = false, onTutup }) {
    const hariAwal = hariFilter !== 'semua' && mentor.hari.includes(hariFilter) ? hariFilter : mentor.hari[0];

    const [hariTerpilih, setHariTerpilih] = useState(hariAwal);
    const [jamTerpilih, setJamTerpilih] = useState(mentor.jam[0]);
    const [pakaiPromo, setPakaiPromo] = useState(true);
    const [sukses, setSukses] = useState(initialSukses);

    useEffect(() => {
        const tekanTombol = (e) => {
            if (e.key === 'Escape') onTutup();
        };
        window.addEventListener('keydown', tekanTombol);
        return () => window.removeEventListener('keydown', tekanTombol);
    }, [onTutup]);

    // Kalkulasi ringkasan escrow
    const tarif = mentor.tarif;
    const potonganPromo = pakaiPromo ? Math.min(KOIN_PROMO, tarif) : 0;
    const saldoTerpotong = tarif - potonganPromo;
    const totalEscrow = tarif;
    const saldoCukup = saldoUtama >= saldoTerpotong;

    const pilihHari = (h) => {
        setHariTerpilih(h);
        setSukses(false);
    };
    const pilihJam = (j) => {
        setJamTerpilih(j);
        setSukses(false);
    };
    const ubahPromo = () => {
        setPakaiPromo((p) => !p);
        setSukses(false);
    };

    const ajukan = () => {
        if (!saldoCukup) return;
        setSukses(true);
    };

    const kelasPillAktif =
        'rounded-full bg-secondary text-white font-bold px-4 py-1.5 text-sm shadow-sm transition-all duration-200 hover:brightness-110';
    const kelasPillNonAktif =
        'rounded-full border border-accent bg-white text-secondary hover:bg-slate-50 font-bold px-4 py-1.5 text-sm transition-all duration-200';

    return (
        <div
            className="fixed inset-0 z-50 overflow-y-auto bg-primary/60 p-4"
            onClick={onTutup}
            role="presentation"
        >
            <div className="min-h-full flex items-center justify-center py-6">
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="judul-modal-mentor"
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white rounded-3xl border border-accent/70 shadow-md w-full max-w-4xl overflow-hidden"
                >
                    {/* ===== Header modal ===== */}
                    <div className="relative bg-gradient-to-br from-secondary to-accent px-8 py-7 overflow-hidden">
                        <div className="absolute -top-24 right-24 w-60 h-60 rounded-full border-[32px] border-white/10 pointer-events-none" />
                        <button
                            type="button"
                            onClick={onTutup}
                            aria-label="Tutup"
                            className="absolute top-5 right-5 rounded-full w-9 h-9 flex items-center justify-center bg-white/80 hover:bg-white text-primary transition-all duration-200"
                        >
                            <X size={16} />
                        </button>

                        <div className="relative flex items-center gap-5">
                            <AvatarMentor mentor={mentor} ukuran="w-[104px] h-[104px]" ukuranIkon={48} />
                            <div className="min-w-0 pr-10">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 id="judul-modal-mentor" className="text-3xl font-extrabold text-primary">
                                        {mentor.nama}
                                    </h2>
                                    <BadgeCheck size={20} className="text-secondary shrink-0" />
                                    {mentor.pro && (
                                        <span className="rounded-full bg-primary text-white px-2.5 py-0.5 text-[11px] font-bold">PRO</span>
                                    )}
                                </div>
                                <p className="text-sm md:text-base text-primary/80 mt-1.5">{mentor.subjudul}</p>
                                <span className="inline-block rounded-full bg-white/60 text-secondary px-3 py-1 text-xs font-bold mt-3">
                                    {mentor.match}% cocok untukmu
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ===== Isi modal ===== */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Kolom kiri: profil */}
                        <div className="p-8 md:border-r border-slate-100">
                            <p className="text-sm md:text-base text-slate-600 leading-relaxed">{mentor.bio}</p>

                            <div className="mt-5 bg-lightBg rounded-xl py-4 grid grid-cols-3 divide-x divide-accent/50">
                                <div className="text-center px-2">
                                    <p className="text-base font-bold text-primary flex items-center justify-center gap-1">
                                        <Star size={14} className="text-[#F9C74F]" fill="currentColor" />
                                        {mentor.rating.toFixed(1)}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">{mentor.ulasan > 0 ? `${mentor.ulasan} ulasan` : 'mentor baru'}</p>
                                </div>
                                <div className="text-center px-2">
                                    <p className="text-base font-bold text-primary">{mentor.tarif} Koin</p>
                                    <p className="text-xs text-slate-500 mt-0.5">per sesi</p>
                                </div>
                                <div className="text-center px-2">
                                    <p className="text-base font-bold text-primary">60 Menit</p>
                                    <p className="text-xs text-slate-500 mt-0.5">durasi</p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="bg-lightBg rounded-xl p-2.5 text-secondary">
                                    <Sparkles size={18} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-secondary tracking-widest uppercase">Keahlian</p>
                                    <h3 className="text-lg font-light text-primary leading-tight">Skills &amp; Topik Bimbingan</h3>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {mentor.keahlian.map((skill) => (
                                    <span
                                        key={skill}
                                        className="rounded-full bg-lightBg text-primary font-semibold px-3.5 py-1.5 text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Kolom kanan: booking */}
                        <div className="p-8">
                            <div className="flex items-center gap-3">
                                <div className="bg-lightBg rounded-xl p-2.5 text-secondary">
                                    <Calendar size={18} />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-secondary tracking-widest uppercase">Booking</p>
                                    <h3 className="text-lg font-light text-primary leading-tight">Pilih Jadwal Bimbingan</h3>
                                    <p className="text-xs text-slate-500 mt-0.5">Durasi sesi 60 menit</p>
                                </div>
                            </div>

                            {/* Pill hari */}
                            <div className="flex flex-wrap gap-2 mt-4">
                                {mentor.hari.map((h) => (
                                    <button
                                        key={h}
                                        type="button"
                                        onClick={() => pilihHari(h)}
                                        className={hariTerpilih === h ? kelasPillAktif : kelasPillNonAktif}
                                    >
                                        {labelHari(h)}
                                    </button>
                                ))}
                            </div>

                            {/* Pill jam */}
                            <div className="flex flex-wrap gap-2 mt-2.5">
                                {mentor.jam.map((j) => (
                                    <button
                                        key={j}
                                        type="button"
                                        onClick={() => pilihJam(j)}
                                        className={`flex items-center gap-1.5 ${jamTerpilih === j ? kelasPillAktif : kelasPillNonAktif}`}
                                    >
                                        <Clock size={13} />
                                        {j}
                                    </button>
                                ))}
                            </div>

                            {/* Ringkasan escrow */}
                            <div className="mt-4 bg-lightBg rounded-xl p-4">
                                <div className="flex items-center gap-3 pb-3 border-b border-accent">
                                    <div className="bg-secondary text-white rounded-lg p-2">
                                        <ShieldCheck size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-primary">Ringkasan Escrow</p>
                                        <p className="text-xs text-slate-500">Koin aman hingga sesi selesai</p>
                                    </div>
                                </div>

                                <dl className="mt-3 space-y-2 text-sm text-slate-600">
                                    <div className="flex items-center justify-between">
                                        <dt>Tarif Sesi</dt>
                                        <dd className="font-semibold text-primary">{tarif} Koin</dd>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <dt>
                                            <button
                                                type="button"
                                                onClick={ubahPromo}
                                                aria-pressed={pakaiPromo}
                                                className="flex items-center gap-2 hover:text-secondary transition-all duration-200"
                                            >
                                                <span
                                                    className={`rounded-full w-4 h-4 flex items-center justify-center border transition-all duration-200 ${pakaiPromo ? 'bg-secondary border-secondary text-white' : 'border-slate-300 bg-white text-transparent'
                                                        }`}
                                                >
                                                    <Check size={10} strokeWidth={3} />
                                                </span>
                                                Gunakan Koin Promo
                                            </button>
                                        </dt>
                                        <dd className="font-semibold text-secondary">{potonganPromo > 0 ? `-${potonganPromo} Koin` : '0 Koin'}</dd>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <dt>Saldo Utama Terpotong</dt>
                                        <dd className="font-semibold text-primary">{saldoTerpotong} Koin</dd>
                                    </div>
                                </dl>

                                <div className="border-t border-dashed border-accent mt-3 pt-3 flex items-center justify-between">
                                    <span className="text-sm font-bold text-primary">Total Ditahan (Escrow)</span>
                                    <span className="text-lg font-bold text-secondary">{totalEscrow} Koin</span>
                                </div>

                                <p className="text-xs text-slate-500 mt-2">Saldo utama kamu saat ini: {saldoUtama} Koin</p>
                            </div>

                            {/* Status pengajuan */}
                            {sukses && (
                                <p className="mt-3 text-sm font-semibold text-secondary flex items-center gap-1.5">
                                    <Check size={14} />
                                    Pengajuan berhasil dikirim ke mentor.
                                </p>
                            )}
                            {!saldoCukup && (
                                <p className="mt-3 text-sm font-semibold text-red-500 flex items-center gap-1.5">
                                    <AlertCircle size={14} />
                                    Saldo utama tidak cukup. Lakukan <Link to="/top-up" className="underline font-bold hover:text-red-700">Top Up</Link> terlebih dahulu.
                                </p>
                            )}

                            {/* Tombol ajukan */}
                            <button
                                type="button"
                                onClick={ajukan}
                                disabled={!saldoCukup}
                                className={`mt-4 w-full ${saldoCukup
                                        ? 'rounded-full bg-secondary hover:brightness-110 text-white font-bold px-4 py-3 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm'
                                        : 'rounded-full bg-slate-200 text-slate-400 font-bold px-4 py-3 text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none'
                                    }`}
                            >
                                Ajukan Bimbingan
                                <ArrowUpRight size={15} />
                            </button>

                            <p className="text-xs text-slate-500 text-center mt-3 flex items-center justify-center gap-1.5">
                                <Lock size={12} />
                                Dana baru diteruskan setelah sesi terverifikasi selesai.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* =========================================================
   KOMPONEN UTAMA (merakit seluruh halaman)
   ========================================================= */

export default function CariMentorPage() {
    const [kataKunci, setKataKunci] = useState('');
    const [hari, setHari] = useState('semua');
    const [urutan, setUrutan] = useState('kecocokan');
    const [topikAktif, setTopikAktif] = useState('Semua Topik');
    const [halaman, setHalaman] = useState(1);
    const [simpanan, setSimpanan] = useState([]);
    const [saldoUtama, setSaldoUtama] = useState(SALDO_CUKUP);
    const [modal, setModal] = useState(null); // { mentorId, sukses, kunci } | null
    const [penghitungModal, setPenghitungModal] = useState(0);

    const hasil = useMemo(() => {
        const kunci = kataKunci.trim().toLowerCase();
        const terfilter = DAFTAR_MENTOR.filter((m) => {
            const cocokTopik = topikAktif === 'Semua Topik' || m.kategori === topikAktif;
            const cocokHari = hari === 'semua' || m.hari.includes(hari);
            const cocokKata =
                kunci === '' ||
                m.nama.toLowerCase().includes(kunci) ||
                m.profesi.toLowerCase().includes(kunci) ||
                m.kategori.toLowerCase().includes(kunci) ||
                m.keahlian.some((k) => k.toLowerCase().includes(kunci));
            return cocokTopik && cocokHari && cocokKata;
        });

        const urut = [...terfilter];
        if (urutan === 'kecocokan') urut.sort((a, b) => b.match - a.match);
        if (urutan === 'rating') urut.sort((a, b) => b.rating - a.rating || b.ulasan - a.ulasan);
        if (urutan === 'tarif') urut.sort((a, b) => a.tarif - b.tarif || b.match - a.match);
        return urut;
    }, [kataKunci, hari, urutan, topikAktif]);

    const totalHalaman = Math.max(1, Math.ceil(hasil.length / MENTOR_PER_HALAMAN));
    const halamanAman = Math.min(halaman, totalHalaman);
    const daftarHalaman = hasil.slice((halamanAman - 1) * MENTOR_PER_HALAMAN, halamanAman * MENTOR_PER_HALAMAN);

    const ubahFilter = (setter) => (nilai) => {
        setter(nilai);
        setHalaman(1);
    };

    const resetFilter = () => {
        setKataKunci('');
        setHari('semua');
        setUrutan('kecocokan');
        setTopikAktif('Semua Topik');
        setHalaman(1);
    };

    const togglSimpan = (id) =>
        setSimpanan((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

    const bukaModal = (mentorId, sukses = false) => {
        setPenghitungModal((n) => n + 1);
        setModal({ mentorId, sukses, kunci: penghitungModal + 1 });
    };

    const tutupModal = () => setModal(null);

    const resetSimulasi = () => {
        resetFilter();
        setSimpanan([]);
        setSaldoUtama(SALDO_CUKUP);
        setModal(null);
    };

    const mentorModal = modal ? DAFTAR_MENTOR.find((m) => m.id === modal.mentorId) : null;

    const tombolSimulasi = (aktif) =>
        `rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${aktif
            ? 'bg-secondary text-white shadow-sm hover:brightness-110'
            : 'border border-accent bg-white text-secondary hover:bg-slate-50'
        }`;

    return (
        <div className="bg-lightBg min-h-screen px-4 py-6 md:px-8">
            <div className="max-w-6xl mx-auto space-y-5">
                {/* ===== BAR SIMULASI PRESENTASI ===== */}
                <div className="rounded-xl border border-dashed border-accent bg-white px-4 py-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-xs font-bold text-primary">🛠️ Simulasi Presentasi:</span>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pop-up</span>
                        <button type="button" onClick={() => bukaModal(1, false)} className={tombolSimulasi(modal && !modal.sukses)}>
                            Modal Detail Mentor
                        </button>
                        <button type="button" onClick={() => bukaModal(1, true)} className={tombolSimulasi(modal && modal.sukses)}>
                            Pengajuan Berhasil
                        </button>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filter Topik</span>
                        {['Semua Topik', 'UI/UX', 'Data'].map((t) => (
                            <button key={t} type="button" onClick={() => ubahFilter(setTopikAktif)(t)} className={tombolSimulasi(topikAktif === t)}>
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Saldo</span>
                        <button type="button" onClick={() => setSaldoUtama(SALDO_CUKUP)} className={tombolSimulasi(saldoUtama === SALDO_CUKUP)}>
                            Cukup
                        </button>
                        <button type="button" onClick={() => setSaldoUtama(SALDO_KURANG)} className={tombolSimulasi(saldoUtama === SALDO_KURANG)}>
                            Tidak Cukup
                        </button>
                    </div>

                    <button type="button" onClick={resetSimulasi} className={tombolSimulasi(false)}>
                        Reset Semua
                    </button>
                </div>

                <BannerPencarian
                    kataKunci={kataKunci}
                    onKataKunci={ubahFilter(setKataKunci)}
                    hari={hari}
                    onHari={ubahFilter(setHari)}
                    urutan={urutan}
                    onUrutan={ubahFilter(setUrutan)}
                />

                <FilterTopik topikAktif={topikAktif} onPilih={ubahFilter(setTopikAktif)} />

                <div className="flex items-center justify-between gap-3 px-1">
                    <p className="text-sm text-slate-500">
                        <span className="font-bold text-primary">{hasil.length} mentor</span> paling sesuai dengan profil belajarmu
                    </p>
                    <p className="text-sm font-bold text-secondary">
                        Halaman {halamanAman} dari {totalHalaman}
                    </p>
                </div>

                <GridMentor
                    daftar={daftarHalaman}
                    simpanan={simpanan}
                    onSimpan={togglSimpan}
                    onLihatDetail={(id) => bukaModal(id, false)}
                    onResetFilter={resetFilter}
                />

                <Paginasi halaman={halamanAman} totalHalaman={totalHalaman} onUbah={setHalaman} />
            </div>

            {mentorModal && (
                <ModalDetailMentor
                    key={modal.kunci}
                    mentor={mentorModal}
                    hariFilter={hari}
                    saldoUtama={saldoUtama}
                    initialSukses={modal.sukses}
                    onTutup={tutupModal}
                />
            )}
        </div>
    );
}