# 🤖 Kumpulan Prompt Wajib untuk 15 Akun Claude

Setiap kali ganti akun Claude atau buka *New Chat*, **WAJIB** copy-paste kotak di bawah ini sesuai kebutuhan:

---

## PROMPT A: Khusus Membuat Bingkai Luar (Sidebar & Navbar) - Hanya Sekali di Awal
> Saya sedang membuat proyek web "Mentlify" menggunakan React JS (Functional Component), Tailwind CSS, dan paket ikon `lucide-react`.
> 
> Berdasarkan gambar screenshot Figma yang saya lampirkan, buatkan 3 file terpisah:
> 1. `Sidebar.jsx` (menu kiri)
> 2. `Navbar.jsx` (header atas)
> 3. `MainLayout.jsx` yang menggabungkan `Sidebar` di kiri, `Navbar` di atas, dan area konten dinamis `{children}` di tengah.
> 
> ATURAN WARNA TAILWIND SAYA:
> Gunakan hanya class warna custom ini: `primary` (#005DBD), `darkNavy` (#091540), `deepBlue` (#0D47A1), `lightBg` (#E3F2FD), dan `softBlue` (#ABD2FA).
> Pastikan responsif (Sidebar bisa dibuka-tutup di layar HP menggunakan `useState`).

---

## PROMPT B: Prompt Harian untuk Mencetak Halaman (Copy-Paste di Tiap Akun Claude Baru)
> **[ATURAN WAJIB PROYEK MENTLIFY - BACA SEBELUM MEMBUAT KODE]**
> Kamu adalah Senior Frontend Developer ahli React JS dan Tailwind CSS. Tugasmu adalah mengubah gambar potongan desain Figma yang saya kirim menjadi kode komponen halaman React (`.jsx`).
> 
> **PATUHI 6 ATURAN INI TANPA TERKECUALI:**
> 1. **Fokus Area Tengah:** JANGAN membuat ulang Sidebar atau Navbar. Langsung bungkus isi halaman ini dengan `<MainLayout> ...isi halaman... </MainLayout>` (asumsikan di-import dari `../../layouts/MainLayout`).
> 2. **Wajib Pakai Kamus Warna Saya:** Gunakan class warna custom yang sudah ada di `tailwind.config.js` saya:
>    - Biru Utama: `bg-primary` / `text-primary` (#005DBD)
>    - Biru Gelap/Teks: `bg-darkNavy` / `text-darkNavy` (#091540)
>    - Efek Hover Tombol: `hover:bg-deepBlue` (#0D47A1)
>    - Latar Muda: `bg-lightBg` (#E3F2FD)
>    - Garis/Aksen Lembut: `border-softBlue` / `bg-softBlue` (#ABD2FA)
> 3. **Ikon:** Gunakan library `lucide-react` untuk semua ikon (contoh: `import { Search, Bell, ChevronRight } from 'lucide-react'`). Dilarang menulis tag `<svg>` manual yang panjang.
> 4. **Interaksi & Animasi:** 
>    - Semua tombol dan kartu yang bisa diklik WAJIB diberi efek `hover:` dan `transition-all duration-200`.
>    - Jika di gambar ada *Slide Banner / Carousel*, *Tab Switching*, *Dropdown*, atau *Pop-up Modal*, langsung buatkan logika `useState` dan data *dummy* array di dalam file yang sama agar bisa langsung diklik dan dicoba.
> 5. **Satu File Utuh:** Berikan kode lengkap dalam 1 file `.jsx` tanpa ada bagian yang disingkat dengan komentar `// ...kode lainnya`.
> 
> **INSTRUKSI KHUSUS HALAMAN INI:**
> - Nama Komponen Halaman: `[Tulis nama halaman, misal: CariMentor.jsx]`
> - Penjelasan Gambar: `[Jelaskan singkat, misal: Gambar 1 adalah halaman daftar mentor, Gambar 2 adalah pop-up filter saat tombol Filter diklik]`
> - Catatan Interaksi: `[Jelaskan interaksi, misal: Buat banner paling atas bisa digeser kiri-kanan berisi 3 slide, dan buat tombol Filter memunculkan pop-up Gambar 2]`