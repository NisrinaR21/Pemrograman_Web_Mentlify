import { useEffect, useState, useRef, useCallback } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  FileCheck,
  FileText,
  GraduationCap,
  Hourglass,
  Lock,
  Mail,
  RotateCcw,
  Sparkles,
  Star,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import logoWhite from '../../assets/logo-white.png';
import logoBiru from '../../assets/logo-biru.png';

/* ------------------------------------------------------------------ */
/*  Konfigurasi & data dummy                                           */
/* ------------------------------------------------------------------ */

const LOCK_DURATION = 14 * 60 + 59; // 14:59
const RESEND_DURATION = 59; // detik
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_ATTEMPTS = 3;
const SAMPLE_FILE_SIZE = 2516582; // ≈ 2.4 MB
const SAMPLE_SUBMISSION = { id: '#MTL-2025-0842', sentAt: '24 Mei 2025, 10.32 WIB' };

const FAKULTAS_DATA = {
  'Fakultas Teknik dan Teknologi Kemaritiman': [
    'Teknik Informatika',
    'Teknik Elektro',
    'Teknik Perkapalan',
    'Kimia',
    'Teknik Industri',
    'Teknik Sipil',
    'Perencanaan Wilayah dan Kota',
    'Arsitektur',
  ],
  'Fakultas Ekonomi dan Bisnis Maritim': [
    'Akuntansi',
    'Manajemen',
    'Bisnis Digital',
    'Kewirausahaan',
    'Perdagangan Internasional',
  ],
  'Fakultas Ilmu Kelautan dan Perikanan': [
    'Ilmu Kelautan',
    'Manajemen Sumberdaya Perairan',
    'Budidaya Perairan',
    'Teknologi Hasil Perikanan',
    'Sosial Ekonomi Perikanan',
  ],
  'Fakultas Keguruan dan Ilmu Pendidikan': [
    'Pendidikan Bahasa dan Sastra Indonesia',
    'Pendidikan Bahasa Inggris',
    'Pendidikan Matematika',
    'Pendidikan Biologi',
    'Pendidikan Kimia',
    'Pendidikan Fisika',
    'Sejarah',
    'Pendidikan Profesi Guru (Profesi)',
  ],
  'Fakultas Ilmu Sosial dan Ilmu Politik': [
    'Ilmu Pemerintahan',
    'Administrasi Publik',
    'Sosiologi',
    'Ilmu Hukum',
    'Hubungan Internasional',
    'Kajian Film, Televisi, dan Media',
  ],
  'Fakultas Kedokteran': [
    'Kedokteran',
    'Pendidikan Profesi Kedokteran',
  ],
};

const TESTIMONIAL = {
  rating: 5,
  quote:
    '“Mentor di Mentlify bikin materi statistik yang rumit jadi terasa sederhana. Nilai saya naik dalam satu semester!”',
  initials: 'AR',
  name: 'Alya Rahmani',
  role: 'Mentee · Universitas Maritim Raja Ali Haji',
};

const REGISTER_BENEFITS = [
  'Mentor lintas kampus terverifikasi',
  'Jadwal belajar yang fleksibel',
  'Ruang belajar aman dan terarah',
];

const PASSWORD_RULES = [
  { id: 'length', label: 'Min. 8 Karakter', test: (value) => value.length >= 8 },
  { id: 'letter', label: 'Mengandung Huruf', test: (value) => /[A-Za-z]/.test(value) },
  { id: 'number', label: 'Mengandung Angka', test: (value) => /\d/.test(value) },
];

const EMPTY_REGISTER_FORM = {
  nama: '',
  fakultas: '',
  prodi: '',
  email: '',
  password: '',
  konfirmasi: '',
};

const SAMPLE_REGISTER_DATA = {
  mentee: {
    nama: 'Alya Rahmani',
    fakultas: 'Fakultas Teknik dan Teknologi Kemaritiman',
    prodi: 'Teknik Informatika',
    email: 'alya.rahmani@umrah.ac.id',
    password: 'belajar2026',
    konfirmasi: 'belajar2026',
  },
  mentorMahasiswa: {
    nama: 'Raka Pratama',
    fakultas: 'Fakultas Teknik dan Teknologi Kemaritiman',
    prodi: 'Teknik Elektro',
    email: 'raka.pratama@umrah.ac.id',
    password: 'mentor2026',
    konfirmasi: 'mentor2026',
  },
  mentorAlumni: {
    nama: 'Dinda Safitri',
    fakultas: 'Fakultas Ekonomi dan Bisnis Maritim',
    prodi: 'Manajemen',
    email: 'dinda.safitri@gmail.com',
    password: 'alumni2026',
    konfirmasi: 'alumni2026',
  },
};

const DEFAULT_APPLICANT = {
  nama: 'Nadia Putri',
  email: 'nadia.putri@umrah.ac.id',
  mentorStatus: 'mahasiswa',
};

const DOCUMENT_TYPES = {
  mahasiswa: {
    label: 'Mahasiswa Aktif',
    uploadTitle: 'Unggah KTM / Surat Aktif',
    shortName: 'KTM / Surat Aktif',
    filePrefix: 'KTM',
    fileSuffix: 'Semester6',
  },
  alumni: {
    label: 'Alumni',
    uploadTitle: 'Unggah Ijazah / SKL',
    shortName: 'Ijazah / SKL',
    filePrefix: 'Ijazah',
    fileSuffix: '2024',
  },
};

const STEP_DEFINITIONS = [
  { id: 1, label: 'Data Diri' },
  { id: 2, label: 'Unggah Dokumen' },
  { id: 3, label: 'Review Admin' },
];

const REJECTION_REASONS = [
  {
    judul: 'Dokumen buram',
    catatan: 'Pastikan seluruh tulisan terlihat jelas dan tidak terpotong.',
  },
  {
    judul: 'Dokumen tidak sesuai',
    catatan: 'Unggah KTM atau surat aktif kuliah yang masih berlaku.',
  },
  {
    judul: 'Data tidak cocok',
    catatan: 'Nama pada dokumen harus sama dengan nama yang kamu daftarkan.',
  },
];

