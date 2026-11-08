# 📋 Peta Distribusi 9 Page Inti Mentlify (60 Frame Figma)

Di bawah ini adalah pembagian **9 Page Inti** antara **Nisrina (Dev 1)** dan **Dhiya (Dev 2)**. 
Ingat: Tampilan kosong (*empty state*), tampilan berisi, *sub-menu* (seperti Pengaturan Akun di dalam Profil), dan *Pop-up Overlay* **tidak dihitung sebagai Page Inti baru**, melainkan dimasukkan ke dalam folder Page Inti induknya masing-masing!

---

## 🗂️ Struktur Penyimpanan Screenshot di `ai-kit/ss-figma/`

```text
ai-kit/ss-figma/
├── page01-login/        <-- (Dipakai bersama: Login, Register, Lupa Password, Topik Minat)
├── page02-dashbor/      <-- (Mentee & Mentor: Dasbor Utama, Jadwal 15m/Kosong, Kuis, Manajemen Soal)
├── page03-CariMentor/   <-- (Mentee: Filter Pencarian, Kartu Mentor, Pop-up Detail, & Booking)
├── page04-JadwalSesi/   <-- (Mentee & Mentor: Jadwal Utama, Ruang Tunggu, Ruang Obrolan, Kalender, Banding)
├── page05-rating/       <-- (Mentee & Mentor: Daftar Menunggu Ulasan, Form Bintang, Daftar Ulasan Diterima)
├── page06-profile/      <-- (Mentee & Mentor: Profil Mode Baca, Edit Profil, & Pengaturan Keamanan Akun)
├── page07-TopUp/        <-- (Mentee & Mentor: Top Up Koin Mentee, QRIS, & Payout/Tarik Dana Mentor)
├── page08-ADMver/       <-- (Khusus Admin: Tabel Calon Mentor, Cek Dokumen CV, Form Tolak)
└── page09-ADMfin/       <-- (Khusus Admin: Tabel Request Payout, Dispute/Banding Sesi, Upload Bukti Transfer)