// src/components/page01/OnboardingFlow.jsx
import { useCallback, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  Hourglass,
  Trash2,
  UploadCloud,
  X,
} from 'lucide-react';
import AuthForm, { Logo, SimulationBar } from './AuthForm';

/* ------------------------------------------------------------------ */
/*  Konfigurasi & data dummy                                           */
/* ------------------------------------------------------------------ */

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_ATTEMPTS = 3;
const SAMPLE_FILE_SIZE = 2516582; // ≈ 2.4 MB

const SAMPLE_SUBMISSION = { id: '#MTL-2025-0842', sentAt: '24 Mei 2025, 10.32 WIB' };

const DEFAULT_APPLICANT = {
  nama: 'Nadia Putri',
  email: 'nadia.putri@kampus.ac.id',
  mentorStatus: 'mahasiswa',
};

// Teks area unggah berganti saat tombol Mahasiswa Aktif / Alumni ditekan
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

const RESULT_BUTTONS = [
  { key: 'belum_unggah', label: 'Unggah', icon: UploadCloud },
  { key: 'menunggu', label: 'Menunggu', icon: Clock },
  { key: 'disetujui', label: 'Disetujui', icon: CheckCircle2 },
  { key: 'ditolak', label: 'Ditolak', icon: X },
];

/* ------------------------------------------------------------------ */
/*  Kelas Tailwind yang dipakai ulang                                  */
/* ------------------------------------------------------------------ */

const EYEBROW = 'text-xs font-bold uppercase tracking-[0.18em] text-secondary';

const PRIMARY_BUTTON =
  'flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-4 py-4 text-base font-medium text-white shadow-lg shadow-secondary/30 transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none disabled:hover:brightness-100';

