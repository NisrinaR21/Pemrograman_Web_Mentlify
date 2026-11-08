import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';

import logoWhite from '../../assets/logo-white.png';
import logoBiru from '../../assets/logo-biru.png';

const LOCK_DURATION = 14 * 60 + 59; // tampil mulai 14:59
const RESEND_DURATION = 59; // detik

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

/* ------------------------------------------------------------------ */
/*  Kelas Tailwind yang dipakai ulang                                  */
/* ------------------------------------------------------------------ */

const INPUT_BASE =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm placeholder:text-slate-400 transition-all duration-200 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400';
const INPUT_CLASS = `${INPUT_BASE} text-primary`;

const PRIMARY_BUTTON =
  'flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-4 text-base font-medium text-white shadow-lg shadow-secondary/30 transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:brightness-100';

const EYEBROW = 'text-xs font-bold uppercase tracking-[0.18em] text-secondary';

/* ------------------------------------------------------------------ */
/*  Helper kecil                                                       */
/* ------------------------------------------------------------------ */

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function Logo({ variant }) {
  const isWhite = variant === 'white';
  const imageSrc = isWhite ? logoWhite : logoBiru;

  if (imageSrc) {
    return <img src={imageSrc} alt="Mentlify" className="h-10 w-auto" />;
  }

  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-extrabold ${isWhite ? 'bg-white text-secondary' : 'bg-secondary text-white'
          }`}
      >
        M
      </span>
      <span
        className={`text-3xl font-extrabold tracking-tight ${isWhite ? 'text-white' : 'text-secondary'
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

/* ------------------------------------------------------------------ */
/*  Bar simulasi presentasi                                            */
/* ------------------------------------------------------------------ */

function SimulationBar({ items, showFillSample, onFillSample }) {
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
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open &&
          items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={item.onClick}
              className={`rounded-full px-3 py-1 font-semibold transition-all duration-200 ${item.active
                  ? 'bg-accent text-primary'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              {item.label}
            </button>
          ))}

        {open && showFillSample && (
          <button
            type="button"
            onClick={onFillSample}
            className="rounded-full border border-accent px-3 py-1 font-semibold text-accent transition-all duration-200 hover:bg-accent/10"
          >
            Isi Data Contoh
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
  onToggleLock,
  onSubmit,
  onGoRegister,
  onForgotPassword,
}) {
  return (
    <div className="grid flex-1 md:grid-cols-2">
      {/* Panel kiri (tetap) */}
      <aside className="relative m-3 hidden overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-secondary to-primary p-8 text-white md:flex md:flex-col lg:p-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-32 h-[340px] w-[340px] rounded-full border border-white/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-[220px] w-[220px] rounded-full border border-white/20"
        />

        <div className="relative">
          <Logo variant="white" />

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Belajar lintas kampus, tumbuh bersama
          </div>

          <h1 className="mt-8 text-4xl font-extrabold leading-[1.05] tracking-tight lg:text-5xl xl:text-[64px]">
            Tingkatkan
            <br />
            Potensimu
            <br />
            Bersama Mentor
            <br />
            Antar-Kampus
          </h1>

          <p className="mt-6 max-w-[470px] text-base leading-relaxed text-white/85">
            Terhubung dengan mentor berpengalaman dan capai target akademikmu melalui sesi
            belajar yang personal.
          </p>
        </div>

        <div className="relative mt-auto pt-10">
          <figure className="max-w-[476px] rounded-2xl border border-white/25 bg-white/15 p-6 backdrop-blur-sm">
            <div className="flex gap-1" aria-label={`Rating ${TESTIMONIAL.rating} dari 5`}>
              {Array.from({ length: TESTIMONIAL.rating }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-accentYellow text-accentYellow" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-white">
              {TESTIMONIAL.quote}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-accent bg-lightBg text-sm font-bold text-secondary">
                {TESTIMONIAL.initials}
              </span>
              <span>
                <span className="block text-sm font-bold">{TESTIMONIAL.name}</span>
                <span className="block text-xs text-white/75">{TESTIMONIAL.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="absolute bottom-2 right-0 flex h-16 w-16 rotate-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <GraduationCap className="h-7 w-7" />
          </div>
        </div>
      </aside>

      {/* Panel kanan (berganti) */}
      <main className="flex items-center justify-center px-6 py-12 md:px-10 lg:px-16">
        <div className="w-full max-w-[476px]">
          <div className="mb-8 md:hidden">
            <Logo variant="color" />
          </div>

          <p className={EYEBROW}>Portal Anggota</p>
          <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-primary">
            Selamat Datang Kembali
          </h2>
          <p className="mt-2 text-sm text-primary/70">Masuk untuk melanjutkan perjalanan belajarmu.</p>

          {locked && (
            <div
              role="alert"
              className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <div className="flex-1">
                <p className="text-sm font-bold text-red-500">
                  Akun terkunci sementara karena 5 kali percobaan gagal
                </p>
                <p className="mt-0.5 text-xs text-red-500/80">
                  Coba kembali setelah hitung mundur selesai.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-red-500 px-3 py-1 text-xs font-bold tabular-nums text-white">
                {formatTime(lockSeconds)}
              </span>
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <Field label="Email" htmlFor="login-email">
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="nama@kampus.ac.id"
                value={form.email}
                disabled={locked}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className={INPUT_CLASS}
              />
            </Field>

            <Field label="Kata Sandi" htmlFor="login-password">
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Masukkan kata sandi"
                  value={form.password}
                  disabled={locked}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                  className={`${INPUT_CLASS} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-secondary"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-primary">
                <input
                  type="checkbox"
                  checked={form.remember}
                  disabled={locked}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, remember: event.target.checked }))
                  }
                  className="h-4 w-4 rounded border-slate-300 accent-secondary"
                />
                Ingat Saya
              </label>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm font-medium text-secondary transition-all duration-200 hover:underline"
              >
                Lupa Kata Sandi?
              </button>
            </div>

            <button type="submit" disabled={locked} className={PRIMARY_BUTTON}>
              Masuk Sekarang
              <ArrowUpRight className="h-4 w-4" />
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
      {/* Panel kiri (tetap) */}
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

      {/* Panel kanan (berganti) */}
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
                className={`rounded-full py-3 text-base font-medium transition-all duration-200 ${role === tab.value
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
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-200 ${selected
                            ? 'border-secondary bg-lightBg font-medium text-secondary'
                            : 'border-slate-200 bg-white text-slate-500 hover:border-accent'
                          }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${selected ? 'bg-secondary' : 'bg-slate-300'
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

              <Field label="Konfirmasi Password" htmlFor="reg-konfirmasi" error={errors.konfirmasi}>
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
                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-200 ${passed
                        ? 'border-accent bg-accent/10 text-secondary'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                      }`}
                  >
                    {passed ? (
                      <Check className="h-3 w-3" strokeWidth={3} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                    )}
                    {rule.label}
                  </li>
                );
              })}
            </ul>

            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-primary">
              <input
                type="checkbox"
                checked={agree}
                onChange={(event) => setAgree(event.target.checked)}
                className="h-4 w-4 shrink-0 rounded border-slate-300 accent-secondary"
              />
              <span>
                Saya menyetujui <span className="font-bold text-secondary">Syarat &amp; Ketentuan</span>{' '}
                serta Kebijakan Privasi Mentlify.
              </span>
            </label>

            <button type="submit" disabled={!agree} className={`${PRIMARY_BUTTON} mt-4`}>
              Daftar Akun
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-primary/70">
            Sudah punya akun?{' '}
            <button
              type="button"
              onClick={onGoLogin}
              className="font-medium text-secondary transition-all duration-200 hover:underline"
            >
              Masuk sekarang
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

