import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    Building2,
    GraduationCap,
    Calendar,
    Clock,
    Video,
    MessageSquare,
    CheckCircle2,
    Trophy,
    Flame,
    Target,
    Sparkles,
    Star,
    Users,
    BookOpen,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* POSISI CHIP IKON (dipakai bersama oleh semua slide)                 */
/* ------------------------------------------------------------------ */
const CHIP_POSITIONS = [
    'left-[10%] top-[12%] -rotate-6',
    'right-[10%] top-[16%] rotate-6',
    'left-[14%] bottom-[14%] rotate-3',
    'right-[12%] bottom-[12%] -rotate-3',
];

/* ------------------------------------------------------------------ */
/* DATA DUMMY SLIDE                                                    */
/* `image` opsional: isi dengan path/URL gambar (mis. '/images/a.jpg') */
/* jika kosong (null) atau gagal dimuat, dipakai ilustrasi ikon.       */
/* ------------------------------------------------------------------ */
const SLIDES_DATA = {
    mentee: [
        {
            id: 1,
            title: 'Satu Platform untuk Seluruh Jurusan',
            description:
                'Temukan mentor terbaik dari berbagai program studi dan mulai belajar lebih terarah bersama kakak tingkatmu.',
            hashtag: '#MentlifyUMRAH',
            cta: 'Cari Mentor Sekarang',
            to: '/mentee/cari-mentor',
            image: null,
            art: {
                main: Building2,
                chips: [
                    { icon: GraduationCap, bg: 'bg-accentYellow', color: 'text-primary' },
                    { icon: Sparkles, bg: 'bg-[#66D6AE]', color: 'text-primary' },
                    { icon: BookOpen, bg: 'bg-[#FF7B6B]', color: 'text-white' },
                    { icon: Users, bg: 'bg-secondary', color: 'text-white' },
                ],
            },
        },
        {
            id: 2,
            title: 'Jadwalkan Sesi Bimbinganmu Hari Ini',
            description:
                'Pesan sesi 1-on-1 dengan mentor pilihanmu, tentukan topik, dan dapatkan jawaban langsung lewat video call.',
            hashtag: '#BelajarBarengMentor',
            cta: 'Pesan Sesi Bimbingan',
            to: '/mentee/jadwal-sesi',
            image: null,
            art: {
                main: Calendar,
                chips: [
                    { icon: Clock, bg: 'bg-accentYellow', color: 'text-primary' },
                    { icon: CheckCircle2, bg: 'bg-[#66D6AE]', color: 'text-primary' },
                    { icon: MessageSquare, bg: 'bg-[#FF7B6B]', color: 'text-white' },
                    { icon: Video, bg: 'bg-secondary', color: 'text-white' },
                ],
            },
        },
        {
            id: 3,
            title: 'Selesaikan Misi, Kumpulkan XP',
            description:
                'Ikuti misi harian dan jaga streak belajarmu untuk membuka lencana serta bonus koin eksklusif.',
            hashtag: '#MisiHarianMentlify',
            cta: 'Lihat Misi Saya',
            to: '#misi-streak',
            image: null,
            art: {
                main: Trophy,
                chips: [
                    { icon: Flame, bg: 'bg-accentYellow', color: 'text-[#E8590C]' },
                    { icon: Star, bg: 'bg-[#66D6AE]', color: 'text-primary' },
                    { icon: Target, bg: 'bg-[#FF7B6B]', color: 'text-white' },
                    { icon: Sparkles, bg: 'bg-secondary', color: 'text-white' },
                ],
            },
        },
    ],
    mentor: [
        {
            id: 1,
            title: 'Bagikan Ilmu, Bangun Dampak Bersama',
            description:
                'Bantu mentee dari seluruh jurusan berkembang lewat pengalaman akademik dan organisasimu di kampus.',
            hashtag: '#MentorMentlifyUMRAH',
            cta: 'Lihat Permintaan Sesi',
            to: '/mentor/jadwal-sesi',
            image: null,
            art: {
                main: GraduationCap,
                chips: [
                    { icon: Building2, bg: 'bg-accentYellow', color: 'text-primary' },
                    { icon: Trophy, bg: 'bg-[#66D6AE]', color: 'text-primary' },
                    { icon: Users, bg: 'bg-[#FF7B6B]', color: 'text-white' },
                    { icon: Sparkles, bg: 'bg-secondary', color: 'text-white' },
                ],
            },
        },
        {
            id: 2,
            title: 'Atur Ketersediaan Jadwal Kamu',
            description:
                'Buka slot waktu yang sesuai dengan kesibukanmu agar mentee dapat memesan sesi dengan mudah.',
            hashtag: '#JadwalFleksibel',
            cta: 'Kelola Jadwal',
            to: '/mentor/jadwal-sesi',
            image: null,
            art: {
                main: Calendar,
                chips: [
                    { icon: Clock, bg: 'bg-accentYellow', color: 'text-primary' },
                    { icon: CheckCircle2, bg: 'bg-[#66D6AE]', color: 'text-primary' },
                    { icon: Users, bg: 'bg-[#FF7B6B]', color: 'text-white' },
                    { icon: Video, bg: 'bg-secondary', color: 'text-white' },
                ],
            },
        },
        {
            id: 3,
            title: 'Siapkan Bank Soal untuk Mentee',
            description:
                'Tambahkan materi dan latihan soal agar sesi bimbingan semakin efektif dan berkesan bagi mentee.',
            hashtag: '#BankSoalSesi',
            cta: 'Kelola Bank Soal',
            to: '/mentor/bank-soal',
            image: null,
            art: {
                main: BookOpen,
                chips: [
                    { icon: Target, bg: 'bg-accentYellow', color: 'text-primary' },
                    { icon: CheckCircle2, bg: 'bg-[#66D6AE]', color: 'text-primary' },
                    { icon: Star, bg: 'bg-[#FF7B6B]', color: 'text-white' },
                    { icon: Sparkles, bg: 'bg-secondary', color: 'text-white' },
                ],
            },
        },
    ],
};

