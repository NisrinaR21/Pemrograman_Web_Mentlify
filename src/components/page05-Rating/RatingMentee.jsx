import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ArrowUpRight,
    CheckCircle2,
    Clock,
    Lock,
    Sparkles,
    Star,
} from "lucide-react";

const RATING_LABELS = {
    1: "Kurang",
    2: "Cukup",
    3: "Baik",
    4: "Sangat baik",
    5: "Luar biasa",
};

const MENTOR = {
    name: "Farhan Akbar",
    topic: "Kalkulus Dasar · Limit & Turunan",
    initials: "FA",
};

const REVIEW_HISTORY = [
    {
        id: 1,
        mentor: "Farhan Akbar",
        initials: "FA",
        rating: 5,
        date: "18 Mei 2026",
        text: "Materi limit dijelaskan dengan runtut dan contoh latihannya sangat membantu.",
    },
    {
        id: 2,
        mentor: "Salsabila Putri",
        initials: "SP",
        rating: 5,
        date: "9 Mei 2026",
        text: "Sesi analisis data berjalan jelas dan sesuai topik yang saya butuhkan.",
    },
];

function Avatar({ initials, size = "w-10 h-10", textSize = "text-sm" }) {
    return (
        <div
            className={`${size} ${textSize} rounded-full border-2 border-accent bg-primary text-white font-bold flex items-center justify-center shrink-0`}
        >
            {initials}
        </div>
    );
}

function MiniStars({ value }) {
    return (
        <span className="inline-flex items-center gap-0.5" aria-label={`${value} dari 5 bintang`}>
            {[1, 2, 3, 4, 5].map((n) => (
                <Star
                    key={n}
                    size={14}
                    className={
                        n <= value ? "fill-amber-400 text-amber-400" : "text-slate-300"
                    }
                />
            ))}
        </span>
    );
}

/* ---------- Kartu Form Rating ---------- */
function RatingForm({ rating, setRating, review, setReview, submitted, onSubmit }) {
    const [hover, setHover] = useState(0);
    const shown = submitted ? rating : hover || rating;

    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-6 shadow-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-semibold">
                <Clock size={14} />
                Batas pengisian: 7 hari sejak sesi selesai
            </span>

            <h2 className="mt-4 text-2xl font-extrabold text-primary leading-snug">
                Bagaimana pengalaman belajarmu?
            </h2>

            {/* Mentor sesi */}
            <div className="mt-4 bg-lightBg rounded-xl p-4 flex items-center gap-3">
                <Avatar initials={MENTOR.initials} size="w-12 h-12" />
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-secondary tracking-wider uppercase">
                        Mentor Sesi
                    </p>
                    <p className="text-base font-bold text-slate-800">{MENTOR.name}</p>
                    <p className="text-xs text-slate-500 truncate">{MENTOR.topic}</p>
                </div>
                <span className="rounded-full bg-white text-secondary px-3 py-1 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    Selesai
                </span>
            </div>

            {/* Bintang */}
            <div className="mt-5 flex flex-col items-center">
                <div
                    className="flex items-center gap-1.5"
                    role="radiogroup"
                    aria-label="Pilih rating bintang"
                    onMouseLeave={() => setHover(0)}
                >
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            type="button"
                            role="radio"
                            aria-checked={rating === n}
                            aria-label={`${n} bintang`}
                            disabled={submitted}
                            onClick={() => setRating(n)}
                            onMouseEnter={() => !submitted && setHover(n)}
                            className={`p-0.5 transition-transform ${submitted ? "cursor-not-allowed" : "hover:scale-110"
                                }`}
                        >
                            <Star
                                size={40}
                                className={
                                    n <= shown
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-slate-300"
                                }
                            />
                        </button>
                    ))}
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-500">
                    {rating > 0
                        ? `${rating} dari 5 · ${RATING_LABELS[rating]}`
                        : "Pilih jumlah bintang"}
                </p>
            </div>

            {/* Ulasan */}
            <div className="mt-5">
                <label htmlFor="ulasan" className="text-sm font-bold text-primary">
                    Ulasan tertulis{" "}
                    <span className="font-normal text-slate-500">Opsional</span>
                </label>
                <textarea
                    id="ulasan"
                    rows={3}
                    value={review}
                    readOnly={submitted}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Bagikan pengalaman belajarmu..."
                    className={`mt-2 bg-[#F8FAF9] border border-accent/50 rounded-xl p-3 focus:border-secondary outline-none w-full resize-none text-sm text-slate-700 placeholder:text-slate-400 ${submitted ? "cursor-not-allowed text-slate-500" : ""
                        }`}
                />
            </div>

            {/* Catatan */}
            <div className="mt-3 bg-lightBg rounded-xl p-3 flex items-start gap-2.5 text-sm text-secondary">
                <Lock size={16} className="mt-0.5 shrink-0" />
                <p>
                    Rating hanya dapat diberikan satu kali dan{" "}
                    <span className="font-bold">tidak dapat diedit</span> setelah dikirim.
                </p>
            </div>

            {/* Tombol kirim */}
            {submitted ? (
                <button
                    type="button"
                    disabled
                    className="mt-4 w-full rounded-full bg-slate-200 text-slate-400 font-bold px-4 py-3 text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none"
                >
                    Rating Berhasil Dikirim
                    <CheckCircle2 size={16} />
                </button>
            ) : (
                <button
                    type="button"
                    disabled={rating === 0}
                    onClick={onSubmit}
                    className={
                        rating === 0
                            ? "mt-4 w-full rounded-full bg-slate-200 text-slate-400 font-bold px-4 py-3 text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none"
                            : "mt-4 w-full rounded-full bg-secondary hover:brightness-110 text-white font-bold px-4 py-3 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
                    }
                >
                    Kirim Rating &amp; Ulasan
                    <ArrowUpRight size={16} />
                </button>
            )}
        </section>
    );
}

