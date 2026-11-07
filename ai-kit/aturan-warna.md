# 🎨 Ketentuan Warna & Desain Mentlify

Dokumen ini adalah patokan wajib.
Jangan menggunakan kode warna atau bentuk komponen di luar daftar ini agar konsistensi antarmuka antartim tetap terjaga.

---

## 1. Palet Warna Resmi (Sudah Terdaftar di Tailwind)
| Nama Class di Tailwind | Kode Hex | Kegunaan Utama |
| :--- | :--- | :--- |
| `bg-primary` / `text-primary` | `#464B71` | Frame bar navigasi atas, teks judul gelap, dan badge counter sesi |
| `bg-secondary` / `text-secondary` | `#118AB2` | Tombol utama/CTA, filter aktif, link aktif, badge sukses, dan kartu misi |
| `bg-accent` / `border-accent` / `text-accent` | `#7CD5C7` | Garis tepi (border) kartu, border pill filter, dan highlight aksen |
| `bg-lightBg` | `#F2F2ED` | Warna canvas latar belakang utama (body halaman / luar kartu) |
| *Warna Khusus Tombol Top Up* | `#F9C74F` | Tombol aksi cepat Top Up koin (emas/kuning cerah) |

---

## 2. Standar Bentuk Komponen (UI Style & Component Guidelines)

Berdasarkan rancangan antarmuka pada Figma (halaman *Manajemen Jadwal Sesi* dan *Dasbor*), berikut adalah aturan baku bentuk, sudut, dan styling komponen:

### 1. Hierarki Sudut Lengkungan (Border Radius Hierarchy)
- **Kapsul Penuh (`rounded-full`):**
  - Digunakan untuk: Seluruh tombol aksi utama/sekunder (CTA), filter tab status sesi, badge status (Dikonfirmasi/Menunggu/Ditolak), input kode OTP, tombol Top Up, dan avatar pengguna.
- **Lengkungan Ekstra Besar (`rounded-3xl` / 24px - 32px):**
  - Digunakan untuk: Sudut atas canvas utama pembungkus halaman, Banner Hero/Promo Dasbor, dan Card Gamifikasi Misi & Streak (widget sebelah kanan).
- **Lengkungan Besar (`rounded-2xl` / 16px):**
  - Digunakan untuk: Wadah kartu utama sesi bimbingan (*Session Card*), kartu konten jadwal hari ini, dan widget statistik sesi bulan ini di pojok kanan atas.
- **Lengkungan Sedang (`rounded-xl` / 12px):**
  - Digunakan untuk: Sub-kotak informasi di dalam kartu (kotak Topik, Jadwal, Durasi), kotak/banner Bank Soal Sesi, dan badge kotak tanggal kalender (*Date Badge*).
- **Lengkungan Standar (`rounded-lg` / 8px):**
  - Digunakan untuk: Kotak tautan link meeting (Google Meet URL box) dan dropdown/input form standar.

---

### 2. Navigasi Atas & Tab Folder (Header & Navigation)
- **Bar Utama:** 
  - Class: `bg-primary text-white px-8 py-3.5 flex items-center justify-between`
- **Menu Tab Aktif (Efek Folder Berkas):**
  - Tab menu yang sedang aktif dirancang menempel ke dasar navbar dan menyatu mulus dengan latar canvas di bawahnya:
  - Class: `bg-lightBg text-secondary font-bold px-6 py-2.5 rounded-t-2xl relative shadow-sm`
- **Menu Tab Non-Aktif:**
  - Class: `text-white/80 hover:text-white font-medium px-4 py-2 text-sm transition-colors`
- **Tombol Top Up:**
  - Bentuk kapsul kuning-emas mencolok:
  - Class: `rounded-full bg-[#F9C74F] hover:bg-[#F3B728] text-slate-900 font-bold px-4 py-2 text-sm flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105`
- **Tombol Notifikasi (Lonceng):**
  - Lingkaran minimalis: `rounded-full w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors`

---

### 3. Ragam Tombol (Button System)
Semua tombol menggunakan bentuk kapsul (`rounded-full`) dengan efek transisi halus:
1. **Tombol Utama Solid (Primary CTA):**
   - Class: `rounded-full bg-secondary hover:brightness-110 text-white font-medium px-4 py-2 text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-sm`
   - Contoh: Tombol *"Ruang Tunggu Video"*, *"Kirim OTP"*.
2. **Tombol Sekunder Outline (Secondary Outline):**
   - Class: `rounded-full border border-secondary text-secondary bg-white hover:bg-secondary/10 font-medium px-4 py-2 text-sm flex items-center justify-center gap-1.5 transition-all duration-200`
   - Contoh: Tombol *"Buka Obrolan"*, *"Kelola Bank Soal ↗"*.
3. **Tombol Aksi Batal / Bahaya (Danger Outline):**
   - Class: `rounded-full border border-red-400 text-red-500 bg-white hover:bg-red-50 font-medium px-4 py-1.5 text-sm transition-all duration-200`
   - Contoh: Tombol *"Batalkan Pengajuan"*.
4. **Tombol Dinonaktifkan (Disabled Button):**
   - Class: `rounded-full bg-slate-200 text-slate-400 font-medium px-4 py-2 text-sm cursor-not-allowed select-none`
   - Contoh: Tombol *"Ruang Sesi Belum Dibuka"*.

---