/* ------------------------------------------------------------------ */
/*  Kelas Tailwind yang dipakai ulang                                  */
/* ------------------------------------------------------------------ */

const EYEBROW = 'text-xs font-bold uppercase tracking-[0.18em] text-secondary';
const INPUT_BASE =
  'w-full rounded-2xl border border-accent bg-white px-4 py-3 text-sm font-medium text-primary outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-secondary focus:ring-4 focus:ring-secondary/10';
const INPUT_CLASS = INPUT_BASE;
const PRIMARY_BUTTON =
  'flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-4 text-base font-medium text-white shadow-lg shadow-secondary/30 transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:brightness-100';

/* ------------------------------------------------------------------ */
/*  Helper umum                                                        */
/* ------------------------------------------------------------------ */

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function getFileExtension(fileName) {
  const parts = fileName.split('.');
  return parts.length > 1 ? parts.pop().toUpperCase() : 'FILE';
}

function getInitials(fullName) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

function getFirstName(fullName) {
  return fullName.split(' ').filter(Boolean)[0] || 'Mentor';
}

function formatSentAt(date) {
  const day = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  }).format(date);
  const time = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta',
  })
    .format(date)
    .replace(':', '.');
  return `${day}, ${time} WIB`;
}

function createSubmissionId() {
  const year = new Date().getFullYear();
  const serial = Math.floor(1000 + Math.random() * 9000);
  return `#MTL-${year}-${serial}`;
}

function getStepStates(approvalStatus) {
  if (approvalStatus === 'belum_unggah') return ['done', 'active', 'pending'];
  if (approvalStatus === 'disetujui') return ['done', 'done', 'done'];
  return ['done', 'done', 'active']; // menunggu & ditolak
}

function getStepCaption(stepIndex, state) {
  if (state === 'done') return 'Selesai';
  if (state === 'pending') return 'Pending';
  return stepIndex === 1 ? 'Aktif' : 'Berjalan';
}