/* ------------------------------------------------------------------ */
/*  Helper kecil                                                       */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Bagian-bagian halaman onboarding                                   */
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
                className={`absolute left-1/2 top-4 h-0.5 w-full -translate-y-1/2 transition-colors duration-200 ${isDone ? 'bg-secondary' : 'bg-slate-200'
                  }`}
              />
            )}

            <span
              aria-current={isActive ? 'step' : undefined}
              className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-200 ${isDone
                  ? 'bg-secondary text-white'
                  : isActive
                    ? 'border-2 border-secondary bg-white text-secondary'
                    : 'border border-slate-200 bg-white text-slate-400'
                }`}
            >
              {isDone ? <Check className="h-4 w-4" strokeWidth={3} /> : step.id}
            </span>

            <span
              className={`mt-2 text-xs font-bold ${state === 'pending' ? 'text-slate-400' : 'text-primary'
                }`}
            >
              {step.label}
            </span>
            <span
              className={`text-[10px] font-semibold ${state === 'pending' ? 'text-slate-400' : 'text-secondary'
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
      className={`mt-8 flex justify-center gap-3 transition-opacity duration-200 ${locked ? 'opacity-50' : ''
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
            className={`rounded-full border px-5 py-2.5 text-base transition-all duration-200 disabled:cursor-not-allowed ${selected
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
        className={`flex cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed px-6 py-11 text-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 ${dragging
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
      className={`bg-gradient-to-br from-secondary to-primary px-6 text-center text-white ${compact ? 'py-9' : 'py-12'
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

function ResultSimulator({ activeKey, onSimulate }) {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2 rounded-xl bg-slate-50 px-4 py-4">
      <span className="mr-2 text-xs font-bold text-slate-500">Simulasi hasil:</span>
      {RESULT_BUTTONS.map((button) => {
        const Icon = button.icon;
        const active = activeKey === button.key;
        return (
          <button
            key={button.key}
            type="button"
            onClick={() => onSimulate(button.key)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${active
                ? 'bg-primary text-white'
                : 'bg-white text-primary/70 hover:text-primary hover:shadow-sm'
              }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {button.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Halaman Onboarding Mentor                                          */
/* ------------------------------------------------------------------ */

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
  onSimulate,
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

          {approvalStatus === 'ditolak' && <RejectedCard attempt={attemptCount} onRetry={onRetry} />}

          <ResultSimulator activeKey={approvalStatus} onSimulate={onSimulate} />
        </div>
      </main>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Komponen utama: mengatur seluruh alur                              */
/* ------------------------------------------------------------------ */

export default function OnboardingFlow({ onSuccessLogin }) {
  // 'login' | 'register' | 'verification' | 'onboarding'
  const [currentStep, setCurrentStep] = useState('login');
  // 'idle' | 'success'
  const [loginStatus, setLoginStatus] = useState('idle');
  // 'belum' | 'terverifikasi'
  const [verificationStatus, setVerificationStatus] = useState('belum');
  // 'belum_unggah' | 'menunggu' | 'disetujui' | 'ditolak'
  const [adminApprovalStatus, setAdminApprovalStatus] = useState('belum_unggah');

  // Untuk memasang ulang AuthForm di halaman yang dituju
  const [authInitialMode, setAuthInitialMode] = useState('login');
  const [authKey, setAuthKey] = useState(0);

  // Data onboarding
  const [applicant, setApplicant] = useState(DEFAULT_APPLICANT);
  const [mentorStatus, setMentorStatus] = useState('mahasiswa');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [submission, setSubmission] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);

  /* ---------------- Navigasi antar halaman ---------------- */

  const handleAuthModeChange = useCallback((mode) => {
    setCurrentStep(mode);
  }, []);

  const goAuth = (mode) => {
    setAuthInitialMode(mode);
    setAuthKey((prev) => prev + 1);
    setCurrentStep(mode);
  };

  const handleLoginSuccess = () => {
    setLoginStatus('success');
    if (typeof onSuccessLogin === 'function') {
      onSuccessLogin();
    } else {
      window.location.assign('/dasbor');
    }
  };

  const resetOnboarding = () => {
    setAdminApprovalStatus('belum_unggah');
    setUploadedFile(null);
    setFileError('');
    setSubmission(null);
    setAttemptCount(0);
  };

  const startOnboarding = (nextApplicant) => {
    setApplicant(nextApplicant);
    setMentorStatus(nextApplicant.mentorStatus);
    resetOnboarding();
    setCurrentStep('onboarding');
  };

  const handleEmailVerified = ({ role, mentorStatus: status, nama, email }) => {
    setVerificationStatus('terverifikasi');
    if (role === 'mentor') {
      startOnboarding({
        nama: nama || DEFAULT_APPLICANT.nama,
        email: email || DEFAULT_APPLICANT.email,
        mentorStatus: status,
      });
    } else {
      goAuth('login');
    }
  };

  /* ---------------- Aksi unggah dokumen ---------------- */

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
    // Dokumen yang diminta berbeda, jadi berkas lama dilepas
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

  const handleSimulateResult = (key) => {
    if (key === 'belum_unggah') {
      if (adminApprovalStatus !== 'belum_unggah') setUploadedFile(null);
      setFileError('');
      setAdminApprovalStatus('belum_unggah');
      return;
    }

    setSubmission((prev) => prev ?? SAMPLE_SUBMISSION);
    if (key === 'ditolak') {
      setAttemptCount((prev) => (prev === 0 ? 2 : prev));
    }
    setAdminApprovalStatus(key);
  };

  const handleShowSelectedFile = () => {
    const doc = DOCUMENT_TYPES[mentorStatus];
    setAdminApprovalStatus('belum_unggah');
    setFileError('');
    setUploadedFile({
      name: `${doc.filePrefix}_${getFirstName(applicant.nama)}_${doc.fileSuffix}.pdf`,
      size: SAMPLE_FILE_SIZE,
      type: 'application/pdf',
    });
  };

  /* ---------------- Tombol simulasi presentasi ---------------- */

  const authExtraItems = [
    {
      key: 'to-onboarding',
      label: 'Onboarding Mentor →',
      active: false,
      onClick: () => startOnboarding(DEFAULT_APPLICANT),
    },
  ];

  const onboardingBarItems = [
    { key: 'to-login', label: '← Login', active: false, onClick: () => goAuth('login') },
    { key: 'to-register', label: '← Register', active: false, onClick: () => goAuth('register') },
    {
      key: 'to-verification',
      label: '← Verifikasi',
      active: false,
      onClick: () => goAuth('verification'),
    },
    {
      key: 'ob-awal',
      label: 'Onboarding Awal',
      active: adminApprovalStatus === 'belum_unggah' && !uploadedFile,
      onClick: resetOnboarding,
    },
    {
      key: 'ob-berkas',
      label: 'Berkas Dipilih',
      active: adminApprovalStatus === 'belum_unggah' && Boolean(uploadedFile),
      onClick: handleShowSelectedFile,
    },
    {
      key: 'ob-menunggu',
      label: 'Menunggu Review',
      active: adminApprovalStatus === 'menunggu',
      onClick: () => handleSimulateResult('menunggu'),
    },
    {
      key: 'ob-disetujui',
      label: 'Disetujui',
      active: adminApprovalStatus === 'disetujui',
      onClick: () => handleSimulateResult('disetujui'),
    },
    {
      key: 'ob-ditolak',
      label: 'Ditolak',
      active: adminApprovalStatus === 'ditolak',
      onClick: () => handleSimulateResult('ditolak'),
    },
  ];

  /* ---------------- Render ---------------- */

  return (
    <div
      className="font-sans"
      data-step={currentStep}
      data-login-status={loginStatus}
      data-verification-status={verificationStatus}
      data-admin-approval-status={adminApprovalStatus}
    >
      {currentStep === 'onboarding' ? (
        <div className="flex min-h-screen flex-col bg-white text-primary">
          <SimulationBar items={onboardingBarItems} showFillSample={false} onFillSample={() => { }} />
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
            onSimulate={handleSimulateResult}
            onRetry={handleRetry}
            onGoLogin={() => goAuth('login')}
          />
        </div>
      ) : (
        <AuthForm
          key={authKey}
          initialMode={authInitialMode}
          onSuccessLogin={handleLoginSuccess}
          onModeChange={handleAuthModeChange}
          onEmailVerified={handleEmailVerified}
          extraSimulationItems={authExtraItems}
        />
      )}
    </div>
  );
}