/* ---------- Kartu Kosong ---------- */
function EmptyRatingCard() {
    const navigate = useNavigate();

    return (
        <section className="rounded-2xl border border-dashed border-accent bg-gradient-to-br from-white to-lightBg p-6 flex flex-col items-center justify-center text-center min-h-[420px]">
            <div className="w-16 h-16 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-md">
                <Sparkles size={28} />
            </div>
            <p className="mt-5 text-xs font-bold text-secondary tracking-widest uppercase">
                Belum ada sesi selesai
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-primary leading-snug max-w-xs">
                Tidak ada mentor yang harus kamu rating
            </h2>
            <p className="mt-3 text-sm text-slate-500 max-w-xs">
                Selesaikan sesi bimbingan terlebih dahulu agar formulir penilaian mentor
                muncul di halaman ini.
            </p>
            <button
                type="button"
                onClick={() => navigate('/mentee/jadwal-sesi')}
                className="mt-5 rounded-full bg-secondary hover:brightness-110 text-white font-bold px-5 py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
            >
                Ajukan Bimbingan Sekarang!
                <ArrowUpRight size={16} />
            </button>
        </section>
    );
}

/* ---------- Kartu Riwayat Ulasan ---------- */
function ReviewHistory() {
    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-6 shadow-sm">
            <div className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-4">
                <h2 className="text-xl font-extrabold text-primary">Riwayat Ulasan</h2>
                <span className="text-sm text-slate-500">Ulasan yang pernah kamu kirim</span>
            </div>

            <ul className="mt-4 space-y-3">
                {REVIEW_HISTORY.map((item) => (
                    <li
                        key={item.id}
                        className="rounded-xl border border-slate-100 bg-white p-4"
                    >
                        <div className="flex items-center gap-3">
                            <Avatar initials={item.initials} />
                            <div>
                                <p className="text-sm font-bold text-slate-800">{item.mentor}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <MiniStars value={item.rating} />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-700">{item.text}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}

/* ---------- Halaman Utama ---------- */
export default function RatingMentee({ simState }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (rating === 0) return;
        setSubmitted(true);
    };

    return (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {simState === "ada" ? (
                <RatingForm
                    rating={rating}
                    setRating={setRating}
                    review={review}
                    setReview={setReview}
                    submitted={submitted}
                    onSubmit={handleSubmit}
                />
            ) : (
                <EmptyRatingCard />
            )}
            <ReviewHistory />
        </div>
    );
}