export function Logo({ variant }) {
  const isWhite = variant === 'white';
  const imageSrc = isWhite ? logoWhite : logoBiru;

  if (imageSrc) {
    return <img src={imageSrc} alt="Mentlify" className="h-10 w-auto" />;
  }

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-extrabold ${
          isWhite ? 'bg-white text-secondary' : 'bg-secondary text-white'
        }`}
      >
        M
      </span>
      <span
        className={`text-3xl font-extrabold tracking-tight ${
          isWhite ? 'text-white' : 'text-secondary'
        }`}
      >
        Mentlify
      </span>
    </div>
  );
}

function Field({ label, htmlFor, error, hint, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold text-primary">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>
      )}
    </div>
  );
}

export function SimulationBar({ items, showFillSample, onFillSample }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="sticky top-0 z-50 bg-primary text-white shadow-md">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 py-2 text-xs">
        <span className="font-bold">🛠️ Simulasi Presentasi:</span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 font-semibold transition-all duration-200 hover:bg-white/20"
        >
          Simulasi State
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open &&
          items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={`rounded-full px-3 py-1 transition-all duration-200 ${
                item.active
                  ? 'bg-accent text-primary font-bold shadow-sm'
                  : 'bg-white/10 text-white/90 hover:bg-white/20'
              }`}
            >
              {item.label}
            </button>
          ))}

        {open && showFillSample && (
          <button
            type="button"
            onClick={onFillSample}
            className="ml-auto rounded-full bg-accent/20 px-3 py-1 font-semibold text-accent transition-all duration-200 hover:bg-accent/30"
          >
            Isi Contoh
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Halaman Login                                                      */
/* ------------------------------------------------------------------ */

function LoginPage({
  form,
  setForm,
  showPassword,
  setShowPassword,
  locked,
  lockSeconds,
  onSubmit,
  onGoRegister,
  onForgotPassword,
}) {
  return (
    <div className="grid flex-1 md:grid-cols-[38%_1fr]">
      {/* Panel kiri (branding) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-[#1C4E80] to-[#0D2847] p-8 text-white md:flex md:flex-col lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"
        />

        <div className="relative">
          <Logo variant="white" />
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Belajar lintas kampus, tumbuh bersama
          </div>

          <h1 className="mt-8 text-3xl font-extrabold leading-[1.1] tracking-tight lg:text-4xl xl:text-5xl">
            Belajar Lebih Dekat
            <br />
            Bersama Mentor
            <br />
            Antar-Kampus
          </h1>

          <p className="mt-6 max-w-[380px] text-sm leading-relaxed text-white/80">
            Terhubung dengan mentor berpengalaman dan capai target akademikmu melalui sesi belajar
            yang personal.
          </p>
        </div>

        {/* Kartu testimonial */}
        <div className="relative z-10 mt-auto rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
          <div className="flex gap-1 text-accentYellow">
            {Array.from({ length: TESTIMONIAL.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/90">{TESTIMONIAL.quote}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {TESTIMONIAL.initials}
            </span>
            <div>
              <p className="text-xs font-bold">{TESTIMONIAL.name}</p>
              <p className="text-[11px] text-white/70">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent/30 blur-2xl"
        />
      </aside>

      {/* Panel kanan (form) */}
      <main className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16">
        <div className="w-full max-w-[476px]">
          <div className="mb-8 md:hidden">
            <Logo variant="color" />
          </div>

          <p className={EYEBROW}>Portal Anggota</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-primary">
            Selamat Datang Kembali
          </h2>
          <p className="mt-2 text-sm text-primary/70">
            Masuk untuk mengakses jadwal sesi, materi belajar, dan profil mentormu.
          </p>

          {locked && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-700"
            >
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <div>
                <p className="font-bold">Akun Dikunci Sementara</p>
                <p className="mt-0.5 text-red-600">
                  Terlalu banyak percobaan login gagal. Silakan tunggu{' '}
                  <span className="font-bold text-red-700">{formatTime(lockSeconds)}</span> sebelum
                  mencoba lagi.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <Field label="Email" htmlFor="login-email">
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="nama@kampus.ac.id"
                disabled={locked}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`${INPUT_CLASS} ${locked ? 'cursor-not-allowed bg-slate-100' : ''}`}
              />
            </Field>

            <Field label="Kata Sandi" htmlFor="login-password">
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi"
                  disabled={locked}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`${INPUT_CLASS} pr-12 ${locked ? 'cursor-not-allowed bg-slate-100' : ''}`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 font-medium text-primary/80">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                  className="h-4 w-4 rounded border-accent text-secondary focus:ring-secondary/20"
                />
                Ingat Saya
              </label>

              <button
                type="button"
                onClick={onForgotPassword}
                className="font-semibold text-secondary hover:underline"
              >
                Lupa Kata Sandi?
              </button>
            </div>

            <button type="submit" disabled={locked} className={PRIMARY_BUTTON}>
              Masuk Sekarang
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary/70">
            Belum punya akun?{' '}
            <button
              type="button"
              onClick={onGoRegister}
              className="font-medium text-secondary transition-all duration-200 hover:underline"
            >
              Daftar gratis
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Halaman Register                                                   */
/* ------------------------------------------------------------------ */

function RegisterPage({
  role,
  setRole,
  mentorStatus,
  setMentorStatus,
  form,
  onChangeField,
  errors,
  agree,
  setAgree,
  onSubmit,
  onGoLogin,
}) {
  const isAlumni = role === 'mentor' && mentorStatus === 'alumni';
  const availableProdi = form.fakultas ? FAKULTAS_DATA[form.fakultas] || [] : [];

  return (
    <div className="grid flex-1 md:grid-cols-[38%_1fr]">
      {/* Panel kiri (branding) */}
      <aside className="relative hidden overflow-hidden bg-lightBg p-8 md:flex md:flex-col lg:p-12">
        <div className="relative z-10">
          <Logo variant="color" />
          <span className="mt-8 inline-block rounded-full border border-accent bg-white px-3.5 py-1.5 text-xs font-semibold text-secondary">
            Mulai dari sini
          </span>

          <h1 className="mt-6 text-3xl font-extrabold leading-[1.1] tracking-tight text-primary lg:text-4xl xl:text-5xl">
            Satu akun,
            <br />
            banyak peluang
            <br />
            untuk
            <br />
            bertumbuh.
          </h1>

          <p className="mt-6 max-w-[400px] text-sm leading-relaxed text-primary/80">
            Temukan mentor terbaik atau bagikan keahlianmu kepada ribuan mahasiswa di seluruh
            Indonesia.
          </p>
        </div>

        <ul className="relative z-10 mt-auto space-y-4 pt-10">
          {REGISTER_BENEFITS.map((benefit) => (
            <li key={benefit} className="flex items-center gap-3 text-sm font-bold text-primary">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
                <Check className="h-4 w-4 text-secondary" strokeWidth={3} />
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[237px] -right-[220px] h-[440px] w-[440px] rounded-full bg-accent/50"
        >
          <div className="absolute left-[93px] top-4 h-[85px] w-[85px] rounded-2xl border border-white/60 bg-white/50" />
        </div>
      </aside>

      {/* Panel kanan (form) */}
      <main className="flex items-center justify-center bg-white px-6 py-12 md:px-8 lg:px-14">
        <div className="w-full max-w-[612px]">
          <div className="mb-8 md:hidden">
            <Logo variant="color" />
          </div>

          <p className={EYEBROW}>Buat Akun Baru</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-primary">
            Bergabung dengan Mentlify
          </h2>

          {/* Toggle Mentee / Mentor */}
          <div
            role="tablist"
            aria-label="Pilih peran"
            className="mt-7 grid grid-cols-2 rounded-full bg-slate-100 p-1.5"
          >
            {[
              { value: 'mentee', label: 'Mentee' },
              { value: 'mentor', label: 'Mentor' },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={role === tab.value}
                onClick={() => setRole(tab.value)}
                className={`rounded-full py-3 text-base font-medium transition-all duration-200 ${
                  role === tab.value
                    ? 'bg-white text-secondary shadow-md'
                    : 'text-slate-500 hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-6">
            {role === 'mentor' && (
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status Mentor
                </p>
                <div role="radiogroup" aria-label="Status mentor" className="mt-3 flex gap-3">
                  {[
                    { value: 'mahasiswa', label: 'Mahasiswa Aktif' },
                    { value: 'alumni', label: 'Alumni' },
                  ].map((option) => {
                    const selected = mentorStatus === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setMentorStatus(option.value)}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${
                          selected
                            ? 'border-secondary bg-lightBg font-medium text-secondary'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-accent'
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            selected ? 'bg-secondary' : 'bg-slate-300'
                          }`}
                        />
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Baris 1: Nama Lengkap */}
              <div className="sm:col-span-2">
                <Field label="Nama Lengkap" htmlFor="reg-nama" error={errors.nama}>
                  <input
                    id="reg-nama"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama sesuai identitas"
                    value={form.nama}
                    onChange={onChangeField('nama')}
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>

              {/* Baris 2: Pilihan Fakultas & Program Studi */}
              <Field label="Fakultas" htmlFor="reg-fakultas" error={errors.fakultas}>
                <div className="relative">
                  <select
                    id="reg-fakultas"
                    value={form.fakultas}
                    onChange={onChangeField('fakultas')}
                    className={`${INPUT_BASE} appearance-none pr-10 ${
                      form.fakultas ? 'text-primary' : 'text-slate-400'
                    }`}
                  >
                    <option value="">Pilih fakultas</option>
                    {Object.keys(FAKULTAS_DATA).map((fakultas) => (
                      <option key={fakultas} value={fakultas}>
                        {fakultas}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>

              <Field label="Program Studi" htmlFor="reg-prodi" error={errors.prodi}>
                <div className="relative">
                  <select
                    id="reg-prodi"
                    disabled={!form.fakultas}
                    value={form.prodi}
                    onChange={onChangeField('prodi')}
                    className={`${INPUT_BASE} appearance-none pr-10 ${
                      form.prodi ? 'text-primary' : 'text-slate-400'
                    } ${
                      !form.fakultas
                        ? 'cursor-not-allowed bg-slate-100 text-slate-400 opacity-70'
                        : ''
                    }`}
                  >
                    <option value="">
                      {form.fakultas
                        ? 'Pilih program studi'
                        : 'Pilih fakultas terlebih dahulu'}
                    </option>
                    {availableProdi.map((prodi) => (
                      <option key={prodi} value={prodi}>
                        {prodi}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>

              {/* Baris 3: Email */}
              <div className="sm:col-span-2">
                <Field
                  label="Email"
                  htmlFor="reg-email"
                  error={errors.email}
                  hint={isAlumni ? undefined : 'Wajib email kampus .ac.id'}
                >
                  <input
                    id="reg-email"
                    type="email"
                    autoComplete="email"
                    placeholder={isAlumni ? 'nama@email.com' : 'nama@kampus.ac.id'}
                    value={form.email}
                    onChange={onChangeField('email')}
                    className={INPUT_CLASS}
                  />
                </Field>

                {isAlumni && (
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-accent bg-lightBg px-3.5 py-3 text-xs font-medium text-secondary">
                    <Mail className="h-4 w-4 shrink-0" />
                    Sebagai mentor alumni, Anda dapat menggunakan email pribadi yang aktif.
                  </div>
                )}
              </div>

              {/* Kata Sandi & Konfirmasi Password */}
              <Field label="Kata Sandi" htmlFor="reg-password" error={errors.password}>
                <input
                  id="reg-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Buat kata sandi"
                  value={form.password}
                  onChange={onChangeField('password')}
                  className={INPUT_CLASS}
                />
              </Field>

              <Field
                label="Konfirmasi Password"
                htmlFor="reg-konfirmasi"
                error={errors.konfirmasi}
              >
                <input
                  id="reg-konfirmasi"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Ulangi kata sandi"
                  value={form.konfirmasi}
                  onChange={onChangeField('konfirmasi')}
                  className={INPUT_CLASS}
                />
              </Field>
            </div>

            <ul className="mt-4 flex flex-wrap gap-2">
              {PASSWORD_RULES.map((rule) => {
                const passed = rule.test(form.password);
                return (
                  <li
                    key={rule.id}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      passed
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Check
                      className={`h-3 w-3 ${passed ? 'text-emerald-600' : 'text-slate-400'}`}
                    />
                    {rule.label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-start gap-3">
              <input
                id="reg-agree"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-accent text-secondary focus:ring-secondary/20"
              />
              <label htmlFor="reg-agree" className="text-xs leading-relaxed text-primary/80">
                Saya menyetujui{' '}
                <a href="#terms" className="font-semibold text-secondary hover:underline">
                  Syarat &amp; Ketentuan
                </a>{' '}
                serta{' '}
                <a href="#privacy" className="font-semibold text-secondary hover:underline">
                  Kebijakan Privasi
                </a>{' '}
                Mentlify.
              </label>
            </div>

            <button type="submit" disabled={!agree} className={`${PRIMARY_BUTTON} mt-6`}>
              Daftar Sekarang
              <ArrowUpRight className="h-5 w-5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-primary/70">
            Sudah memiliki akun?{' '}
            <button
              type="button"
              onClick={onGoLogin}
              className="font-medium text-secondary hover:underline"
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Halaman Verifikasi Email                                           */
/* ------------------------------------------------------------------ */

function VerificationPage({
  status,
  email,
  resendSeconds,
  role,
  onResend,
  onExpire,
  onOpenMail,
  onProceedOnboarding,
}) {
  const isMentor = role === 'mentor';

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-lightBg px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-10 top-16 h-44 w-44 rounded-full bg-accent/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-10 h-80 w-80 rounded-full bg-white blur-3xl"
      />

      <section className="relative w-full max-w-[612px] rounded-3xl border border-accent/70 bg-white px-8 py-12 text-center shadow-xl shadow-primary/10 sm:px-[52px]">
        <div className="relative mx-auto h-[102px] w-[102px]">
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-lightBg">
            <Mail className="h-9 w-9 text-secondary" strokeWidth={2.25} />
          </div>
          <span className="absolute -right-3 top-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
            24 JAM
          </span>
        </div>

        <p className={`${EYEBROW} mt-8`}>Verifikasi Email</p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-primary sm:text-5xl">
          Periksa Kotak Masuk Anda
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-primary/80">
          Kami telah mengirimkan tautan verifikasi ke <strong className="text-primary">{email}</strong>.
          Klik tautan tersebut untuk mengaktifkan akun Anda.
        </p>

        {status === 'sent' && (
          <div
            role="status"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800"
          >
            <CheckCircle2 className="h-4 w-4" />
            Tautan baru berhasil dikirim.
          </div>
        )}

        {status === 'expired' && (
          <div
            role="alert"
            className="mt-7 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5 text-left"
          >
            <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#F9A03F]" />
            <div>
              <p className="text-sm font-bold text-primary">Tautan verifikasi kedaluwarsa</p>
              <p className="mt-1 text-xs text-primary/80">
                Demi keamanan, silakan minta tautan baru untuk melanjutkan.
              </p>
              <button
                type="button"
                onClick={onResend}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#F9A03F] px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:brightness-110"
              >
                <RotateCcw className="h-4 w-4" />
                Minta Link Baru
              </button>
            </div>
          </div>
        )}

        <button type="button" onClick={onOpenMail} className={`${PRIMARY_BUTTON} mt-7`}>
          Buka Email Kampus
          <ArrowUpRight className="h-4 w-4" />
        </button>

        {resendSeconds > 0 ? (
          <p className="mt-5 text-sm text-slate-400">Kirim Ulang Email ({resendSeconds}s)</p>
        ) : (
          <button
            type="button"
            onClick={onResend}
            className="mt-5 text-sm font-medium text-secondary transition-all duration-200 hover:underline"
          >
            Kirim Ulang Email
          </button>
        )}

        <div>
          <button
            type="button"
            onClick={onExpire}
            className="mt-6 text-sm text-slate-400 underline underline-offset-4 transition-colors hover:text-secondary"
          >
            Simulasikan token kedaluwarsa
          </button>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Bagian-bagian Onboarding Mentor                                    */
/* ------------------------------------------------------------------ */

function Stepper({ approvalStatus }) {
  const states = getStepStates(approvalStatus);

  return (
    <ol className="mx-auto grid w-full max-w-[866px] grid-cols-3">
      {STEP_DEFINITIONS.map((step, index) => {
        const state = states[index];
        const isDone = state === 'done';
        const isActive = state === 'active';

        return (
          <li key={step.id} className="relative flex flex-col items-center">
            {index < STEP_DEFINITIONS.length - 1 && (
              <span
                aria-hidden="true"
                className={`absolute left-1/2 top-4 h-0.5 w-full -translate-y-1/2 transition-colors duration-200 ${
                  isDone ? 'bg-secondary' : 'bg-slate-200'
                }`}
              />
            )}

            <span
              aria-current={isActive ? 'step' : undefined}
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${
                isDone
                  ? 'bg-secondary text-white'
                  : isActive
                  ? 'border-2 border-secondary bg-white text-secondary'
                  : 'border border-slate-200 bg-white text-slate-400'
              }`}
            >
              {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : step.id}
            </span>

            <span
              className={`mt-2 text-xs font-bold ${
                state === 'pending' ? 'text-slate-400' : 'text-primary'
              }`}
            >
              {step.label}
            </span>
            <span
              className={`text-[10px] font-semibold ${
                state === 'pending' ? 'text-slate-400' : 'text-secondary'
              }`}
            >
              {getStepCaption(index, state)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function MentorStatusTabs({ value, onChange, locked }) {
  return (
    <div
      role="radiogroup"
      aria-label="Status mentor"
      className={`mt-8 flex justify-center gap-3 transition-opacity duration-200 ${
        locked ? 'opacity-50' : ''
      }`}
    >
      {Object.entries(DOCUMENT_TYPES).map(([key, doc]) => {
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={locked}
            onClick={() => onChange(key)}
            className={`rounded-full border px-5 py-2.5 text-base transition-all duration-200 disabled:cursor-not-allowed ${
              selected
                ? 'border-secondary bg-lightBg text-secondary'
                : 'border-slate-200 bg-white text-primary/70 hover:border-accent'
            }`}
          >
            {doc.label}
          </button>
        );
      })}
    </div>
  );
}

function UploadZone({ doc, error, onPickFile }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openPicker();
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) onPickFile(droppedFile);
  };

  const handleInputChange = (event) => {
    const chosenFile = event.target.files?.[0];
    if (chosenFile) onPickFile(chosenFile);
    event.target.value = '';
  };

  return (
    <div className="mt-6">
      <div
        role="button"
        tabIndex={0}
        aria-label={doc.uploadTitle}
        onClick={openPicker}
        onKeyDown={handleKeyDown}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed px-6 py-11 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 ${
          dragging
            ? 'border-secondary bg-accent/10'
            : 'border-accent bg-lightBg/50 hover:border-secondary'
        }`}
      >
        <span className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-white shadow-sm">
          <UploadCloud className="h-8 w-8 text-secondary" />
        </span>
        <p className="mt-6 text-base font-bold text-primary">{doc.uploadTitle}</p>
        <p className="mt-1 text-sm text-primary/70">
          Tarik &amp; lepas file atau <span className="font-bold text-secondary">pilih dari perangkat</span>
        </p>
        <span className="mt-4 rounded-full border border-accent bg-white px-3 py-1 text-xs text-primary/80">
          Format PDF, JPG, PNG (Maks 5 MB)
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {error && (
        <p role="alert" className="mt-3 flex items-center gap-1.5 text-xs font-medium text-red-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function SelectedFileRow({ file, onRemove }) {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-accent bg-accent/10 p-3.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
        <FileCheck className="h-5 w-5 text-secondary" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-primary">{file.name}</p>
        <p className="text-xs font-semibold text-secondary">{formatFileSize(file.size)} · Siap dikirim</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Hapus berkas"
        className="rounded-full p-2 text-slate-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function ResultHero({ title, subtitle, compact }) {
  return (
    <div
      className={`bg-gradient-to-br from-secondary to-primary px-6 text-center text-white ${
        compact ? 'py-9' : 'py-12'
      }`}
    >
      <span className="mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full bg-white shadow-lg">
        <CheckCircle2 className="h-8 w-8 text-secondary" />
      </span>
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mt-1.5 text-sm text-white/80">{subtitle}</p>
    </div>
  );
}

function SubmissionInfo({ submission }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl bg-accent/10 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">ID Pengajuan</p>
        <p className="mt-1.5 text-sm font-bold text-primary">{submission.id}</p>
      </div>
      <div className="rounded-xl bg-[#F8FAF9] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dikirim Pada</p>
        <p className="mt-1.5 text-sm font-bold text-primary">{submission.sentAt}</p>
      </div>
    </div>
  );
}

function ReceivedCard({ doc, file, submission }) {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-accent/70 bg-white shadow-xl shadow-primary/10">
      <ResultHero
        title="Unggahan berhasil diterima"
        subtitle="Dokumenmu tersimpan dengan aman dan siap diperiksa oleh tim kami."
        compact
      />

      <div className="space-y-4 p-7">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-[#F8FAF9] p-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
            <FileCheck className="h-5 w-5 text-secondary" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-primary">{file.name}</p>
            <p className="text-xs text-slate-500">
              {doc.shortName} · {getFileExtension(file.name)} · {formatFileSize(file.size)}
            </p>
          </div>
          <span className="rounded-full bg-accent/30 px-3 py-1 text-xs font-bold text-secondary">
            Berhasil
          </span>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-accent bg-lightBg p-4">
          <Hourglass className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-bold text-primary">Sedang direview admin</p>
            <p className="mt-1 text-xs text-primary/70">
              Estimasi selesai maksimal 2×24 jam kerja. Hasil akan dikirim melalui email.
            </p>
          </div>
        </div>

        <hr className="border-slate-100" />

        <SubmissionInfo submission={submission} />
      </div>
    </section>
  );
}

function ApprovedCard({ submission }) {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-accent/70 bg-white shadow-xl shadow-primary/10">
      <ResultHero
        title="Akun Berhasil didaftarkan"
        subtitle="Masuk kembali menggunakan akun yang telah didaftarkan."
      />
      <div className="p-7">
        <SubmissionInfo submission={submission} />
      </div>
    </section>
  );
}

function RejectedCard({ attempt, onRetry }) {
  const reason = REJECTION_REASONS[(attempt - 1) % REJECTION_REASONS.length];

  return (
    <section className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-6 sm:p-8">
      <div className="flex gap-5">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
          <FileText className="h-6 w-6 text-red-500" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-primary">Berkas Belum Disetujui</h2>
            <span className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold text-white">
              Pengajuan ke-{Math.min(attempt, MAX_ATTEMPTS)} dari {MAX_ATTEMPTS}
            </span>
          </div>

          <div className="mt-4 rounded-xl border border-red-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-red-400">Catatan Admin</p>
            <p className="mt-1 text-base font-bold text-primary">{reason.judul}</p>
            <p className="mt-1 text-xs text-slate-500">{reason.catatan}</p>
          </div>

          <button
            type="button"
            onClick={onRetry}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-base font-medium text-white shadow-lg shadow-secondary/30 transition-all duration-200 hover:brightness-110"
          >
            Unggah Ulang Berkas
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function OnboardingPage({
  applicant,
  mentorStatus,
  onChangeMentorStatus,
  approvalStatus,
  file,
  fileError,
  onPickFile,
  onRemoveFile,
  onSubmitFile,
  submission,
  attemptCount,
  onRetry,
  onGoLogin,
}) {
  const doc = DOCUMENT_TYPES[mentorStatus];
  const sampleFile = {
    name: `${doc.filePrefix}_${getFirstName(applicant.nama)}_${doc.fileSuffix}.pdf`,
    size: SAMPLE_FILE_SIZE,
    type: 'application/pdf',
  };
  const shownFile = file ?? sampleFile;
  const shownSubmission = submission ?? SAMPLE_SUBMISSION;

  return (
    <div className="flex flex-1 flex-col bg-white">
      <header className="flex items-center justify-between border-b border-slate-100 px-6 py-5 md:px-10">
        <Logo variant="color" />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-primary">{applicant.nama}</p>
            <p className="text-xs text-slate-500">Calon Mentor</p>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-accent/20 text-sm font-bold text-secondary">
            {getInitials(applicant.nama)}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[866px] flex-1 px-4 pb-16 pt-8">
        <Stepper approvalStatus={approvalStatus} />

        <div className="mx-auto max-w-[713px]">
          <div className="mt-12 text-center">
            <p className={EYEBROW}>Verifikasi Mentor</p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Unggah Dokumen Pendukung
            </h1>
            <p className="mt-3 text-sm text-primary/70">
              Dokumen ini membantu kami menjaga kualitas dan keamanan komunitas Mentlify.
            </p>
          </div>

          <MentorStatusTabs
            value={mentorStatus}
            onChange={onChangeMentorStatus}
            locked={approvalStatus === 'menunggu'}
          />

          {approvalStatus === 'belum_unggah' && (
            <>
              <UploadZone doc={doc} error={fileError} onPickFile={onPickFile} />
              {file && <SelectedFileRow file={file} onRemove={onRemoveFile} />}
              <button
                type="button"
                onClick={onSubmitFile}
                disabled={!file}
                className={`${PRIMARY_BUTTON} mt-6`}
              >
                Kirim Berkas untuk Diverifikasi
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </>
          )}

          {approvalStatus === 'menunggu' && (
            <ReceivedCard doc={doc} file={shownFile} submission={shownSubmission} />
          )}

          {approvalStatus === 'disetujui' && (
            <>
              <ApprovedCard submission={shownSubmission} />
              <button type="button" onClick={onGoLogin} className={`${PRIMARY_BUTTON} mt-6`}>
                Masuk ke Akun
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </>
          )}

          {approvalStatus === 'ditolak' && (
            <RejectedCard attempt={attemptCount} onRetry={onRetry} />
          )}
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Komponen Utama (AuthForm)                                          */
/* ------------------------------------------------------------------ */

export default function AuthForm({
  onSuccessLogin,
  onForgotPassword,
  initialMode = 'login',
  showSimulation = true,
}) {
  // 'login' | 'register' | 'verification' | 'onboarding'
  const [authMode, setAuthMode] = useState(initialMode);

  // --- Login State ---
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [simulateLock, setSimulateLock] = useState(false);
  const [lockSeconds, setLockSeconds] = useState(LOCK_DURATION);

  // --- Register State ---
  const [role, setRole] = useState('mentee'); // 'mentee' | 'mentor'
  const [mentorStatus, setMentorStatus] = useState('mahasiswa'); // 'mahasiswa' | 'alumni'
  const [registerForm, setRegisterForm] = useState(EMPTY_REGISTER_FORM);
  const [registerErrors, setRegisterErrors] = useState({});
  const [agree, setAgree] = useState(false);

  // --- Verifikasi State ---
  const [verifyEmail, setVerifyEmail] = useState('mhs@kampus.ac.id');
  const [verifyStatus, setVerifyStatus] = useState('default'); // 'default' | 'sent' | 'expired'
  const [resendSeconds, setResendSeconds] = useState(RESEND_DURATION);

  // --- Onboarding State ---
  const [applicant, setApplicant] = useState(DEFAULT_APPLICANT);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submission, setSubmission] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [adminApprovalStatus, setAdminApprovalStatus] = useState('belum_unggah');

  /* Hitung mundur akun terkunci */
  useEffect(() => {
    if (!simulateLock) return undefined;
    const timer = setInterval(() => {
      setLockSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [simulateLock]);

  useEffect(() => {
    if (simulateLock && lockSeconds === 0) {
      setSimulateLock(false);
      setLockSeconds(LOCK_DURATION);
    }
  }, [simulateLock, lockSeconds]);

  /* Hitung mundur kirim ulang email */
  useEffect(() => {
    if (authMode !== 'verification' || resendSeconds <= 0) return undefined;
    const timer = setTimeout(() => setResendSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [authMode, resendSeconds]);

  /* ---------------- Aksi Auth ---------------- */

  const toggleLock = (checked) => {
    setSimulateLock(checked);
    setLockSeconds(LOCK_DURATION);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    if (simulateLock) return;
    if (typeof onSuccessLogin === 'function') {
      onSuccessLogin();
    } else {
      window.location.assign('/dasbor');
    }
  };

  const handleForgotPassword = () => {
    if (typeof onForgotPassword === 'function') onForgotPassword();
  };

  const showLogin = (locked) => {
    setAuthMode('login');
    toggleLock(locked);
  };

  const showRegister = (nextRole, nextStatus, agreed) => {
    setAuthMode('register');
    setRole(nextRole);
    setMentorStatus(nextStatus);
    setAgree(agreed);
    setRegisterForm(EMPTY_REGISTER_FORM);
    setRegisterErrors({});
  };

  const showVerification = (nextStatus) => {
    setAuthMode('verification');
    setVerifyStatus(nextStatus);
    setResendSeconds(RESEND_DURATION);
  };

  const handleChangeRegisterField = (field) => (event) => {
    const { value } = event.target;
    setRegisterForm((prev) => {
      if (field === 'fakultas') {
        return { ...prev, fakultas: value, prodi: '' };
      }
      return { ...prev, [field]: value };
    });
    setRegisterErrors((prev) => {
      if (field === 'fakultas') {
        return { ...prev, fakultas: undefined, prodi: undefined };
      }
      return { ...prev, [field]: undefined };
    });
  };

  const handleFillSample = () => {
    if (role === 'mentee') {
      setRegisterForm(SAMPLE_REGISTER_DATA.mentee);
    } else if (mentorStatus === 'alumni') {
      setRegisterForm(SAMPLE_REGISTER_DATA.mentorAlumni);
    } else {
      setRegisterForm(SAMPLE_REGISTER_DATA.mentorMahasiswa);
    }
    setRegisterErrors({});
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();

    const isAlumni = role === 'mentor' && mentorStatus === 'alumni';
    const email = registerForm.email.trim();
    const errors = {};

    if (!registerForm.nama.trim()) errors.nama = 'Nama lengkap wajib diisi.';
    if (!registerForm.fakultas) errors.fakultas = 'Pilih fakultas.';
    if (!registerForm.prodi) errors.prodi = 'Pilih program studi.';

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Format email belum valid.';
    } else if (!isAlumni && !/\.ac\.id$/i.test(email)) {
      errors.email = 'Gunakan email kampus berakhiran .ac.id.';
    }

    if (!PASSWORD_RULES.every((rule) => rule.test(registerForm.password))) {
      errors.password = 'Kata sandi belum memenuhi syarat.';
    }
    if (!registerForm.konfirmasi || registerForm.konfirmasi !== registerForm.password) {
      errors.konfirmasi = 'Konfirmasi kata sandi tidak sama.';
    }

    setRegisterErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setVerifyEmail(email);
    setApplicant({
      nama: registerForm.nama,
      email,
      mentorStatus,
    });
    showVerification('default');
  };

  const handleResend = () => {
    setVerifyStatus('sent');
    setResendSeconds(RESEND_DURATION);
  };

  const handleOpenMail = () => {
    window.open('https://mail.google.com', '_blank', 'noopener,noreferrer');
  };

  // Navigasi dari Verifikasi -> Onboarding untuk Mentor
  const handleProceedToOnboarding = () => {
    setAuthMode('onboarding');
    setAdminApprovalStatus('belum_unggah');
    setUploadedFile(null);
  };

  /* ---------------- Aksi Onboarding ---------------- */

  const handlePickFile = (file) => {
    const typeAllowed =
      ['application/pdf', 'image/jpeg', 'image/png'].includes(file.type) ||
      /\.(pdf|jpe?g|png)$/i.test(file.name);

    if (!typeAllowed) {
      setFileError('Format file harus PDF, JPG, atau PNG.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError('Ukuran file melebihi 5 MB.');
      return;
    }

    setFileError('');
    setUploadedFile({ name: file.name, size: file.size, type: file.type, raw: file });
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileError('');
  };

  const handleChangeMentorStatus = (nextStatus) => {
    if (nextStatus === mentorStatus) return;
    setMentorStatus(nextStatus);
    setUploadedFile(null);
    setFileError('');
  };

  const handleSubmitFile = () => {
    if (!uploadedFile) return;
    setSubmission({ id: createSubmissionId(), sentAt: formatSentAt(new Date()) });
    setAttemptCount((prev) => prev + 1);
    setAdminApprovalStatus('menunggu');
  };

  const handleRetry = () => {
    setUploadedFile(null);
    setFileError('');
    setAdminApprovalStatus('belum_unggah');
  };

  /* ---------------- Tombol Simulasi ---------------- */

  const isRegister = authMode === 'register';
  const isVerification = authMode === 'verification';
  const isOnboarding = authMode === 'onboarding';

  const doc = DOCUMENT_TYPES[mentorStatus];
  const sampleFile = {
    name: `${doc.filePrefix}_${getFirstName(applicant.nama)}_${doc.fileSuffix}.pdf`,
    size: SAMPLE_FILE_SIZE,
    type: 'application/pdf',
  };

  const simulationItems = [
    {
      key: 'login',
      label: 'Login',
      active: authMode === 'login' && !simulateLock,
      onClick: () => showLogin(false),
    },
    {
      key: 'login-lock',
      label: 'Login Terkunci 5×',
      active: authMode === 'login' && simulateLock,
      onClick: () => showLogin(true),
    },
    {
      key: 'reg-awal',
      label: 'Register Awal',
      active: isRegister && role === 'mentee' && !agree,
      onClick: () => showRegister('mentee', 'mahasiswa', false),
    },
    {
      key: 'reg-mentee',
      label: 'Register Mentee',
      active: isRegister && role === 'mentee' && agree,
      onClick: () => showRegister('mentee', 'mahasiswa', true),
    },
    {
      key: 'reg-mahasiswa',
      label: 'Mentor Mahasiswa',
      active: isRegister && role === 'mentor' && mentorStatus === 'mahasiswa',
      onClick: () => showRegister('mentor', 'mahasiswa', true),
    },
    {
      key: 'reg-alumni',
      label: 'Mentor Alumni',
      active: isRegister && role === 'mentor' && mentorStatus === 'alumni',
      onClick: () => showRegister('mentor', 'alumni', true),
    },
    {
      key: 'verif',
      label: 'Verifikasi Email',
      active: isVerification && verifyStatus === 'default',
      onClick: () => showVerification('default'),
    },
    {
      key: 'verif-expired',
      label: 'Token Kedaluwarsa',
      active: isVerification && verifyStatus === 'expired',
      onClick: () => showVerification('expired'),
    },
    {
      key: 'ob-awal',
      label: 'Onboarding Awal',
      active: isOnboarding && adminApprovalStatus === 'belum_unggah' && !uploadedFile,
      onClick: () => {
        setAuthMode('onboarding');
        setAdminApprovalStatus('belum_unggah');
        setUploadedFile(null);
      },
    },
    {
      key: 'ob-berkas',
      label: 'Berkas Dipilih',
      active: isOnboarding && adminApprovalStatus === 'belum_unggah' && Boolean(uploadedFile),
      onClick: () => {
        setAuthMode('onboarding');
        setAdminApprovalStatus('belum_unggah');
        setUploadedFile(sampleFile);
      },
    },
    {
      key: 'ob-menunggu',
      label: 'Menunggu Review',
      active: isOnboarding && adminApprovalStatus === 'menunggu',
      onClick: () => {
        setAuthMode('onboarding');
        setSubmission(SAMPLE_SUBMISSION);
        setAdminApprovalStatus('menunggu');
      },
    },
    {
      key: 'ob-disetujui',
      label: 'Disetujui',
      active: isOnboarding && adminApprovalStatus === 'disetujui',
      onClick: () => {
        setAuthMode('onboarding');
        setSubmission(SAMPLE_SUBMISSION);
        setAdminApprovalStatus('disetujui');
      },
    },
    {
      key: 'ob-ditolak',
      label: 'Ditolak',
      active: isOnboarding && adminApprovalStatus === 'ditolak',
      onClick: () => {
        setAuthMode('onboarding');
        setAttemptCount(2);
        setAdminApprovalStatus('ditolak');
      },
    },
  ];

  /* ---------------- Render ---------------- */

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-primary">
      {showSimulation && (
        <SimulationBar
          items={simulationItems}
          showFillSample={isRegister}
          onFillSample={handleFillSample}
        />
      )}

      {authMode === 'login' && (
        <LoginPage
          form={loginForm}
          setForm={setLoginForm}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          locked={simulateLock}
          lockSeconds={lockSeconds}
          onSubmit={handleLoginSubmit}
          onGoRegister={() => showRegister('mentee', 'mahasiswa', false)}
          onForgotPassword={handleForgotPassword}
        />
      )}

      {authMode === 'register' && (
        <RegisterPage
          role={role}
          setRole={setRole}
          mentorStatus={mentorStatus}
          setMentorStatus={setMentorStatus}
          form={registerForm}
          onChangeField={handleChangeRegisterField}
          errors={registerErrors}
          agree={agree}
          setAgree={setAgree}
          onSubmit={handleRegisterSubmit}
          onGoLogin={() => showLogin(false)}
        />
      )}

      {authMode === 'verification' && (
        <VerificationPage
          status={verifyStatus}
          email={verifyEmail}
          resendSeconds={resendSeconds}
          role={role}
          onResend={handleResend}
          onExpire={() => setVerifyStatus('expired')}
          onOpenMail={handleOpenMail}
          onProceedOnboarding={handleProceedToOnboarding}
        />
      )}

      {authMode === 'onboarding' && (
        <OnboardingPage
          applicant={applicant}
          mentorStatus={mentorStatus}
          onChangeMentorStatus={handleChangeMentorStatus}
          approvalStatus={adminApprovalStatus}
          file={uploadedFile}
          fileError={fileError}
          onPickFile={handlePickFile}
          onRemoveFile={handleRemoveFile}
          onSubmitFile={handleSubmitFile}
          submission={submission}
          attemptCount={attemptCount}
          onRetry={handleRetry}
          onGoLogin={() => showLogin(false)}
        />
      )}
    </div>
  );
}