function VerificationPage({ status, email, resendSeconds, onResend, onExpire, onOpenMail }) {
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
          <br />
          Tautan berlaku selama 24 jam.
        </p>

        {status === 'sent' && (
          <div
            role="status"
            className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-accent bg-accent/20 px-4 py-3.5 text-sm font-bold text-secondary"
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
/*  Komponen utama                                                     */
/* ------------------------------------------------------------------ */

export default function AuthForm({
  onSuccessLogin,
  onForgotPassword,
  showSimulation = true,
}) {
  // 'login' | 'register' | 'verification'
  const [authMode, setAuthMode] = useState('login');

  // --- Login ---
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [simulateLock, setSimulateLock] = useState(false);
  const [lockSeconds, setLockSeconds] = useState(LOCK_DURATION);

  // --- Register ---
  const [role, setRole] = useState('mentee'); // 'mentee' | 'mentor'
  const [mentorStatus, setMentorStatus] = useState('mahasiswa'); // 'mahasiswa' | 'alumni'
  const [registerForm, setRegisterForm] = useState(EMPTY_REGISTER_FORM);
  const [registerErrors, setRegisterErrors] = useState({});
  const [agree, setAgree] = useState(false);

  // --- Verifikasi ---
  const [verifyEmail, setVerifyEmail] = useState('mhs@kampus.ac.id');
  const [verifyStatus, setVerifyStatus] = useState('default'); // 'default' | 'sent' | 'expired'
  const [resendSeconds, setResendSeconds] = useState(RESEND_DURATION);

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

  /* ---------------- Aksi ---------------- */

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
      window.location.assign('/dashbor');
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
    showVerification('default');
  };

  const handleResend = () => {
    setVerifyStatus('sent');
    setResendSeconds(RESEND_DURATION);
  };

  const handleOpenMail = () => {
    window.open('https://mail.google.com', '_blank', 'noopener,noreferrer');
  };

  /* ---------------- Tombol simulasi ---------------- */

  const isRegister = authMode === 'register';
  const isVerification = authMode === 'verification';

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
      label: 'Verifikasi',
      active: isVerification && verifyStatus === 'default',
      onClick: () => showVerification('default'),
    },
    {
      key: 'verif-sent',
      label: 'Link Baru Terkirim',
      active: isVerification && verifyStatus === 'sent',
      onClick: () => showVerification('sent'),
    },
    {
      key: 'verif-expired',
      label: 'Token Kedaluwarsa',
      active: isVerification && verifyStatus === 'expired',
      onClick: () => showVerification('expired'),
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
          onToggleLock={toggleLock}
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
          onResend={handleResend}
          onExpire={() => setVerifyStatus('expired')}
          onOpenMail={handleOpenMail}
        />
      )}
    </div>
  );
}
