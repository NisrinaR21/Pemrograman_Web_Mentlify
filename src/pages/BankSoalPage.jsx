import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Pencil,
    Trash2,
    Plus,
    BookOpen,
    ArrowLeft,
    Check,
    Target,
} from 'lucide-react';
import { FAKULTAS_DATA, INITIAL_BANK } from '../components/page02-dasbor/MisiDanKuis.jsx';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];
const XP_MIN = 5;
const XP_MAX = 20;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4" onClick={onClose}>
            <div
                className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-accent bg-white p-6 shadow-xl md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 pr-10">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lightBg text-secondary">
                        <Pencil size={18} />
                    </div>
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                            Question Builder
                        </p>
                        <h3 className="text-2xl font-extrabold text-primary">
                            {editing ? 'Edit Soal Latihan' : 'Terbitkan Soal Latihan Baru'}
                        </h3>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-primary">Fakultas</label>
                        <select
                            value={fakultasKey}
                            onChange={(e) => handleFakultasChange(e.target.value)}
                            className="w-full rounded-full border border-accent bg-lightBg px-4 py-2.5 text-sm font-bold text-primary focus:border-secondary focus:outline-none"
                        >
                            {Object.entries(FAKULTAS_DATA).map(([key, item]) => (
                                <option key={key} value={key}>
                                    {item.singkat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-semibold text-primary">Topik Bimbingan</label>
                        <select
                            value={topik}
                            onChange={(e) => setTopik(e.target.value)}
                            className="w-full rounded-full border border-accent bg-lightBg px-4 py-2.5 text-sm font-bold text-primary focus:border-secondary focus:outline-none"
                        >
                            {availableTopics.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="mb-1.5 block text-sm font-semibold text-primary">Teks Soal</label>
                    <textarea
                        rows={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Tuliskan pertanyaan latihan secara jelas..."
                        className={`${fieldBox} resize-none`}
                    />
                </div>

                <div className="mt-4">
                    <p className="mb-1.5 text-sm font-semibold text-primary">
                        Opsi Jawaban (Pilih radio untuk jawaban yang benar)
                    </p>
                    <div className="space-y-2.5">
                        {options.map((opt, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-2.5 rounded-full border border-accent bg-lightBg px-4 py-2 focus-within:border-secondary"
                            >
                                <input
                                    type="radio"
                                    name="jawaban-benar-modal"
                                    checked={correct === i}
                                    onChange={() => setCorrect(i)}
                                    className="h-4 w-4 cursor-pointer accent-secondary"
                                />
                                <span className="text-sm font-bold text-secondary">{OPTION_LETTERS[i]}</span>
                                <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => setOptionAt(i, e.target.value)}
                                    placeholder={`Opsi ${OPTION_LETTERS[i]}`}
                                    className="flex-1 bg-transparent text-sm text-slate-700 focus:outline-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4">
                    <label className="mb-1.5 block text-sm font-semibold text-primary">Pembahasan Jawaban</label>
                    <textarea
                        rows={2}
                        value={explanation}
                        onChange={(e) => setExplanation(e.target.value)}
                        placeholder="Penjelasan langkah jawaban..."
                        className={`${fieldBox} resize-none`}
                    />
                </div>

                {error && <p className="mt-2 text-xs font-semibold text-red-500">{error}</p>}

                <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
                    <div className="flex-1">
                        <p className="mb-2 text-sm text-slate-500">
                            Hadiah XP: <span className="font-bold text-primary">{xp} XP</span>
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
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="rounded-full bg-secondary px-6 py-2 text-sm font-bold text-white shadow-sm hover:brightness-110"
                        >
                            {editing ? 'Simpan Perubahan' : 'Terbitkan Soal'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BankSoalPage() {
    const navigate = useNavigate();
    const [bank, setBank] = useState(INITIAL_BANK);
    const [selectedFakultas, setSelectedFakultas] = useState('ALL');
    const [builderOpen, setBuilderOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [toast, setToast] = useState('');

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
        setToast(exists ? 'Perubahan soal disimpan' : 'Soal berhasil diterbitkan ke Bank Soal');
        setTimeout(() => setToast(''), 2400);
    };

    const deleteQuestion = (id) => {
        setBank((prev) => prev.filter((b) => b.id !== id));
        setToast('Soal dihapus dari Bank Soal');
        setTimeout(() => setToast(''), 2400);
    };

    const displayedBank =
        selectedFakultas === 'ALL'
            ? bank
            : bank.filter((b) => b.fakultasKey === selectedFakultas);

    const editingQuestion = bank.find((b) => b.id === editingId) || null;

    return (
        <div className="min-h-screen bg-lightBg pb-16 font-sans">
            <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
                {/* Tombol Kembali di kiri (selaras semua page) */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={() => navigate('/mentor/dasbor')}
                        className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-white px-4 py-2 text-xs font-bold text-secondary shadow-sm transition-all hover:bg-secondary/10"
                    >
                        <ArrowLeft size={14} />
                        Kembali ke Dasbor
                    </button>
                </div>

                {/* Header */}
                <div className="rounded-3xl border border-accent/70 bg-white p-6 shadow-sm md:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3.5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-white shadow-sm">
                                <BookOpen size={22} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                    Bank Soal Khusus Mentor
                                </p>
                                <h1 className="text-2xl font-extrabold text-primary md:text-3xl">
                                    Manajemen Bank Soal Latihan
                                </h1>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    {displayedBank.length} soal ditampilkan · {bank.length} total soal dalam sistem
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => openBuilder(null)}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:brightness-110"
                        >
                            <Plus size={16} />
                            Buat Soal Baru
                        </button>
                    </div>

                    {/* Filter Fakultas */}
                    <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl bg-lightBg p-3">
                        <span className="text-xs font-bold text-primary mr-1">Fakultas:</span>
                        <div className="flex flex-wrap items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => setSelectedFakultas('ALL')}
                                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
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
                                        className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
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
                </div>

                {/* Daftar Soal */}
                <div className="mt-6">
                    {displayedBank.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-accent bg-white p-12 text-center shadow-sm">
                            <BookOpen size={36} className="mx-auto mb-3 text-secondary/60" />
                            <h3 className="text-base font-bold text-primary">Belum ada soal untuk fakultas ini</h3>
                            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                                Klik tombol "Buat Soal Baru" di atas untuk menambahkan materi latihan perdana.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-3.5">
                            {displayedBank.map((b, i) => (
                                <li
                                    key={b.id}
                                    className="rounded-2xl border border-accent/70 bg-white p-5 shadow-sm transition-all hover:border-secondary/60 hover:shadow-md"
                                >
                                    <div className="flex items-start gap-3.5">
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                {b.fakultasKey && (
                                                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                                                        {b.fakultasKey}
                                                    </span>
                                                )}
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-secondary">
                                                    {b.topik}
                                                </span>
                                                <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-white">
                                                    +{b.xp} XP
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm font-semibold text-slate-800">{b.text}</p>
                                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                {b.options.map((opt, oIdx) => (
                                                    <div
                                                        key={oIdx}
                                                        className={`flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium border ${
                                                            oIdx === b.correct
                                                                ? 'border-secondary bg-emerald-50 text-secondary font-bold'
                                                                : 'border-slate-100 bg-slate-50 text-slate-600'
                                                        }`}
                                                    >
                                                        <span className="font-bold">{OPTION_LETTERS[oIdx]}.</span>
                                                        <span>{opt}</span>
                                                        {oIdx === b.correct && (
                                                            <Check size={14} className="ml-auto text-secondary" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            {b.explanation && (
                                                <p className="mt-2 text-xs text-slate-500 italic bg-lightBg/60 p-2.5 rounded-xl">
                                                    💡 Pembahasan: {b.explanation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
                                        <button
                                            type="button"
                                            onClick={() => openBuilder(b.id)}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-secondary bg-white px-4 py-1.5 text-xs font-bold text-secondary hover:bg-secondary/10"
                                        >
                                            <Pencil size={12} />
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteQuestion(b.id)}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-red-300 bg-white px-4 py-1.5 text-xs font-bold text-red-500 hover:bg-red-50"
                                        >
                                            <Trash2 size={12} />
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Modal Builder */}
            {builderOpen && (
                <QuestionBuilderModal
                    key={editingId === null ? 'baru' : editingId}
                    editing={editingQuestion}
                    defaultFakultasKey={selectedFakultas === 'ALL' ? 'FTKK' : selectedFakultas}
                    onClose={closeBuilder}
                    onSubmit={submitQuestion}
                />
            )}

            {/* Toast */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full border border-accent/70 bg-white px-4 py-2 text-xs font-bold text-primary shadow-lg">
                    <Target size={14} className="text-secondary" />
                    {toast}
                </div>
            )}
        </div>
    );
}

