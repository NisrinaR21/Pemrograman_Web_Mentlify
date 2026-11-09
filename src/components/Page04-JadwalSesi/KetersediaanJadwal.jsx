import { useState } from 'react';
import {
    ArrowLeft,
    Bell,
    CalendarDays,
    Clock,
    GraduationCap,
    Plus,
    ShieldCheck,
    X,
    ArrowUpRight,
} from 'lucide-react';

/* ============================================================
   DATA DUMMY
   ============================================================ */
const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

const INITIAL_SLOTS = {
    Senin: [
        { id: 1, start: '08:00', end: '09:00', isActive: true },
        { id: 2, start: '16:00', end: '17:00', isActive: true },
    ],
    Selasa: [{ id: 3, start: '10:00', end: '11:00', isActive: false }],
    Rabu: [
        { id: 4, start: '09:00', end: '10:00', isActive: true },
        { id: 5, start: '14:00', end: '15:00', isActive: false },
        { id: 6, start: '19:00', end: '20:00', isActive: true },
    ],
    Kamis: [{ id: 7, start: '13:00', end: '14:00', isActive: true }],
    Jumat: [],
    Sabtu: [
        { id: 8, start: '09:00', end: '10:00', isActive: true },
        { id: 9, start: '10:00', end: '11:00', isActive: true },
    ],
    Minggu: [],
};

// Kandidat jam mulai untuk tombol "Tambah Slot Waktu"
const CANDIDATE_STARTS = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
];

const addOneHour = (time) => {
    const [h, m] = time.split(':').map(Number);
    return `${String((h + 1) % 24).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

/* ============================================================
   KOMPONEN KECIL
   ============================================================ */
function Toggle({ isActive, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-full border px-2 py-1 pr-3 text-sm font-bold transition-all ${isActive
                    ? 'border-accent bg-accent/10 text-primary'
                    : 'border-slate-200 bg-white text-slate-400'
                }`}
        >
            <span
                className={`h-5 w-5 rounded-full transition-all ${isActive ? 'bg-secondary' : 'bg-slate-300'
                    }`}
            />
            {isActive ? 'Aktif' : 'Nonaktif'}
        </button>
    );
}

