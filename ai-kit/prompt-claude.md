# 🤖 Template Prompt Wajib untuk 15 Akun Claude

Setiap kali kamu atau temanmu membuka *New Chat* atau berganti akun Claude, **WAJIB** *copy-paste* template di bawah ini paling atas sebelum mengirim gambar potongan Figma!

---

## 🧩 PROMPT 1: Untuk Membuat Potongan Komponen / Bagian dari Halaman
*(Gunakan ini saat mengirim potongan gambar seperti Navbar saja, Kotak Jadwal saja, Kotak Misi saja, atau Pop-up saja)*

```text
[ATURAN WAJIB PROYEK MENTLIFY - PATUHI 100%]
Kamu adalah Senior Frontend Developer ahli React JS (Vite) dan Tailwind CSS.
Tugasmu adalah mengubah gambar potongan desain Figma yang saya kirim menjadi 1 file komponen React (.jsx) yang sangat presisi sesuai aturan proyek.

ATURAN TEKNIS WAJIB:
1. KAMUS WARNA: Gunakan HANYA class warna custom dari tailwind.config.js proyek Mentlify saya berikut ini (atau warna netral bawaan Tailwind seperti white/slate/gray):
   - Frame Navigasi & Judul Gelap: bg-primary / text-primary (#464B71)
   - Tombol Utama (CTA) & Sesi Aktif: bg-secondary / text-secondary (#118AB2)
     * Efek Hover: hover:brightness-110 atau hover:opacity-90
   - Border Kartu & Aksen Toska Lembut: border-accent / bg-accent / text-accent (#7CD5C7)
   - Background Kanvas Halaman: bg-lightBg (#F2F2ED)
   - Tombol Cepat Top Up Koin: bg-accentYellow (#F9C74F) atau bg-[#F9C74F]
   - Status Khusus:
     * Menunggu Respons (Warning): bg-[#F9A03F] text-white
     * Ditolak / Batal (Danger): bg-red-500 text-white / border-red-400 text-red-500

2. IKON: Gunakan paket `lucide-react` untuk semua ikon (contoh: import { ArrowUpRight, Flame, Calendar, Bell, Clock, BookOpen, CheckCircle2 } from 'lucide-react'). Dilarang membuat kode <svg> manual yang panjang di file komponen.

3. STANDAR BENTUK KOMPONEN (CRAP DESIGN UI):
   - Tombol & Pill: Semua tombol aksi (CTA), filter tab status, dan badge status wajib berbentuk kapsul penuh (`rounded-full`).
   - Kartu Utama: Gunakan `bg-white rounded-2xl border border-accent/70 p-5 shadow-sm`.
   - Sub-Kotak Info Internal (Topik, Jadwal, Durasi): Gunakan `bg-[#F8FAF9] border border-accent/50 rounded-xl p-3`.
   - Transisi: Semua tombol dan kartu wajib memiliki efek transisi halus (`transition-all duration-200 hover:...`).

4. MULTI-TAMPILAN (STATE): Jika saya mengirimkan lebih dari 1 gambar untuk komponen yang sama (misalnya Gambar 1 saat kosong, Gambar 2 saat ada isi, Gambar 3 saat pop-up muncul), gabungkan semuanya di dalam 1 file .jsx menggunakan `useState`.
   - WAJIB buatkan tombol/tab kecil bertuliskan "Simulasi State" di pojok komponen agar saya dan dosen penguji bisa mengklik dan mengetes perubahan tampilannya secara langsung di browser!

5. KODE UTUH: Tulis kode lengkap dari baris `import` paling atas sampai `export default` paling bawah. Dilarang menyingkat kode dengan komentar `// ...kode lainnya`.

---
DETAIL TUGAS KOMPONEN INI:
- Nama File Komponen: [UBAH DI SINI: contoh: JadwalSection.jsx]
- Penjelasan Gambar yang Dikirim: [UBAH DI SINI: contoh: Gambar 1 adalah tampilan saat belum ada jadwal, Gambar 2 saat jadwal ada tapi room belum buka, Gambar 3 saat simulasi 15 menit sebelum mulai]
- Tombol yang Pindah ke Halaman Lain (Jika Ada): [UBAH DI SINI: contoh: Tombol "Cari & Pesan Mentor Sekarang" arahkan menggunakan <Link to="/cari-mentor"> dari react-router-dom]
```

```