import { useState, useEffect } from 'react';
import {
    Flame,
    Sparkles,
    Check,
    CheckCircle2,
    XCircle,
    Trophy,
    BookOpen,
    Pencil,
    Trash2,
    Plus,
    ArrowUpRight,
    ChevronDown,
    X,
    Target,
    Wrench,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* KONSTANTA & DATA DUMMY                                              */
/* ------------------------------------------------------------------ */
export const FAKULTAS_DATA = {
    FTKK: {
        nama: 'Fakultas Teknik dan Teknologi Kemaritiman',
        singkat: 'FTKK (Teknik & Maritim)',
        topik: [
            'Pemrograman Web & Algoritma',
            'Rangkaian Listrik & Logika Digital',
            'Kalkulus Teknik & Aljabar Linier',
            'Hidrodinamika & Konstruksi Kapal',
            'Termodinamika & Kinetika Kimia',
            'Mekanika Struktur & Sipil',
        ],
        soalAwal: [
            {
                id: 101,
                topik: 'Pemrograman Web & Algoritma',
                text: 'Di dalam JavaScript, manakah method array yang digunakan untuk memfilter elemen berdasarkan kondisi?',
                options: ['array.map()', 'array.filter()', 'array.reduce()', 'array.find()'],
                correct: 1,
                explanation: 'Method array.filter() menghasilkan array baru berisi elemen-elemen yang memenuhi kondisi pengujian.',
                xp: 15,
            },
            {
                id: 102,
                topik: 'Kalkulus Teknik & Aljabar Linier',
                text: 'Turunan pertama dari f(x) = 3x² + 5x adalah ...',
                options: ['6x + 5', '3x + 5', '6x² + 5', '6x'],
                correct: 0,
                explanation: 'd/dx(3x²) = 6x, d/dx(5x) = 5. Maka f\'(x) = 6x + 5.',
                xp: 15,
            },
        ],
    },
    FEBM: {
        nama: 'Fakultas Ekonomi dan Bisnis Maritim',
        singkat: 'FEBM (Ekonomi & Bisnis)',
        topik: [
            'Pengantar Akuntansi & Laporan Keuangan',
            'Manajemen Pemasaran & Strategis',
            'Bisnis Digital & E-Commerce',
            'Kewirausahaan & Model Bisnis',
            'Ekonomi Maritim & Ekspor Impor',
        ],
        soalAwal: [
            {
                id: 103,
                topik: 'Pengantar Akuntansi & Laporan Keuangan',
                text: 'Persamaan dasar akuntansi yang benar adalah ...',
                options: ['Aset = Kewajiban + Ekuitas', 'Aset = Ekuitas − Kewajiban', 'Kewajiban = Aset + Ekuitas', 'Ekuitas = Aset + Utang'],
                correct: 0,
                explanation: 'Persamaan dasar akuntansi menyatakan bahwa total Aset selalu seimbang dengan jumlah Kewajiban ditambah Ekuitas Pemilik.',
                xp: 15,
            },
        ],
    },
    FIKP: {
        nama: 'Fakultas Ilmu Kelautan dan Perikanan',
        singkat: 'FIKP (Kelautan & Perikanan)',
        topik: [
            'Oseanografi Fisika & Kimia Laut',
            'Ekologi Perairan Pesisir & Terumbu Karang',
            'Teknologi Budidaya Marikultur',
            'Mikrobiologi Produk Hasil Perikanan',
            'Tata Kelola & Sosial Ekonomi Pesisir',
        ],
        soalAwal: [
            {
                id: 104,
                topik: 'Oseanografi Fisika & Kimia Laut',
                text: 'Salinitas rata-rata air laut di perairan terbuka umumnya berkisar di angka ...',
                options: ['10 – 15 PSU', '20 – 25 PSU', '33 – 37 PSU', '45 – 50 PSU'],
                correct: 2,
                explanation: 'Salinitas normal perairan laut terbuka dunia rata-rata adalah 35 PSU (antara 33 hingga 37 PSU).',
                xp: 15,
            },
        ],
    },
    FKIP: {
        nama: 'Fakultas Keguruan dan Ilmu Pendidikan',
        singkat: 'FKIP (Keguruan & Pendidikan)',
        topik: [
            'Pendidikan Matematika: Aljabar & Kalkulus',
            'Pendidikan Bahasa Indonesia & Sastra',
            'English Grammar & ELT Methodology',
            'Pembelajaran Sains Terapan',
            'Evaluasi Belajar & Kurikulum Merdeka',
        ],
        soalAwal: [
            {
                id: 105,
                topik: 'Pendidikan Matematika: Aljabar & Kalkulus',
                text: 'Nilai dari lim (x→2) (x² − 4) / (x − 2) adalah ...',
                options: ['0', '2', '4', 'Tidak terdefinisi'],
                correct: 2,
                explanation: 'Faktorkan (x-2)(x+2) / (x-2) = x+2. Substitusi x=2 menjadi 2+2 = 4.',
                xp: 15,
            },
        ],
    },
    FISIP: {
        nama: 'Fakultas Ilmu Sosial dan Ilmu Politik',
        singkat: 'FISIP (Sosial & Politik)',
        topik: [
            'Tata Kelola Pemerintahan Daerah & Maritim',
            'Kebijakan Publik & Reformasi Birokrasi',
            'Hukum Laut & Konvensi UNCLOS 1982',
            'Geopolitik Asia Timur & Diplomasi Maritim',
            'Sosiologi Maritim & Komunikasi Digital',
        ],
        soalAwal: [
            {
                id: 106,
                topik: 'Hukum Laut & Konvensi UNCLOS 1982',
                text: 'Berdasarkan UNCLOS 1982, lebar Zona Ekonomi Eksklusif (ZEE) diukur sejauh ...',
                options: ['12 mil laut', '24 mil laut', '200 mil laut', '350 mil laut'],
                correct: 2,
                explanation: 'ZEE diukur sejauh tidak melebihi 200 mil laut dari garis pangkal laut teritorial.',
                xp: 15,
            },
        ],
    },
    FK: {
        nama: 'Fakultas Kedokteran',
        singkat: 'FK (Kedokteran)',
        topik: [
            'Anatomi Klinis & Histologi Dasar',
            'Fisiologi Kardiovaskular & Respirasi',
            'Biokimia Medis & Metabolisme',
            'Farmakologi Klinis Dasar',
            'Etika Kedokteran & Keterampilan Klinis',
        ],
        soalAwal: [
            {
                id: 107,
                topik: 'Fisiologi Kardiovaskular & Respirasi',
                text: 'Pacemaker alami jantung yang menghasilkan impuls denyut pertama kali adalah ...',
                options: ['Nodus Sinoatrial (SA Node)', 'Nodus Atrioventrikular (AV Node)', 'Berkas His', 'Serabut Purkinje'],
                correct: 0,
                explanation: 'Nodus SA (Sinoatrial) berfungsi sebagai perintis ritme denyut jantung alami normal (pacemaker primer).',
                xp: 15,
            },
        ],
    },
};

export const INITIAL_BANK = Object.entries(FAKULTAS_DATA).flatMap(([fKey, fVal]) =>
    fVal.soalAwal.map((s) => ({
        ...s,
        fakultasKey: fKey,
        fakultasNama: fVal.nama,
    }))
);

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const XP_MIN = 5;
const XP_MAX = 20;
const XP_PER_LEVEL = 100;
const CHEST_BONUS_XP = 10;

const INITIAL_MISSIONS = [
    { id: 1, title: 'Lengkapi Profil & Pilih Topik', xp: 20, claimed: false },
    { id: 2, title: 'Atur Jadwal Luang Mingguan', xp: 20, claimed: false },
    { id: 3, title: 'Top-Up atau Pesan Sesi Perdana', xp: 50, claimed: false },
];

/* ------------------------------------------------------------------ */
/* KELAS TOMBOL BERSAMA (mengikuti aturan-warna.md)                    */
/* ------------------------------------------------------------------ */
const BTN_PRIMARY =
    'rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md';
const BTN_OUTLINE =
    'rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200';
const BTN_DANGER =
    'rounded-full border border-red-400 text-red-500 bg-white hover:bg-red-50 font-medium px-4 py-1.5 text-sm flex items-center justify-center gap-1.5 transition-all duration-200';
const BTN_DISABLED =
    'rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none';

/* ------------------------------------------------------------------ */
/* WADAH MODAL                                                         */
/* ------------------------------------------------------------------ */
function ModalShell({ onClose, maxWidth, children }) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4"
            onClick={onClose}
        >
            <div
                className={`relative max-h-[92vh] w-full overflow-y-auto rounded-3xl border border-accent bg-white p-6 shadow-md md:p-8 ${maxWidth}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup"
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-lightBg text-primary transition-all duration-200 hover:bg-accent/30"
                >
                    <X size={18} />
                </button>
                {children}
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/* MODAL KUIS HARIAN (MENTEE)                                          */
/* ------------------------------------------------------------------ */
export function QuizModal({ questions, existingResult, onClose, onFinish }) {
    const [index, setIndex] = useState(0);
    const [selected, setSelected] = useState(null);
    const [checked, setChecked] = useState(false);
    const [correct, setCorrect] = useState(0);
    const [xp, setXp] = useState(0);
    const [result, setResult] = useState(existingResult);

    const total = questions.length;
    const q = questions[index];

    const handleCheck = () => {
        if (selected === null) return;
        setChecked(true);
        if (selected === q.correct) {
            setCorrect((c) => c + 1);
            setXp((x) => x + q.xp);
        }
    };

    const handleNext = () => {
        if (index < total - 1) {
            setIndex((i) => i + 1);
            setSelected(null);
            setChecked(false);
        } else {
            const res = { correct, total, xp };
            setResult(res);
            onFinish(res);
        }
    };

    return (
        <ModalShell onClose={onClose} maxWidth="max-w-lg">
            {/* Kuis kosong */}
            {total === 0 && (
                <div className="py-6 text-center">
                    <BookOpen size={36} className="mx-auto mb-3 text-secondary" />
                    <h3 className="text-xl font-extrabold text-primary">Belum Ada Soal</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Mentor belum menerbitkan soal latihan. Coba lagi nanti ya.
                    </p>
                    <button type="button" onClick={onClose} className={`${BTN_PRIMARY} mx-auto mt-5`}>
                        Tutup
                    </button>
                </div>
            )}

            {/* Hasil kuis */}
            {total > 0 && result && (
                <div className="py-4 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accentYellow text-primary shadow-sm">
                        <Trophy size={32} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-primary">Kuis Selesai!</h3>
                    <p className="mt-2 text-sm text-slate-500">
                        Kamu menjawab benar{' '}
                        <span className="font-bold text-primary">
                            {result.correct} dari {result.total}
                        </span>{' '}
                        soal.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-white">
                        <Sparkles size={12} />+{result.xp} XP
                    </span>
                    <div>
                        <button type="button" onClick={onClose} className={`${BTN_PRIMARY} mx-auto mt-6`}>
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            {/* Soal berjalan */}
            {total > 0 && !result && (
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                        Kuis Harian · {q.topik}
                    </p>
                    <h3 className="mt-1 pr-10 text-xl font-extrabold text-primary">
                        Pertanyaan {index + 1} dari {total}
                    </h3>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-lightBg">
                        <div
                            className="h-full rounded-full bg-secondary transition-all duration-300"
                            style={{ width: `${((index + (checked ? 1 : 0)) / total) * 100}%` }}
                        />
                    </div>

                    <p className="mt-5 text-base font-semibold text-slate-800">{q.text}</p>

                    <div className="mt-4 space-y-2.5">
                        {q.options.map((opt, i) => {
                            const isSelected = selected === i;
                            const isCorrect = checked && i === q.correct;
                            const isWrong = checked && isSelected && i !== q.correct;

                            let style =
                                'border-accent bg-lightBg text-slate-700 hover:border-secondary';
                            if (isSelected && !checked) style = 'border-secondary bg-accent/20 text-primary';
                            if (isCorrect) style = 'border-secondary bg-accent/30 text-primary';
                            if (isWrong) style = 'border-red-400 bg-red-50 text-red-500';

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    disabled={checked}
                                    onClick={() => setSelected(i)}
                                    className={`flex w-full items-center gap-3 rounded-full border px-4 py-2.5 text-left text-sm transition-all duration-200 ${style} ${checked ? 'cursor-default' : ''
                                        }`}
                                >
                                    <span className="font-bold text-secondary">{OPTION_LETTERS[i]}</span>
                                    <span className="flex-1">{opt}</span>
                                    {isCorrect && <CheckCircle2 size={18} className="text-secondary" />}
                                    {isWrong && <XCircle size={18} className="text-red-500" />}
                                </button>
                            );
                        })}
                    </div>

                    {checked && (
                        <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50 p-3.5">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                {selected === q.correct ? `Benar! +${q.xp} XP` : 'Kurang tepat'}
                            </p>
                            <p className="mt-1 text-xs text-slate-600 md:text-sm">{q.explanation}</p>
                        </div>
                    )}

                    <div className="mt-5 flex justify-end">
                        {!checked ? (
                            <button
                                type="button"
                                disabled={selected === null}
                                onClick={handleCheck}
                                className={selected === null ? BTN_DISABLED : BTN_PRIMARY}
                            >
                                Periksa Jawaban
                            </button>
                        ) : (
                            <button type="button" onClick={handleNext} className={BTN_PRIMARY}>
                                {index < total - 1 ? 'Lanjut' : 'Selesai'}
                                <ArrowUpRight size={16} />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </ModalShell>
    );
}

/* ------------------------------------------------------------------ */
/* MODAL QUESTION BUILDER (MENTOR)                                     */
/* ------------------------------------------------------------------ */
function QuestionBuilderModal({ editing, defaultFakultasKey = 'FTKK', onClose, onSubmit }) {
    const [fakultasKey, setFakultasKey] = useState(
        editing?.fakultasKey || defaultFakultasKey
    );
    const availableTopics = FAKULTAS_DATA[fakultasKey]?.topik || FAKULTAS_DATA.FTKK.topik;
    const [topik, setTopik] = useState(
        editing ? editing.topik : (availableTopics[0] || '')
    );
    const [text, setText] = useState(editing ? editing.text : '');
    const [options, setOptions] = useState(
        editing ? [...editing.options] : ['Opsi A', 'Opsi B', 'Opsi C', 'Opsi D']
    );
    const [correct, setCorrect] = useState(editing ? editing.correct : 0);
    const [explanation, setExplanation] = useState(editing ? editing.explanation : '');
    const [xp, setXp] = useState(editing ? editing.xp : 15);
    const [error, setError] = useState('');

    const handleFakultasChange = (newKey) => {
        setFakultasKey(newKey);
        const newTopics = FAKULTAS_DATA[newKey]?.topik || [];
        if (newTopics.length > 0) {
            setTopik(newTopics[0]);
        }
    };

    const setOptionAt = (i, value) => {
        setOptions((prev) => prev.map((o, idx) => (idx === i ? value : o)));
    };

    const handleSubmit = () => {
        if (!text.trim()) {
            setError('Teks soal wajib diisi.');
            return;
        }
        if (options.some((o) => !o.trim())) {
            setError('Semua opsi jawaban (A–D) wajib diisi.');
            return;
        }
        setError('');
        onSubmit({
            id: editing ? editing.id : Date.now(),
            fakultasKey,
            fakultasNama: FAKULTAS_DATA[fakultasKey]?.nama || '',
            topik,
            text: text.trim(),
            options: options.map((o) => o.trim()),
            correct,
            explanation: explanation.trim(),
            xp,
        });
    };

    const fieldBox =
        'w-full rounded-2xl border border-accent bg-lightBg px-4 py-3 text-sm font-medium text-slate-700 placeholder:text-slate-400 transition-all duration-200 focus:border-secondary focus:outline-none';

    return (
        <ModalShell onClose={onClose} maxWidth="max-w-3xl">
            {/* header */}
            <div className="flex items-center gap-3 pr-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lightBg text-secondary">
                    <Pencil size={18} />
                </div>
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                        Question Builder
                    </p>
                    <h3 className="text-2xl font-extrabold text-primary">
                        {editing ? 'Edit Soal Latihan' : 'Terbitkan Soal Latihan'}
                    </h3>
                </div>
            </div>

            {/* pilihan fakultas & topik */}
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-primary">Fakultas</label>
                    <div className="relative">
                        <select
                            value={fakultasKey}
                            onChange={(e) => handleFakultasChange(e.target.value)}
                            className="w-full appearance-none rounded-full border border-accent bg-lightBg px-4 py-2.5 pr-10 text-sm font-bold text-primary transition-all duration-200 focus:border-secondary focus:outline-none"
                        >
                            {Object.entries(FAKULTAS_DATA).map(([key, item]) => (
                                <option key={key} value={key}>
                                    {item.singkat}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-semibold text-primary">Topik Bimbingan</label>
                    <div className="relative">
                        <select
                            value={topik}
                            onChange={(e) => setTopik(e.target.value)}
                            className="w-full appearance-none rounded-full border border-accent bg-lightBg px-4 py-2.5 pr-10 text-sm font-bold text-primary transition-all duration-200 focus:border-secondary focus:outline-none"
                        >
                            {availableTopics.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-primary"
                        />
                    </div>
                </div>
            </div>

            {/* teks soal */}
            <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-primary">Teks Soal</label>
                <textarea
                    rows={3}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tuliskan pertanyaan yang jelas dan tidak ambigu..."
                    className={`${fieldBox} resize-none`}
                />
            </div>

            {/* opsi jawaban */}
            <div className="mt-4">
                <p className="mb-1.5 text-sm font-semibold text-primary">
                    Opsi Jawaban · pilih satu jawaban benar
                </p>
                <div className="space-y-2.5">
                    {options.map((opt, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-2.5 rounded-full border border-accent bg-lightBg px-4 py-2 transition-all duration-200 focus-within:border-secondary"
                        >
                            <input
                                type="radio"
                                name="jawaban-benar"
                                checked={correct === i}
                                onChange={() => setCorrect(i)}
                                aria-label={`Jawaban benar adalah ${OPTION_LETTERS[i]}`}
                                className="h-4 w-4 cursor-pointer accent-secondary"
                            />
                            <span className="text-sm font-bold text-secondary">{OPTION_LETTERS[i]}</span>
                            <input
                                type="text"
                                value={opt}
                                onChange={(e) => setOptionAt(i, e.target.value)}
                                placeholder={`Opsi ${OPTION_LETTERS[i]}`}
                                className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* pembahasan */}
            <div className="mt-4">
                <label className="mb-1.5 block text-sm font-semibold text-primary">Pembahasan</label>
                <textarea
                    rows={3}
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Jelaskan proses mendapatkan jawaban benar..."
                    className={`${fieldBox} resize-none`}
                />
            </div>

            {error && (
                <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-red-500">
                    <XCircle size={14} />
                    {error}
                </p>
            )}

            {/* slider XP + tombol terbit */}
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                    <p className="mb-2 text-sm text-slate-500">
                        Hadiah XP: <span className="font-bold text-primary">{xp} XP</span> · Rentang{' '}
                        {XP_MIN}–{XP_MAX} XP
                    </p>
                    <input
                        type="range"
                        min={XP_MIN}
                        max={XP_MAX}
                        value={xp}
                        onChange={(e) => setXp(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer accent-secondary"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className={`${BTN_PRIMARY} shrink-0 whitespace-nowrap hover:scale-[1.02]`}
                >
                    {editing ? 'Simpan Perubahan' : 'Terbitkan ke Bank Soal'}
                    <ArrowUpRight size={16} />
                </button>
            </div>
        </ModalShell>
    );
}

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */
function MisiDanKuis({ userRole = 'mentee', showSimulation = true }) {
    const role = userRole === 'mentor' ? 'mentor' : 'mentee';

    // state mentee
    const [tab, setTab] = useState('proses');
    const [missions, setMissions] = useState(INITIAL_MISSIONS);
    const [chestClaimed, setChestClaimed] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [quizOpen, setQuizOpen] = useState(false);

    // state mentor
    const [bank, setBank] = useState(INITIAL_BANK);
    const [selectedFakultas, setSelectedFakultas] = useState('ALL');
    const [builderOpen, setBuilderOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [toast, setToast] = useState('');

    // tutup modal saat role berganti
    useEffect(() => {
        setQuizOpen(false);
        setBuilderOpen(false);
        setEditingId(null);
    }, [userRole]);

    // toast otomatis hilang
    useEffect(() => {
        if (!toast) return undefined;
        const t = setTimeout(() => setToast(''), 2400);
        return () => clearTimeout(t);
    }, [toast]);

    /* ---------- turunan state mentee ---------- */
    const missionXp = missions
        .filter((m) => m.claimed)
        .reduce((sum, m) => sum + m.xp, 0);
    const quizXp = quizResult ? quizResult.xp : 0;
    const chestXp = chestClaimed ? CHEST_BONUS_XP : 0;
    const totalXp = missionXp + quizXp + chestXp;
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
    const xpInLevel = totalXp % XP_PER_LEVEL;
    const claimedCount = missions.filter((m) => m.claimed).length;
    const allClaimed = claimedCount === missions.length;
    const streak = quizResult ? 1 : 0;
    const visibleMissions =
        tab === 'proses'
            ? missions.filter((m) => !m.claimed)
            : missions.filter((m) => m.claimed);
    const quizQuestions = bank.slice(0, 3);

    /* ---------- handler mentee ---------- */
    const claimMission = (id) => {
        const target = missions.find((m) => m.id === id);
        if (!target || target.claimed) return;
        setMissions((prev) =>
            prev.map((m) => (m.id === id ? { ...m, claimed: true } : m))
        );
        setToast(`Misi diklaim! +${target.xp} XP`);
    };

    const claimAllMissions = () => {
        const gained = missions
            .filter((m) => !m.claimed)
            .reduce((sum, m) => sum + m.xp, 0);
        setMissions((prev) => prev.map((m) => ({ ...m, claimed: true })));
        if (gained > 0) setToast(`Semua misi diklaim! +${gained} XP`);
    };

    const claimChest = () => {
        if (!allClaimed || chestClaimed) return;
        setChestClaimed(true);
        setToast(`Peti Poin dibuka! +${CHEST_BONUS_XP} XP`);
    };

    const resetMentee = () => {
        setMissions(INITIAL_MISSIONS);
        setChestClaimed(false);
        setQuizResult(null);
        setQuizOpen(false);
        setTab('proses');
        setToast('XP & misi direset (simulasi)');
    };

    const handleQuizFinish = (res) => {
        setQuizResult(res);
        setToast(`Kuis selesai! +${res.xp} XP`);
    };

    /* ---------- handler mentor ---------- */
    const openBuilder = (id = null) => {
        setEditingId(id);
        setBuilderOpen(true);
    };

    const closeBuilder = () => {
        setBuilderOpen(false);
        setEditingId(null);
    };

    const submitQuestion = (question) => {
        const exists = bank.some((b) => b.id === question.id);
        setBank((prev) =>
            exists
                ? prev.map((b) => (b.id === question.id ? question : b))
                : [...prev, question]
        );
        closeBuilder();
        setToast(
            exists ? 'Perubahan soal disimpan' : 'Soal berhasil diterbitkan ke Bank Soal'
        );
    };

    const deleteQuestion = (id) => {
        setBank((prev) => prev.filter((b) => b.id !== id));
        setToast('Soal dihapus dari Bank Soal');
    };

    const resetBank = () => {
        setBank(INITIAL_BANK);
        setToast('Bank soal dikembalikan ke data awal (simulasi)');
    };

    const editingQuestion = bank.find((b) => b.id === editingId) || null;
    const displayedBank =
        selectedFakultas === 'ALL'
            ? bank
            : bank.filter((b) => b.fakultasKey === selectedFakultas);

    return (
        <section className="w-full">
            {/* ================= TAMPILAN MENTOR / MENTEE ================= */}

            {/* ================= TAMPILAN MENTEE ================= */}
            {role === 'mentee' && (
                <div className="mx-auto w-full max-w-md rounded-3xl bg-secondary p-5 text-white shadow-md">
                    {/* tab switch */}
                    <div className="flex items-center justify-between gap-1 rounded-full border border-white/20 bg-white/10 p-1">
                        <span className="pl-3 text-[11px] font-bold uppercase tracking-wider text-accent">
                            Simulasi Misi
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => setTab('proses')}
                                className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-all duration-200 ${tab === 'proses'
                                        ? 'bg-accent text-primary shadow-sm'
                                        : 'text-accent hover:bg-white/10'
                                    }`}
                            >
                                Dalam Proses
                            </button>
                            <button
                                type="button"
                                onClick={() => setTab('diklaim')}
                                className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-all duration-200 ${tab === 'diklaim'
                                        ? 'bg-accent text-primary shadow-sm'
                                        : 'text-accent hover:bg-white/10'
                                    }`}
                            >
                                Semua Diklaim
                            </button>
                        </div>
                    </div>

                    {/* streak */}
                    <div className="mt-4 flex flex-col items-center text-center">
                        <div className="flex items-center gap-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/10">
                                <Flame size={30} className="text-accentYellow" />
                            </div>
                            <span className="text-6xl font-extrabold leading-none">{streak}</span>
                        </div>
                        <p className="mt-3 text-lg font-bold">Hari beruntun</p>
                        <p className="mt-1 text-sm text-accent">
                            {streak === 0
                                ? 'Mulai sesi pertamamu'
                                : 'Pertahankan streak-mu besok!'}
                        </p>
                    </div>

                    {/* level & xp */}
                    <div className="mt-5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-accent">
                        <span>Level {level}</span>
                        <span>
                            {xpInLevel} / {XP_PER_LEVEL} XP
                        </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20">
                        <div
                            className="h-full rounded-full bg-accentYellow transition-all duration-500"
                            style={{ width: `${xpInLevel}%` }}
                        />
                    </div>

                    {/* daftar misi */}
                    <div className="mt-5 rounded-2xl bg-black/15 p-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold">
                                {tab === 'proses'
                                    ? claimedCount === 0
                                        ? 'Misi Pertamamu'
                                        : 'Misi Tersisa'
                                    : allClaimed
                                        ? 'Semua Misi Diklaim'
                                        : 'Misi Diklaim'}
                            </h3>
                            {tab === 'proses' ? (
                                <Sparkles size={18} className="text-accent" />
                            ) : (
                                <Check size={18} className="text-accent" />
                            )}
                        </div>

                        {visibleMissions.length === 0 ? (
                            <p className="py-4 text-center text-sm text-white/80">
                                {tab === 'proses'
                                    ? 'Semua misi sudah diklaim. Cek tab Semua Diklaim ya!'
                                    : 'Belum ada misi yang diklaim.'}
                            </p>
                        ) : (
                            <ul className="mt-2 divide-y divide-white/10">
                                {visibleMissions.map((m) => (
                                    <li key={m.id}>
                                        {tab === 'proses' ? (
                                            <button
                                                type="button"
                                                onClick={() => claimMission(m.id)}
                                                className="flex w-full items-center gap-3 py-3 text-left transition-all duration-200 hover:bg-white/5"
                                            >
                                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-white/40" />
                                                <span className="flex-1 text-sm">{m.title}</span>
                                                <span className="text-sm font-semibold text-accent">
                                                    +{m.xp} XP
                                                </span>
                                            </button>
                                        ) : (
                                            <div className="flex w-full items-center gap-3 py-3">
                                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-accentYellow text-primary">
                                                    <Check size={14} strokeWidth={3} />
                                                </span>
                                                <span className="flex-1 text-sm">{m.title}</span>
                                                <span className="text-sm font-bold text-white">Diklaim</span>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* tombol peti poin */}
                    <button
                        type="button"
                        disabled={!allClaimed || chestClaimed}
                        onClick={claimChest}
                        className={`mt-4 w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                            chestClaimed
                                ? 'rounded-full bg-white/20 text-white/50 cursor-not-allowed select-none'
                                : allClaimed
                                ? 'rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-primary shadow-lg ring-4 ring-amber-300/40 animate-pulse hover:scale-105 hover:brightness-105 cursor-pointer'
                                : 'rounded-full bg-white/10 text-white/40 cursor-not-allowed select-none'
                        }`}
                    >
                        {chestClaimed ? 'Peti Poin Sudah Diklaim' : 'Klaim Peti Poin'}
                        <Sparkles size={18} className={allClaimed && !chestClaimed ? 'animate-spin' : ''} />
                    </button>
                    {!allClaimed && (
                        <p className="mt-2 text-center text-xs text-white/70">
                            Klaim semua misi untuk membuka peti poin.
                        </p>
                    )}
                    {allClaimed && !chestClaimed && (
                        <p className="mt-2 text-center text-xs font-bold text-accentYellow animate-bounce">
                            ✨ Semua misi selesai! Buka peti poin sekarang untuk bonus +10 XP!
                        </p>
                    )}
                </div>
            )}

            {/* ================= TAMPILAN MENTOR ================= */}
            {role === 'mentor' && (
                <div id="bank-soal-mentor" className="mx-auto w-full max-w-2xl rounded-2xl border border-accent/70 bg-white p-5 shadow-sm transition-all duration-200 hover:border-accent">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lightBg text-secondary">
                                <Pencil size={18} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                    Manajemen Soal Kuis
                                </p>
                                <h2 className="text-xl font-extrabold text-primary">Bank Soal Latihan</h2>
                                <p className="text-xs text-slate-500">
                                    {displayedBank.length} soal ditampilkan · {bank.length} total soal
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => openBuilder(null)}
                            className={`${BTN_PRIMARY} shrink-0`}
                        >
                            <Plus size={16} />
                            Buat Soal Baru
                        </button>
                    </div>

                    {/* Filter Fakultas */}
                    <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl bg-lightBg p-2.5">
                        <span className="text-xs font-bold text-primary">Fakultas:</span>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setSelectedFakultas('ALL')}
                                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                                    selectedFakultas === 'ALL'
                                        ? 'bg-secondary text-white shadow-sm'
                                        : 'border border-accent bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                Semua ({bank.length})
                            </button>
                            {Object.entries(FAKULTAS_DATA).map(([fKey, fVal]) => {
                                const count = bank.filter((b) => b.fakultasKey === fKey).length;
                                return (
                                    <button
                                        key={fKey}
                                        type="button"
                                        onClick={() => setSelectedFakultas(fKey)}
                                        className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                                            selectedFakultas === fKey
                                                ? 'bg-secondary text-white shadow-sm'
                                                : 'border border-accent bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {fKey} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {displayedBank.length === 0 ? (
                        <div className="mt-5 rounded-xl border border-dashed border-accent bg-lightBg p-6 text-center">
                            <BookOpen size={28} className="mx-auto mb-2 text-secondary" />
                            <p className="text-sm font-semibold text-primary">Belum ada soal untuk fakultas ini</p>
                            <p className="mt-1 text-xs text-slate-500">
                                Klik "Buat Soal Baru" untuk menerbitkan soal latihan di fakultas ini.
                            </p>
                        </div>
                    ) : (
                        <ul className="mt-5 space-y-3">
                            {displayedBank.map((b, i) => (
                                <li
                                    key={b.id}
                                    className="rounded-xl border border-accent/50 bg-[#F8FAF9] p-3 transition-all duration-200 hover:border-accent"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {b.fakultasKey && (
                                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                                        {b.fakultasKey}
                                                    </span>
                                                )}
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
                                                    {b.topik}
                                                </span>
                                                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold text-white">
                                                    +{b.xp} XP
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm font-semibold text-slate-700">{b.text}</p>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Jawaban benar:{' '}
                                                <span className="font-bold text-secondary">
                                                    {OPTION_LETTERS[b.correct]}
                                                </span>{' '}
                                                · {b.options[b.correct]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex flex-wrap justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openBuilder(b.id)}
                                            className="flex items-center gap-1.5 rounded-full border border-secondary bg-white px-4 py-1.5 text-sm font-medium text-secondary transition-all duration-200 hover:bg-secondary/10"
                                        >
                                            <Pencil size={14} />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteQuestion(b.id)}
                                            className={BTN_DANGER}
                                        >
                                            <Trash2 size={14} />
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* ---------------- MODAL ---------------- */}
            {role === 'mentee' && quizOpen && (
                <QuizModal
                    questions={quizQuestions}
                    existingResult={quizResult}
                    onClose={() => setQuizOpen(false)}
                    onFinish={handleQuizFinish}
                />
            )}

            {role === 'mentor' && builderOpen && (
                <QuestionBuilderModal
                    key={editingId === null ? 'baru' : editingId}
                    editing={editingQuestion}
                    defaultFakultasKey={selectedFakultas === 'ALL' ? 'FTKK' : selectedFakultas}
                    onClose={closeBuilder}
                    onSubmit={submitQuestion}
                />
            )}

            {/* ---------------- TOAST ---------------- */}
            {toast && (
                <div className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-accent/70 bg-white px-4 py-2 text-xs font-semibold text-primary shadow-md transition-all duration-200">
                    <Target size={14} className="text-secondary" />
                    {toast}
                </div>
            )}
        </section>
    );
}

export default MisiDanKuis;