### 4. Filter Tab Status Sesi (Pill Filter Tabs)
Navigasi filter status di atas daftar sesi:
- **Tab Filter Aktif:**
  - Class: `rounded-full bg-secondary text-white font-medium px-4 py-1.5 text-sm shadow-sm transition-all`
- **Tab Filter Non-Aktif:**
  - Class: `rounded-full border border-accent bg-white text-secondary hover:bg-slate-50 font-medium px-4 py-1.5 text-sm transition-all`
- **Indikator Badge Angka (Notifikasi pada Tab):**
  - Lingkaran merah penanda jumlah: `rounded-full bg-red-500 text-white text-[10px] w-4 h-4 inline-flex items-center justify-center font-bold ml-1.5`

---

### 5. Badge Status Sesi (Status Tags)
Bentuk kapsul ramping (`rounded-full px-3 py-1 text-xs font-semibold flex items-center gap-1`):
- **Menunggu Respons Mentor:** `bg-[#F9A03F] text-white` (oranye/amber tegas)
- **Dikonfirmasi:** `bg-secondary text-white` (biru toska solid) atau `bg-amber-100 text-amber-800` (pada kartu ringkasan)
- **Ditolak Mentor:** `bg-red-500 text-white` (merah tegas)
- **Tag Refund Koin:** Kapsul mini `bg-secondary text-white text-[10px] rounded-full px-2 py-0.5 font-bold`

---

### 6. Struktur Kartu Sesi (Session Card Layout)
- **Wadah Kartu Utama:**
  - Class: `bg-white rounded-2xl border border-accent/70 p-5 shadow-sm hover:border-accent transition-all`
- **Profil Mentor (Kiri Atas):**
  - Foto Profil: Lingkaran berbingkai `rounded-full w-12 h-12 border-2 border-accent object-cover`
  - Kategori: Huruf kapital kecil tebal `text-[11px] font-bold text-secondary tracking-wider uppercase`
  - Nama Mentor: Teks tebal gelap `text-base font-bold text-slate-800`
  - Jurusan / Keahlian: Teks pendukung `text-xs text-slate-500`
- **3 Sub-Kotak Informasi (Topik, Jadwal, Durasi):**
  - Layout Grid 3 kolom: `grid grid-cols-1 md:grid-cols-3 gap-3 my-3`
  - Container sub-kotak: `bg-[#F8FAF9] border border-accent/50 rounded-xl p-3 flex items-start gap-2.5`
  - Label Judul: `text-[10px] font-bold text-secondary uppercase tracking-wider`
  - Isi Keterangan: `text-xs md:text-sm font-semibold text-slate-700`
  - Ikon: Berwarna `text-secondary` dengan ukuran 16px - 18px
- **Area Aksi Interaksi (Kanan):**
  - Menampilkan countdown waktu: `text-xs text-slate-500 flex items-center gap-1`
  - Tautan Meeting URL: `bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-600 flex items-center gap-1.5 select-all`
  - Input Kode OTP: `rounded-full border border-slate-300 px-3 py-1 text-xs text-center w-24 tracking-widest focus:border-secondary focus:outline-none`

---

### 7. Widget Khusus & Gamifikasi (Dasbor)
- **Widget Statistik Sesi Bulan Ini (Kanan Atas):**
  - Class: `bg-primary text-white rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-sm`
  - Ikon kalender di dalam kotak toska: `bg-accent/20 p-2 rounded-xl text-accent`
  - Angka statistik besar: `text-xl font-extrabold text-white`
- **Widget Misi & Hari Beruntun (Gamifikasi Kanan):**
  - Wadah Card: `bg-gradient-to-b from-[#118AB2] to-[#0E7490] text-white rounded-3xl p-5 shadow-md`
  - Streak Api: Ikon `Flame` oranye-kuning, angka raksasa `text-4xl font-extrabold`
  - Bar Kemajuan (XP Progress): `h-1.5 bg-white/20 rounded-full overflow-hidden` dengan isi `bg-accent`
  - Item Misi: Kotak checklist dengan checkbox lingkaran `rounded-full w-4 h-4 border border-white/40` dan tag perolehan XP (`text-[#7CD5C7] text-xs font-semibold`)
- **Badge Tanggal Kalender (Sesi Hari Ini):**
  - Class: `bg-secondary text-white rounded-xl p-2.5 w-14 text-center shadow-sm flex flex-col items-center justify-center`
  - Angka tanggal: `text-xl font-bold leading-none`
  - Bulan: `text-[10px] font-bold tracking-widest uppercase mt-1`
- **Sub-Banner Bank Soal Sesi:**
  - Class: `bg-sky-50 border border-sky-200 rounded-xl p-3.5 flex items-center justify-between gap-3`

---

### 8. Aturan Ikonografi (Lucide React)
- **Wajib menggunakan paket `lucide-react`**, dilarang membuat tag `<svg>` manual yang panjang di file komponen.
- Daftar ikon standar yang digunakan pada desain:
  - Navigasi & Umum: `Bell`, `ArrowUpRight`, `ExternalLink`, `Copy`
  - Sesi & Waktu: `Calendar`, `Clock`, `BookOpen`, `Video`, `MessageSquare`
  - Status & Keamanan: `CheckCircle2`, `AlertCircle`, `XCircle`, `ShieldAlert`
  - Gamifikasi & Misi: `Flame`, `Target`, `Trophy`, `Sparkles`