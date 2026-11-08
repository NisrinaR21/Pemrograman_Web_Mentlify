import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AlertCircle,
    Pencil,
    ShieldAlert,
    Star,
    User,
} from "lucide-react";

const SUMMARY = {
    average: "4,85",
    total: 24,
    distribution: [
        { star: 5, count: 18 },
        { star: 4, count: 4 },
        { star: 3, count: 1 },
        { star: 2, count: 1 },
        { star: 1, count: 0 },
    ],
};

// status: "normal" | "dilaporkan" | "ditindak"
const INITIAL_REVIEWS = [
    {
        id: 1,
        name: "Nadine Amalia",
        initials: "NA",
        rating: 5,
        date: "18 Mei 2026",
        text: "Penjelasannya runtut dan contoh latihannya sangat membantu. Konsep limit akhirnya terasa jauh lebih mudah.",
        status: "normal",
    },
    {
        id: 2,
        name: "Raka Pradipta",
        initials: "RP",
        rating: 2,
        date: "11 Mei 2026",
        text: "",
        status: "ditindak",
    },
];

function Avatar({ initials }) {
    return (
        <div className="w-10 h-10 text-sm rounded-full border-2 border-accent bg-primary text-white font-bold flex items-center justify-center shrink-0">
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
                    className={n <= value ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                />
            ))}
        </span>
    );
}

/* ---------- State Kosong ---------- */
function EmptyState() {
    const navigate = useNavigate();

    return (
        <section className="rounded-2xl border border-dashed border-accent bg-gradient-to-b from-white to-lightBg p-6 flex flex-col items-center justify-center text-center min-h-[540px]">
            <div className="w-16 h-16 rounded-2xl bg-secondary text-white flex items-center justify-center shadow-md">
                <User size={28} />
            </div>
            <p className="mt-5 text-xs font-bold text-secondary tracking-widest uppercase">
                Mentor baru
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-primary leading-snug max-w-sm">
                Perbarui profilmu untuk menarik mentee!
            </h2>
            <p className="mt-3 text-sm text-slate-500 max-w-sm">
                Kamu belum menerima rating. Lengkapi bio dan topik keahlian agar profilmu
                lebih meyakinkan bagi calon Mentee.
            </p>
            <button
                type="button"
                onClick={() => navigate('/mentor/profil')}
                className="mt-5 rounded-full bg-secondary hover:brightness-110 text-white font-bold px-5 py-2.5 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
            >
                Perbarui Profil
                <Pencil size={14} />
            </button>
        </section>
    );
}

/* ---------- Ringkasan Rating ---------- */
function RatingSummary() {
    const max = Math.max(...SUMMARY.distribution.map((d) => d.count));

    return (
        <div className="bg-primary text-white rounded-2xl p-6 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 items-center">
            <div>
                <p className="text-xs font-bold text-accent tracking-wider uppercase">
                    Rating Mentor
                </p>
                <p className="mt-3 flex items-center gap-2 text-4xl font-extrabold">
                    <Star size={28} className="fill-amber-400 text-amber-400" />
                    {SUMMARY.average}
                </p>
                <p className="mt-3 text-sm text-white/40">
                    {SUMMARY.total} ulasan terverifikasi
                </p>
            </div>

            <ul className="space-y-2">
                {SUMMARY.distribution.map(({ star, count }) => (
                    <li key={star} className="flex items-center gap-3 text-sm">
                        <span className="w-3 text-right">{star}</span>
                        <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-amber-400 rounded-full"
                                style={{ width: `${max ? (count / max) * 100 : 0}%` }}
                            />
                        </div>
                        <span className="w-5 text-right">{count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

/* ---------- Kartu Ulasan ---------- */
function ReviewCard({ review, onReport }) {
    const { name, initials, rating, date, text, status } = review;
    const isAction = status === "ditindak";

    return (
        <li
            className={`rounded-xl border p-4 ${isAction ? "border-amber-300 bg-amber-50" : "border-slate-100 bg-white"
                }`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <Avatar initials={initials} />
                    <div>
                        <p className="text-sm font-bold text-slate-800">{name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <MiniStars value={rating} />
                            <span>{date}</span>
                        </div>
                    </div>
                </div>

                {status === "normal" && (
                    <button
                        type="button"
                        onClick={() => onReport(review.id)}
                        className="rounded-full border border-red-400 text-red-500 bg-white hover:bg-red-50 font-medium px-4 py-1.5 text-sm flex items-center gap-1.5 transition-all duration-200"
                    >
                        <AlertCircle size={14} />
                        Laporkan Ulasan
                    </button>
                )}

                {status === "dilaporkan" && (
                    <span className="rounded-full bg-red-500 text-white px-3 py-1 text-xs font-semibold flex items-center gap-1">
                        <AlertCircle size={14} />
                        Dilaporkan
                    </span>
                )}

                {status === "ditindak" && (
                    <span className="rounded-full bg-slate-100 text-secondary px-3 py-1 text-xs font-semibold flex items-center gap-1">
                        <ShieldAlert size={14} />
                        Ditindak Admin
                    </span>
                )}
            </div>

            {isAction ? (
                <div className="mt-3 text-sm text-slate-700">
                    <AlertCircle size={14} className="text-amber-500 mb-1" />
                    <p>[Ulasan teks dihapus Admin Moderasi; rating bintang dipertahankan]</p>
                </div>
            ) : (
                <p className="mt-3 text-sm text-slate-700">{text}</p>
            )}
        </li>
    );
}

/* ---------- Kartu Berisi ---------- */
function FilledState({ reviews, onReport }) {
    return (
        <section className="bg-white rounded-2xl border border-accent/70 p-6 shadow-sm">
            <RatingSummary />

            <div className="mt-6 flex items-baseline justify-between gap-3">
                <h2 className="text-xl font-extrabold text-primary">Ulasan Terbaru</h2>
                <span className="text-sm text-slate-500">Transaksi database otomatis</span>
            </div>

            <ul className="mt-4 space-y-3">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} onReport={onReport} />
                ))}
            </ul>
        </section>
    );
}

/* ---------- Halaman Utama ---------- */
export default function RatingMentor({ simState }) {
    const [reviews, setReviews] = useState(INITIAL_REVIEWS);

    const handleReport = (id) => {
        setReviews((prev) =>
            prev.map((r) => (r.id === id && r.status === "normal" ? { ...r, status: "dilaporkan" } : r))
        );
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            {simState === "ada" ? (
                <FilledState reviews={reviews} onReport={handleReport} />
            ) : (
                <EmptyState />
            )}
        </div>
    );
}