import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Inbox,
  Lock,
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* DATA DUMMY                                                          */
/* ------------------------------------------------------------------ */

const makeInitialCandidates = () => [
  {
    id: 1,
    nama: "Nadia Putri",
    email: "nadia.putri@umrah.ac.id",
    tipe: "mahasiswa",
    jurusan: "Manajemen",
    waktu: "18 Mei · 10:24",
    nomorInduk: "2201020048",
    detailAkademik: "AKTIF · SEMESTER 6",
    rejectCount: 0,
    warna: "bg-[#F4694C]",
    portofolio: {
      ipk: "3.82",
      organisasi: ["Himpunan Mahasiswa Manajemen (Bendahara)", "UMRAH Entrepreneur Club"],
      keahlian: ["Akuntansi dasar", "Manajemen proyek", "Presentasi"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
  {
    id: 2,
    nama: "Rizky Hidayat",
    email: "rizky.hidayat@gmail.com",
    tipe: "alumni",
    jurusan: "Teknik Informatika",
    waktu: "18 Mei · 09:17",
    nomorInduk: "1901020012",
    detailAkademik: "LULUS · 2023",
    rejectCount: 0,
    warna: "bg-[#E91E8C]",
    portofolio: {
      ipk: "3.67",
      organisasi: ["Komunitas Developer Kepri", "Asisten Lab Pemrograman"],
      keahlian: ["React JS", "Basis data", "Algoritma"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
  {
    id: 3,
    nama: "Sarah Amelia",
    email: "sarah.amelia@umrah.ac.id",
    tipe: "mahasiswa",
    jurusan: "Akuntansi",
    waktu: "17 Mei · 21:08",
    nomorInduk: "2101030031",
    detailAkademik: "AKTIF · SEMESTER 8",
    rejectCount: 0,
    warna: "bg-[#2F5FD0]",
    portofolio: {
      ipk: "3.91",
      organisasi: ["BEM Fakultas Ekonomi", "Tutor Sebaya Akuntansi"],
      keahlian: ["Laporan keuangan", "Excel lanjutan", "Pajak dasar"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
  {
    id: 4,
    nama: "Bima Pratama",
    email: "bima.pratama@gmail.com",
    tipe: "alumni",
    jurusan: "Ilmu Kelautan",
    waktu: "17 Mei · 17:35",
    nomorInduk: "1801040007",
    detailAkademik: "LULUS · 2022",
    rejectCount: 2,
    warna: "bg-[#1F8A70]",
    portofolio: {
      ipk: "3.45",
      organisasi: ["Mapala Samudra", "Relawan Konservasi Terumbu Karang"],
      keahlian: ["Oseanografi", "Survei lapangan", "GIS dasar"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
  {
    id: 5,
    nama: "Dewi Lestari",
    email: "dewi.lestari@umrah.ac.id",
    tipe: "mahasiswa",
    jurusan: "Ilmu Pemerintahan",
    waktu: "17 Mei · 14:02",
    nomorInduk: "2201050019",
    detailAkademik: "AKTIF · SEMESTER 6",
    rejectCount: 0,
    warna: "bg-[#8E5BD9]",
    portofolio: {
      ipk: "3.74",
      organisasi: ["Forum Diskusi Kebijakan Publik"],
      keahlian: ["Analisis kebijakan", "Penulisan ilmiah"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
  {
    id: 6,
    nama: "Fajar Nugroho",
    email: "fajar.nugroho@gmail.com",
    tipe: "alumni",
    jurusan: "Teknik Elektro",
    waktu: "16 Mei · 20:41",
    nomorInduk: "1901060003",
    detailAkademik: "LULUS · 2023",
    rejectCount: 0,
    warna: "bg-[#D9822B]",
    portofolio: {
      ipk: "3.58",
      organisasi: ["Robotika UMRAH", "Asisten Lab Elektronika"],
      keahlian: ["Mikrokontroler", "Rangkaian digital"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
  {
    id: 7,
    nama: "Putri Ayuningtyas",
    email: "putri.ayu@umrah.ac.id",
    tipe: "mahasiswa",
    jurusan: "Manajemen Sumber Daya Perairan",
    waktu: "16 Mei · 11:15",
    nomorInduk: "2101070022",
    detailAkademik: "AKTIF · SEMESTER 8",
    rejectCount: 0,
    warna: "bg-[#0E9AA7]",
    portofolio: {
      ipk: "3.79",
      organisasi: ["Himpunan Perairan", "Asisten Praktikum Biologi Laut"],
      keahlian: ["Budidaya perairan", "Statistika dasar"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
  {
    id: 8,
    nama: "Andika Saputra",
    email: "andika.saputra@gmail.com",
    tipe: "alumni",
    jurusan: "Sistem Informasi",
    waktu: "15 Mei · 19:30",
    nomorInduk: "1901080015",
    detailAkademik: "LULUS · 2023",
    rejectCount: 0,
    warna: "bg-[#C0392B]",
    portofolio: {
      ipk: "3.60",
      organisasi: ["Komunitas UI/UX Batam"],
      keahlian: ["Analisis kebutuhan", "UML", "SQL"],
    },
    status: "menunggu",
    result: null,
    catatan: "",
  },
];

const ALASAN_CEPAT = [
  "Foto KTM terpotong",
  "Dokumen tidak terbaca",
  "Nama tidak sesuai dengan akun",
  "Dokumen sudah kedaluwarsa",
];

const SIM_STATES = [
  { key: "awal", label: "Awal" },
  { key: "setuju", label: "Disetujui" },
  { key: "tolak", label: "Ditolak" },
  { key: "terkunci", label: "Tolak ke-3" },
  { key: "modal", label: "Modal Dokumen" },
  { key: "modalTolak", label: "Modal Tolak" },
  { key: "kosong", label: "Antrean Kosong" },
];

/* ------------------------------------------------------------------ */
/* KOMPONEN KECIL                                                      */
/* ------------------------------------------------------------------ */

function Avatar({ kandidat, ukuran = "h-10 w-10" }) {
  return (
    <span
      className={`${ukuran} ${kandidat.warna} flex shrink-0 items-center justify-center rounded-full text-white ring-2 ring-white`}
      aria-hidden="true"
    >
      <User size={20} strokeWidth={2.2} />
    </span>
  );
}

function judulDokumen(kandidat) {
  return kandidat.tipe === "mahasiswa" ? "KTM / Surat Aktif" : "Ijazah / SKL";
}

function nomorIndukLabel(kandidat) {
  return kandidat.tipe === "mahasiswa" ? "Nomor Induk Mahasiswa" : "Nomor Ijazah / NIM";
}

function statusAkademikLabel(kandidat) {
  return kandidat.tipe === "mahasiswa" ? "Status Akademik" : "Status Kelulusan";
}

function DokumenKartu({ kandidat, skala = 1 }) {
  return (
    <div
      className="mx-auto w-full max-w-[420px] origin-top bg-white p-6 text-center shadow-lg transition-transform duration-200 sm:p-8"
      style={{ transform: `scale(${skala})` }}
    >
      <p className=" text-xs font-bold tracking-wide text-secondary">
        Universitas Maritim Raja Ali Haji
      </p>
      <h3 className="mt-3  text-2xl font-light tracking-wide text-primary">
        {judulDokumen(kandidat).toUpperCase()}
      </h3>

      <div className="mt-6 border border-slate-200 p-5 text-left">
        <p className="text-xs text-slate-500">Nama</p>
        <p className=" text-base font-bold uppercase text-primary">
          {kandidat.nama}
        </p>

        <p className="mt-4 text-xs text-slate-500">{nomorIndukLabel(kandidat)}</p>
        <p className=" text-base font-bold text-primary">
          {kandidat.nomorInduk}
        </p>

        <p className="mt-4 text-xs text-slate-500">{statusAkademikLabel(kandidat)}</p>
        <p className=" text-base font-bold text-primary">
          {kandidat.detailAkademik}
        </p>
      </div>

      <p className="mt-5  text-xs text-slate-500">
        Dokumen privat · Tidak dapat diunduh
      </p>
    </div>
  );
}

function PortofolioAkademik({ kandidat }) {
  const { ipk, organisasi, keahlian } = kandidat.portofolio;
  return (
    <div className="mx-auto w-full max-w-[520px] bg-white p-6 text-left shadow-lg sm:p-8">
      <p className=" text-xs font-bold tracking-wide text-secondary">
        Ringkasan portofolio akademik
      </p>
      <h3 className="mt-2  text-xl font-bold text-primary">{kandidat.nama}</h3>
      <p className="text-sm text-slate-500">Jurusan {kandidat.jurusan}</p>

      <dl className="mt-6 space-y-5 text-sm text-primary">
        <div>
          <dt className="text-xs text-slate-500">IPK terakhir</dt>
          <dd className=" text-lg font-bold">{ipk}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Pengalaman organisasi</dt>
          <dd>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {organisasi.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Bidang yang dikuasai</dt>
          <dd className="mt-1 flex flex-wrap gap-2">
            {keahlian.map((k) => (
              <span key={k} className="rounded-full bg-accent/30 px-3 py-1 text-xs font-semibold text-primary">
                {k}
              </span>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* KOMPONEN UTAMA                                                      */
/* ------------------------------------------------------------------ */

export default function AdminVerificationPage() {
  const navigate = useNavigate();
  const [kandidatList, setKandidatList] = useState(makeInitialCandidates);
  const [selectedId, setSelectedId] = useState(1);
  const [filter, setFilter] = useState("semua");
  const [docTab, setDocTab] = useState("dokumen");
  const [zoom, setZoom] = useState(100);
  const [catatan, setCatatan] = useState("");
  const [errorCatatan, setErrorCatatan] = useState("");

  // Modal overlay
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("review"); // 'review' | 'tolak'
  const [modalCatatan, setModalCatatan] = useState("");
  const [modalError, setModalError] = useState("");

  const selected = kandidatList.find((k) => k.id === selectedId) || null;
  const menunggu = kandidatList.filter((k) => k.status === "menunggu").length;

  const daftarTampil = useMemo(
    () => kandidatList.filter((k) => filter === "semua" || k.tipe === filter),
    [kandidatList, filter]
  );

  const sudahDiputuskan = selected ? selected.status !== "menunggu" : false;

  // Tutup modal dengan tombol Escape
  useEffect(() => {
    if (!modalOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  /* ----------------------------- aksi ----------------------------- */

  const pilihKandidat = (k) => {
    setSelectedId(k.id);
    setDocTab("dokumen");
    setZoom(100);
    setCatatan(k.catatan || "");
    setErrorCatatan("");
  };

  const terapkanKeputusan = (id, aksi, catatanKeputusan) => {
    setKandidatList((prev) =>
      prev.map((k) => {
        if (k.id !== id) return k;
        if (aksi === "setuju") {
          return {
            ...k,
            status: "disetujui",
            result: {
              tipe: "sukses",
              teks: "Mentor disetujui. Role dan Wallet berhasil dibuat.",
            },
          };
        }
        const jumlahTolak = k.rejectCount + 1;
        if (jumlahTolak >= 3) {
          return {
            ...k,
            rejectCount: jumlahTolak,
            status: "terkunci",
            catatan: catatanKeputusan,
            result: {
              tipe: "bahaya",
              teks: "Pengajuan ditolak ke-3 kali. Akun terkunci hingga dibuka super_admin.",
            },
          };
        }
        return {
          ...k,
          rejectCount: jumlahTolak,
          status: "ditolak",
          catatan: catatanKeputusan,
          result: { tipe: "sukses", teks: "Pengajuan ditolak dan catatan dikirim." },
        };
      })
    );
  };

  const handleSetuju = () => {
    if (!selected || sudahDiputuskan) return;
    terapkanKeputusan(selected.id, "setuju", "");
    setErrorCatatan("");
  };

  const handleTolak = () => {
    if (!selected || sudahDiputuskan) return;
    if (!catatan.trim()) {
      setErrorCatatan("Catatan wajib diisi jika pengajuan ditolak.");
      return;
    }
    terapkanKeputusan(selected.id, "tolak", catatan.trim());
    setErrorCatatan("");
  };

  const bukaModal = () => {
    if (!selected) return;
    setModalMode("review");
    setModalCatatan("");
    setModalError("");
    setModalOpen(true);
  };

  const modalSetuju = () => {
    handleSetuju();
    setModalOpen(false);
  };

  const modalKirimTolak = () => {
    if (!modalCatatan.trim()) {
      setModalError("Alasan penolakan wajib diisi sebelum dikirim.");
      return;
    }
    terapkanKeputusan(selected.id, "tolak", modalCatatan.trim());
    setCatatan(modalCatatan.trim());
    setModalOpen(false);
  };

  /* ------------------------ simulasi presentasi ------------------------ */

  const jalankanSimulasi = (key) => {
    const fresh = makeInitialCandidates();
    setKandidatList(fresh);
    setFilter("semua");
    setDocTab("dokumen");
    setZoom(100);
    setErrorCatatan("");
    setModalOpen(false);
    setModalMode("review");
    setModalCatatan("");
    setModalError("");
    setSelectedId(1);
    setCatatan("");

    if (key === "awal") return;

    if (key === "setuju") {
      setKandidatList(
        fresh.map((k) =>
          k.id === 1
            ? {
                ...k,
                status: "disetujui",
                result: {
                  tipe: "sukses",
                  teks: "Mentor disetujui. Role dan Wallet berhasil dibuat.",
                },
              }
            : k
        )
      );
      return;
    }

    if (key === "tolak") {
      setCatatan("Tidak sesuai");
      setKandidatList(
        fresh.map((k) =>
          k.id === 1
            ? {
                ...k,
                rejectCount: 1,
                status: "ditolak",
                catatan: "Tidak sesuai",
                result: { tipe: "sukses", teks: "Pengajuan ditolak dan catatan dikirim." },
              }
            : k
        )
      );
      return;
    }

    if (key === "terkunci") {
      // Bima sudah ditolak 2x; klik "Tolak Pengajuan" akan mengunci akunnya
      setSelectedId(4);
      setCatatan("Dokumen tidak terbaca");
      return;
    }

    if (key === "modal") {
      setModalOpen(true);
      return;
    }

    if (key === "modalTolak") {
      setModalMode("tolak");
      setModalOpen(true);
      return;
    }

    if (key === "kosong") {
      setKandidatList([]);
      setSelectedId(null);
    }
  };

  /* ----------------------------- render ----------------------------- */

  const adaCatatan = catatan.trim().length > 0;

  return (
    <div className="min-h-screen bg-lightBg font-sans text-primary">
      {/* Header Admin Verifikasi */}
      <header className="flex items-center justify-between border-b border-accent/70 bg-white px-6 py-4 shadow-sm sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-base font-extrabold text-primary">Portal Admin Verifikasi</h1>
            <p className="text-[11px] text-slate-500 font-medium">Divisi Onboarding &amp; Kelayakan Mentor</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block leading-tight">
            <p className="text-sm font-bold text-primary">Theo Rodriguez</p>
            <p className="text-xs text-slate-500">admin_verifikator</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/15 text-secondary">
            <User size={18} />
          </span>
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-bold text-red-500 transition hover:bg-red-50 focus:outline-none"
          >
            <ArrowLeft size={13} /> Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-8 sm:px-7">
        {/* Judul halaman */}
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className=" text-3xl text-primary">Verifikasi Kelayakan Mentor</h2>
            <p className="mt-2  text-sm text-slate-500">
              Antrean dokumen privat untuk keputusan onboarding Mentor.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-primary px-5 py-5 text-white">
            <span className=" text-sm text-accent">Antrean Hari Ini</span>
            <span className=" text-3xl">{String(menunggu).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
          {/* ----------------------- Panel kiri: antrean ----------------------- */}
          <section className="flex max-h-[1170px] flex-col border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className=" text-xs font-bold text-secondary">
                    STATUS: MENUNGGU
                  </p>
                  <h3 className="mt-1  text-xl font-bold text-primary">
                    Antrean Calon Mentor
                  </h3>
                </div>
                <span className="rounded-full bg-lightBg px-3 py-1.5  text-sm font-bold text-secondary">
                  {menunggu} kandidat
                </span>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto border-b border-slate-200 px-3 py-3">
              {[
                { key: "semua", label: `Semua Antrean (${kandidatList.length})` },
                { key: "mahasiswa", label: "Mahasiswa Aktif (.ac.id)" },
                { key: "alumni", label: "Alumni (Email Pribadi)" },
              ].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`shrink-0 border px-3 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    filter === f.key
                      ? "border-secondary bg-secondary text-white hover:brightness-110"
                      : "border-accent bg-white text-secondary hover:bg-accent/20"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="min-h-[300px] flex-1 overflow-y-auto">
              {daftarTampil.length === 0 ? (
                <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 px-6 text-center text-slate-500">
                  <Inbox size={36} className="text-accent" />
                  <p className=" text-sm font-bold text-primary">
                    Tidak ada calon mentor di antrean
                  </p>
                  <p className="text-xs">
                    Antrean baru muncul saat calon Mentor mengunggah dokumen. Gunakan tombol Reset
                    pada bar simulasi untuk memuat ulang data contoh.
                  </p>
                </div>
              ) : (
                <ul>
                  {daftarTampil.map((k) => {
                    const aktif = k.id === selectedId;
                    return (
                      <li key={k.id} className="border-b border-slate-100">
                        <button
                          type="button"
                          onClick={() => pilihKandidat(k)}
                          className={`flex w-full items-center gap-3 border-l-4 px-4 py-4 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary ${
                            aktif
                              ? "border-secondary bg-lightBg"
                              : "border-transparent bg-white hover:bg-lightBg/60"
                          }`}
                        >
                          <Avatar kandidat={k} ukuran="h-10 w-10" />
                          <span className="min-w-0 flex-1">
                            <span className="block  text-sm font-bold text-primary">
                              {k.nama}
                            </span>
                            <span className="block text-sm text-slate-500">
                              {k.tipe === "mahasiswa" ? "Mahasiswa" : "Alumni"} · UMRAH
                            </span>
                            <span className="block text-sm text-slate-500">{k.waktu}</span>
                          </span>
                          <span className="flex shrink-0 flex-col items-end gap-2">
                            <span className="rounded-full bg-accentYellow/40 px-3 py-1.5 text-xs font-bold text-amber-900">
                              Jurusan {k.jurusan}
                            </span>
                            {k.status === "menunggu" ? (
                              <ArrowRight size={14} className="text-primary" />
                            ) : (
                              <span
                                className={`rounded px-2 py-0.5 text-[10px] font-bold text-white ${
                                  k.status === "disetujui" ? "bg-secondary" : "bg-red-500"
                                }`}
                              >
                                {k.status === "disetujui"
                                  ? "Disetujui"
                                  : k.status === "terkunci"
                                  ? "Terkunci"
                                  : "Ditolak"}
                              </span>
                            )}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>

          {/* ----------------------- Panel kanan: detail ----------------------- */}
          <section className="border border-slate-200 bg-white">
            {!selected ? (
              <div className="flex min-h-[500px] flex-col items-center justify-center gap-3 px-6 text-center text-slate-500">
                <FileText size={40} className="text-accent" />
                <p className=" text-base font-bold text-primary">
                  Belum ada kandidat dipilih
                </p>
                <p className="text-sm">Pilih calon Mentor dari antrean untuk memeriksa dokumennya.</p>
              </div>
            ) : (
              <>
                {/* Kandidat terpilih */}
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 p-5">
                  <div className="flex items-center gap-4">
                    <Avatar kandidat={selected} ukuran="h-14 w-14" />
                    <div>
                      <p className=" text-xs font-bold text-secondary">
                        KANDIDAT TERPILIH
                      </p>
                      <h3 className=" text-2xl font-bold text-primary">
                        {selected.nama}
                      </h3>
                      <p className=" text-sm text-slate-500">
                        {selected.email} · UMRAH
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-lightBg px-3 py-2 text-sm text-slate-600">
                    <Lock size={13} />
                    <span>
                      Signed URL berumur
                      <br />
                      pendek · AuditLog aktif
                    </span>
                  </div>
                </div>

                {/* Tab dokumen */}
                <div className="px-5 pt-5">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDocTab("dokumen")}
                      className={`border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                        docTab === "dokumen"
                          ? "border-secondary bg-secondary text-white hover:brightness-110"
                          : "border-accent bg-white text-secondary hover:bg-accent/20"
                      }`}
                    >
                      {judulDokumen(selected)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocTab("portofolio")}
                      className={`border px-4 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                        docTab === "portofolio"
                          ? "border-secondary bg-secondary text-white hover:brightness-110"
                          : "border-accent bg-white text-secondary hover:bg-accent/20"
                      }`}
                    >
                      Portofolio Akademik
                    </button>
                  </div>

                  {/* Viewer */}
                  <div className="mt-4 border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 text-sm">
                      <span className="text-primary">
                        {docTab === "dokumen" ? `${judulDokumen(selected)}.pdf` : "Portofolio Akademik.pdf"}
                      </span>
                      <div className="flex items-center gap-2">
                        {docTab === "dokumen" && (
                          <>
                            <button
                              type="button"
                              aria-label="Perkecil"
                              onClick={() => setZoom((z) => Math.max(60, z - 10))}
                              className="flex h-6 w-6 items-center justify-center bg-lightBg text-primary transition hover:bg-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-12 text-center  text-sm font-bold">
                              {zoom}%
                            </span>
                            <button
                              type="button"
                              aria-label="Perbesar"
                              onClick={() => setZoom((z) => Math.min(130, z + 10))}
                              className="flex h-6 w-6 items-center justify-center bg-lightBg text-primary transition hover:bg-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                            >
                              <Plus size={12} />
                            </button>
                          </>
                        )}
                        <button
                          type="button"
                          onClick={bukaModal}
                          className="ml-2 inline-flex items-center gap-1 border border-accent px-2 py-1 text-xs font-bold text-secondary transition hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                        >
                          <Maximize2 size={12} /> Buka di modal
                        </button>
                      </div>
                    </div>

                    <div className="min-h-[560px] overflow-auto bg-slate-200/60 p-6 sm:p-6">
                      {docTab === "dokumen" ? (
                        <div style={{ paddingBottom: `${Math.max(0, (zoom - 100) * 3)}px` }}>
                          <DokumenKartu kandidat={selected} skala={zoom / 100} />
                        </div>
                      ) : (
                        <PortofolioAkademik kandidat={selected} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Catatan & keputusan */}
                <div className="mt-5 border-t border-slate-100 p-5">
                  <label
                    htmlFor="catatan-verifikasi"
                    className=" text-sm font-bold text-primary"
                  >
                    Catatan Verifikasi
                  </label>
                  <textarea
                    id="catatan-verifikasi"
                    value={catatan}
                    disabled={sudahDiputuskan}
                    onChange={(e) => {
                      setCatatan(e.target.value);
                      if (errorCatatan) setErrorCatatan("");
                    }}
                    placeholder="Wajib jika ditolak. Contoh: Foto KTM terpotong..."
                    rows={3}
                    aria-invalid={errorCatatan ? "true" : "false"}
                    className={`mt-3 h-24 w-full resize-y border bg-lightBg px-4 py-3 text-sm font-bold text-primary placeholder:font-bold placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-80 ${
                      errorCatatan
                        ? "border-red-400 focus:ring-red-300"
                        : "border-accent focus:ring-accent"
                    }`}
                  />
                  {errorCatatan && (
                    <p role="alert" className="mt-2 text-sm font-semibold text-red-500">
                      {errorCatatan}
                    </p>
                  )}

                  <div className="mt-3 flex items-start gap-2 bg-lightBg px-4 py-3  text-sm text-primary">
                    <ShieldCheck size={15} className="mt-0.5 shrink-0 text-secondary" />
                    <p>
                      Disetujui: sistem memberikan peran Mentor dan membuat Wallet. Ditolak ke-3 kali:
                      akun terkunci hingga dibuka super_admin.
                      {selected.rejectCount > 0 && selected.status === "menunggu" && (
                        <span className="font-bold text-red-500">
                          {" "}
                          Kandidat ini sudah ditolak {selected.rejectCount}x.
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleTolak}
                      disabled={sudahDiputuskan}
                      className={`border px-6 py-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-60 ${
                        adaCatatan && !sudahDiputuskan
                          ? "border-red-400 bg-white text-red-500 hover:bg-red-50"
                          : "border-red-400 bg-slate-200 text-slate-400"
                      }`}
                    >
                      Tolak Pengajuan
                    </button>
                    <button
                      type="button"
                      onClick={handleSetuju}
                      disabled={sudahDiputuskan}
                      className="inline-flex items-center gap-2 bg-secondary px-6 py-3 text-sm font-bold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100"
                    >
                      Setujui Mentor <Check size={14} />
                    </button>
                  </div>

                  {selected.result && (
                    <p
                      role="status"
                      className={`mt-4 flex items-center gap-2  text-sm font-bold ${
                        selected.result.tipe === "bahaya" ? "text-red-500" : "text-secondary"
                      }`}
                    >
                      {selected.result.tipe === "bahaya" ? <Lock size={14} /> : <Check size={14} />}
                      {selected.result.teks}
                    </p>
                  )}
                </div>
              </>
            )}
          </section>
        </div>
      </main>

      {/* ----------------------- Modal overlay ----------------------- */}
      {modalOpen && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
              <div className="flex items-center gap-3">
                <Avatar kandidat={selected} ukuran="h-11 w-11" />
                <div>
                  <h3 id="judul-modal" className=" text-lg font-bold text-primary">
                    {modalMode === "review" ? `Dokumen ${selected.nama}` : "Alasan penolakan"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {modalMode === "review"
                      ? `${judulDokumen(selected)} · ${selected.email}`
                      : `Untuk pengajuan ${selected.nama}. Catatan ini dikirim ke calon Mentor.`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Tutup"
                onClick={() => setModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center text-primary transition hover:bg-lightBg focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <X size={18} />
              </button>
            </div>

            {modalMode === "review" ? (
              <>
                <div className="flex-1 overflow-y-auto bg-slate-200/60 p-5">
                  <DokumenKartu kandidat={selected} skala={1} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 p-5">
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <Lock size={12} /> Dokumen privat, aktivitas ini dicatat di AuditLog.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setModalMode("tolak");
                        setModalError("");
                      }}
                      disabled={sudahDiputuskan}
                      className="border border-red-400 bg-white px-5 py-2.5 text-sm font-bold text-red-500 transition hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Tolak
                    </button>
                    <button
                      type="button"
                      onClick={modalSetuju}
                      disabled={sudahDiputuskan}
                      className="inline-flex items-center gap-2 bg-secondary px-5 py-2.5 text-sm font-bold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Setujui <Check size={14} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  <label
                    htmlFor="alasan-penolakan"
                    className=" text-sm font-bold text-primary"
                  >
                    Alasan penolakan
                  </label>
                  <textarea
                    id="alasan-penolakan"
                    value={modalCatatan}
                    onChange={(e) => {
                      setModalCatatan(e.target.value);
                      if (modalError) setModalError("");
                    }}
                    rows={5}
                    placeholder="Contoh: Foto KTM terpotong, mohon unggah ulang dokumen yang utuh."
                    className={`mt-3 w-full resize-y border bg-lightBg px-4 py-3 text-sm text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                      modalError ? "border-red-400 focus:ring-red-300" : "border-accent focus:ring-accent"
                    }`}
                  />
                  {modalError && (
                    <p role="alert" className="mt-2 text-sm font-semibold text-red-500">
                      {modalError}
                    </p>
                  )}

                  <p className="mt-4 text-xs font-semibold text-slate-500">Alasan cepat</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ALASAN_CEPAT.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => {
                          setModalCatatan(a);
                          setModalError("");
                        }}
                        className="border border-accent bg-white px-3 py-1.5 text-xs font-bold text-secondary transition hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                      >
                        {a}
                      </button>
                    ))}
                  </div>

                  {selected.rejectCount >= 2 && (
                    <p className="mt-4 bg-red-50 px-4 py-3 text-sm font-semibold text-red-500">
                      Ini penolakan ke-3. Akun {selected.nama} akan terkunci hingga dibuka super_admin.
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 p-5">
                  <button
                    type="button"
                    onClick={() => setModalMode("review")}
                    className="border border-accent bg-white px-5 py-2.5 text-sm font-bold text-secondary transition hover:bg-accent/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    Kembali ke dokumen
                  </button>
                  <button
                    type="button"
                    onClick={modalKirimTolak}
                    className="bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                  >
                    Kirim Penolakan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