/* ------------------------------------------------------------------ */
/* ILUSTRASI KANAN: latar toska + ikon besar lucide-react              */
/* ------------------------------------------------------------------ */
function IllustrationArt({ art }) {
    const MainIcon = art.main;

    return (
        <div className="relative h-full w-full overflow-hidden bg-accent">
            {/* lingkaran dekoratif latar */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
            <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-secondary/20" />
            <div className="absolute right-[22%] top-[8%] h-10 w-10 rounded-full bg-accentYellow md:h-12 md:w-12" />
            <div className="absolute bottom-[8%] left-[38%] h-8 w-8 rounded-full bg-[#FF7B6B]/80" />

            {/* chip ikon melayang di sekeliling */}
            {art.chips.map((chip, i) => {
                const ChipIcon = chip.icon;
                return (
                    <div
                        key={i}
                        className={`absolute flex h-11 w-11 items-center justify-center rounded-2xl shadow-sm transition-all duration-200 hover:scale-110 md:h-14 md:w-14 ${chip.bg} ${CHIP_POSITIONS[i]}`}
                    >
                        <ChipIcon className={`h-5 w-5 md:h-7 md:w-7 ${chip.color}`} />
                    </div>
                );
            })}

            {/* ikon utama besar di tengah */}
            <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-3xl bg-primary shadow-md md:h-40 md:w-40">
                <MainIcon className="h-14 w-14 text-accentYellow md:h-20 md:w-20" />
            </div>
        </div>
    );
}

function Illustration({ image, art, alt }) {
    const [failed, setFailed] = useState(false);

    if (image && !failed) {
        return (
            <div className="h-full w-full overflow-hidden bg-accent">
                <img
                    src={image}
                    alt={alt}
                    onError={() => setFailed(true)}
                    className="h-full w-full object-cover"
                />
            </div>
        );
    }

    return <IllustrationArt art={art} />;
}

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */
function BannerAtas({ userRole = 'mentee', showSimulation = true }) {
    const navigate = useNavigate();
    const role = userRole === 'mentor' ? 'mentor' : 'mentee';
    const [current, setCurrent] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [toast, setToast] = useState('');

    const slides = SLIDES_DATA[role];
    const total = slides.length;
    const slide = slides[current];

    const goNext = useCallback(() => {
        setCurrent((prev) => (prev + 1) % total);
    }, [total]);

    const goPrev = useCallback(() => {
        setCurrent((prev) => (prev - 1 + total) % total);
    }, [total]);

    // reset slide saat role berganti
    useEffect(() => {
        setCurrent(0);
    }, [role]);

    // autoplay banner otomatis, jeda sejenak saat kursor diarahkan ke banner (hover)
    useEffect(() => {
        if (isHovered) return undefined;
        const timer = setInterval(goNext, 3500);
        return () => clearInterval(timer);
    }, [isHovered, goNext]);

    // toast kecil saat CTA diklik
    useEffect(() => {
        if (!toast) return undefined;
        const t = setTimeout(() => setToast(''), 2200);
        return () => clearTimeout(t);
    }, [toast]);

    const handleCta = (targetSlide) => {
        if (!targetSlide.to) return;
        if (targetSlide.to.startsWith('#')) {
            const el = document.querySelector(targetSlide.to);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(targetSlide.to);
        }
    };

    return (
        <div className="w-full">
            {/* ---------------- BANNER CAROUSEL ---------------- */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative overflow-hidden rounded-3xl border border-primary/30 bg-primary shadow-sm"
            >
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    {slides.map((s) => {
                        const CtaIcon = s.art.main;
                        return (
                            <div
                                key={`${role}-${s.id}`}
                                className="grid min-w-full grid-cols-2"
                            >
                                {/* Panel kiri (teks) - 50% */}
                                <div className="flex min-h-[260px] flex-col justify-center bg-primary py-8 pl-14 pr-5 text-white sm:pl-16 md:min-h-[290px] md:pl-24 md:pr-10">
                                    <h2 className="text-xl font-extrabold leading-tight sm:text-2xl md:text-4xl">
                                        {s.title}
                                    </h2>

                                    <p className="mt-3 max-w-md text-xs text-white/80 md:text-sm">
                                        {s.description}
                                    </p>

                                    <p className="mt-3 text-sm font-semibold text-accent">
                                        {s.hashtag}
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleCta(s)}
                                            className="flex items-center justify-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-medium text-white shadow-sm transition-all duration-200 hover:scale-105 hover:brightness-110 md:text-sm"
                                        >
                                            <CtaIcon size={16} />
                                            {s.cta}
                                            <ArrowRight size={16} />
                                        </button>
                                        <span className="font-serif text-lg font-bold">
                                            Mentlify
                                        </span>
                                    </div>
                                </div>

                                {/* Panel kanan (ilustrasi) - 50%, selalu tampil */}
                                <div className="min-h-[260px] md:min-h-[290px]">
                                    <Illustration image={s.image} art={s.art} alt={s.title} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Tombol panah kiri */}
                <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Slide sebelumnya"
                    className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white transition-all duration-200 hover:bg-white/40"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Tombol panah kanan */}
                <button
                    type="button"
                    onClick={goNext}
                    aria-label="Slide berikutnya"
                    className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/20 text-white transition-all duration-200 hover:bg-white/40"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Indikator titik: melayang di batas biru & ilustrasi, wadah sangat tipis */}
                <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/10 px-2 py-1">
                    {slides.map((s, i) => (
                        <button
                            key={s.id}
                            type="button"
                            onClick={() => setCurrent(i)}
                            aria-label={`Ke slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${current === i
                                ? 'w-7 bg-white'
                                : 'w-2 bg-white/60 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>

                {/* Toast simulasi CTA */}
                {toast && (
                    <div className="absolute right-12 top-4 z-20 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-primary shadow-md transition-all duration-200">
                        <Target size={14} className="text-secondary" />
                        {toast}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BannerAtas;