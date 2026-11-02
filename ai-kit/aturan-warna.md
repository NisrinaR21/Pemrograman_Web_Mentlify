# 🎨 Ketentuan Warna & Desain Mentlify

Dokumen ini adalah patokan wajib.
Jangan menggunakan kode warna lain di luar daftar ini.

## 1. Palet Warna Resmi (Sudah Terdaftar di Tailwind)
| Nama Class di Tailwind | Kode Hex | Kegunaan Utama |
| :--- | :--- | :--- |
| `bg-primary` / `text-primary` | `#464B71` | Frame, navigasi, dan teks gelap |
| `bg-secondary` / `text-secondary` | `#118AB2` | Tombol utama, CTA, serta status sukses |
| `bg-accent` / `border-accent` / `text-accent` | `#7CD5C7` | Aksen, border, highlight, gradien |
| `bg-lightBg` | `#F2F2ED` | Canvas dan permukaan ringan (background halaman/luar kartu) |

## 2. Aturan Komponen & Interaksi
1. **Tombol Utama (Primary / CTA Button):**
   `bg-secondary hover:opacity-90 text-white font-medium px-5 py-2.5 rounded-lg transition-all duration-200`
2. **Tombol Kedua (Secondary / Outline Button):**
   `bg-white hover:bg-lightBg text-primary border border-primary font-medium px-5 py-2.5 rounded-lg transition-all duration-200`
3. **Efek Kartu (Card Hover):**
   Semua kartu daftar mentor atau materi menggunakan `bg-white rounded-xl shadow-sm border border-accent/40 hover:shadow-md transition-all`.
4. **Ikon:**
   Wajib menggunakan paket `lucide-react` (Jangan pakai SVG panjang di dalam kodingan halaman).