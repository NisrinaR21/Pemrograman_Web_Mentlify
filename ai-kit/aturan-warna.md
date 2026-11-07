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

## 2. Standar Bentuk Komponen (UI Style)
<!-- [UBAH DI SINI]: Jika ada bentuk lengkungan atau bayangan yang ingin kamu ubah, edit di bagian ini -->

1. **Lengkungan Sudut (Border Radius):**
   - **Tombol Utama & Tombol Top Up:** Bentuk kapsul penuh (`rounded-full`).
   - **Kartu Konten Besar (Jadwal, Misi, Statistik Bawah):** Lengkungan besar yang lembut (`rounded-2xl` atau `rounded-3xl`).
2. **Gaya Kartu Putih (Card):**
   - `bg-white border border-softMint rounded-2xl p-6 shadow-sm`
3. **Gaya Navbar Atas:**
   - Latar belakang `bg-darkNavy` dengan efek *tab* menu yang sedang aktif menyatu ke warna latar bawah (`bg-lightBg text-primary font-bold rounded-t-2xl`).
4. **Paket Ikon:**
   - Wajib menggunakan `lucide-react` (Contoh: `Calendar`, `Flame`, `Bell`, `ArrowUpRight`, `CheckCircle2`, `Clock`, `Target`).