function SlotCard({ slot, onToggle, onDelete }) {
    return (
        <div
            className={`rounded-2xl border p-4 shadow-sm transition-all ${slot.isActive
                    ? 'border-secondary bg-[#F8FAF9]'
                    : 'border-transparent bg-[#F8FAF9]/70'
                }`}
        >
            <p
                className={`text-xs font-semibold uppercase tracking-wide ${slot.isActive ? 'text-primary/70' : 'text-primary/40'
                    }`}
            >
                Waktu Bimbingan
            </p>

            <div className="mt-1.5 flex items-center gap-3">
                <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white ${slot.isActive ? 'text-secondary' : 'text-secondary/50'
                        }`}
                >
                    <Clock size={18} />
                </span>
                <p
                    className={`text-xl font-bold ${slot.isActive ? 'text-primary' : 'text-primary/50'
                        }`}
                >
                    {slot.start} - {slot.end}
                </p>
            </div>

            <p
                className={`mt-1 text-sm ${slot.isActive ? 'text-primary/70' : 'text-primary/40'
                    }`}
            >
                Durasi 60 menit
            </p>

            <div className="mt-3 flex items-center justify-between">
                <Toggle isActive={slot.isActive} onClick={onToggle} />
                <button
                    type="button"
                    onClick={onDelete}
                    aria-label={`Hapus slot ${slot.start} - ${slot.end}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-red-200 bg-white text-red-400 transition-all hover:bg-red-50 hover:text-red-500"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}

/* ============================================================
   KOMPONEN UTAMA
   ============================================================ */
export default function KetersediaanJadwal({ onBack }) {
    const [activeDay, setActiveDay] = useState('Rabu');
    const [slotsByDay, setSlotsByDay] = useState(INITIAL_SLOTS);

    const slots = slotsByDay[activeDay];
    const activeCount = slots.filter((s) => s.isActive).length;

    const updateDay = (updater) =>
        setSlotsByDay((prev) => ({ ...prev, [activeDay]: updater(prev[activeDay]) }));

    const handleToggle = (id) =>
        updateDay((list) =>
            list.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
        );

    const handleDelete = (id) => updateDay((list) => list.filter((s) => s.id !== id));

    const nextStart = CANDIDATE_STARTS.find(
        (t) => !slots.some((s) => s.start === t)
    );

    const handleAdd = () => {
        if (!nextStart) return;
        const newSlot = {
            id: Date.now(),
            start: nextStart,
            end: addOneHour(nextStart),
            isActive: true,
        };
        updateDay((list) =>
            [...list, newSlot].sort((a, b) => a.start.localeCompare(b.start))
        );
    };

    return (
        <div className="min-h-screen bg-lightBg p-4 sm:p-8">
            <div className="mx-auto max-w-5xl">
                {/* Tombol Kembali di kiri (selaras semua page) */}
                <div className="mb-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-white px-4 py-2 text-xs font-bold text-secondary shadow-sm transition-all hover:bg-secondary/10"
                    >
                        <ArrowLeft size={14} />
                        Kembali ke Jadwal Bimbingan
                    </button>
                </div>

                {/* Header halaman */}
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    Ketersediaan Jadwal
                </p>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-light text-primary sm:text-4xl">
                            Manajemen Ketersediaan Jadwal
                        </h1>
                        <p className="mt-2 text-sm text-primary/70">
                            Atur slot waktu mingguan yang dapat dipilih oleh calon Mentee.
                        </p>
                    </div>
                </div>

                {/* Kartu utama */}
                <section className="mt-8 rounded-3xl border border-accent bg-white p-6 shadow-sm">
                    {/* Tab hari */}
                    <div className="flex items-center justify-between overflow-x-auto rounded-full bg-slate-100 p-1.5">
                        {DAYS.map((day) => {
                            const isCurrent = day === activeDay;
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => setActiveDay(day)}
                                    className={`flex-1 whitespace-nowrap rounded-full px-6 py-2.5 text-sm transition-all ${isCurrent
                                            ? 'bg-secondary font-bold text-white shadow-md'
                                            : 'font-semibold text-primary/70 hover:text-primary'
                                        }`}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {/* Hari terpilih */}
                    <div className="mt-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lightBg text-secondary">
                                <CalendarDays size={20} />
                            </span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-secondary">
                                    Hari Terpilih
                                </p>
                                <h2 className="text-2xl font-extrabold text-primary">
                                    {activeDay}
                                </h2>
                            </div>
                        </div>
                        <span className="rounded-full bg-lightBg px-4 py-1.5 text-sm font-bold text-primary">
                            {activeCount} slot aktif
                        </span>
                    </div>

                    {/* Daftar slot */}
                    {slots.length > 0 ? (
                        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                            {slots.map((slot) => (
                                <SlotCard
                                    key={slot.id}
                                    slot={slot}
                                    onToggle={() => handleToggle(slot.id)}
                                    onDelete={() => handleDelete(slot.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-5 rounded-2xl border border-dashed border-accent/60 bg-[#F8FAF9] px-4 py-8 text-center">
                            <p className="text-sm font-bold text-primary">
                                Belum ada slot di hari {activeDay}
                            </p>
                            <p className="mt-1 text-sm text-primary/60">
                                Tambahkan slot waktu agar calon Mentee bisa memesan sesi.
                            </p>
                        </div>
                    )}

                    {/* Tombol tambah */}
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!nextStart}
                        className="mt-5 flex items-center gap-2 rounded-full border-2 border-secondary px-4 py-2 font-bold text-secondary transition-all hover:bg-secondary/10 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent"
                    >
                        <Plus size={16} />
                        Tambah Slot Waktu
                    </button>

                    {/* Informasi ketersediaan */}
                    <div className="mt-5 rounded-xl bg-lightBg p-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-secondary" />
                            <p className="text-sm font-bold text-primary">
                                Informasi Ketersediaan
                            </p>
                        </div>
                        <p className="mt-1 pl-6 text-sm text-primary/70">
                            Slot jadwal ini akan dipilih oleh calon Mentee saat melakukan
                            booking. Pastikan jadwal Anda akurat dan selalu perbarui jika ada
                            perubahan.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}