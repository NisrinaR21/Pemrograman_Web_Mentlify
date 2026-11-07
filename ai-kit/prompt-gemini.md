```markdown
# 🧠 Template Prompt untuk 4 Akun Gemini Premium

Gunakan **Gemini Premium** sebagai perakit utama karena memorinya sangat besar dan tidak akan memotong kode meskipun kita memasukkan banyak file sekaligus.

---

## 🛠️ PROMPT A: Merakit Potongan Komponen Menjadi 1 Page Inti Utuh
*(Gunakan ini setelah kamu selesai membuat potongan-potongan komponen di Claude, lalu ingin menyatukannya menjadi salah satu dari 8 Page Inti)*

```text
Saya sedang merakit salah satu dari 8 Page Inti proyek React JS + Tailwind CSS saya yang bernama `[UBAH DI SINI: contoh: DashboardPage.jsx]`.

Saya sudah memiliki potongan komponen-komponennya sebagai berikut:
1. Komponen 1 (`BannerSlider.jsx`): [Tempel kode komponen 1]
2. Komponen 2 (`JadwalSection.jsx`): [Tempel kode komponen 2]
3. Komponen 3 (`MisiStreakCard.jsx`): [Tempel kode komponen 3]
4. Komponen 4 (`StatistikBawah.jsx`): [Tempel kode komponen 4]

Tugasmu:
1. Buatkan file induk `DashboardPage.jsx` yang meng-import dan menyusun keempat komponen tersebut persis seperti gambar desain utuh yang saya lampirkan ini.
2. Pastikan tata letak Grid/Flexbox-nya rapi dan proporsional di layar laptop maupun HP.
3. Jika halaman ini memiliki tampilan berbeda antara Mode Mentee dan Mode Mentor, hubungkan dengan prop atau state `userRole` agar komponen di dalamnya menyesuaikan secara otomatis.


Kami sudah menyelesaikan 8 Page Inti untuk proyek React JS kami menggunakan `react-router-dom`.
Berikut adalah daftar 8 file halaman utama kami beserta lokasinya di dalam folder `src/pages/`:

<!-- [UBAH DI SINI]: Sesuaikan dengan nama 8 file Page Inti kalian -->
1. `src/pages/Page1_Auth.jsx` (Alamat URL: `/login`)
2. `src/pages/Page2_Dashboard.jsx` (Alamat URL: `/`)
3. `src/pages/Page3_CariMentor.jsx` (Alamat URL: `/cari-mentor`)
4. `src/pages/Page4_JadwalSesi.jsx` (Alamat URL: `/jadwal-sesi`)
5. `src/pages/Page5_Rating.jsx` (Alamat URL: `/rating`)
6. `src/pages/Page6_Profil.jsx` (Alamat URL: `/profil`)
7. `src/pages/Page7_TopUpDompet.jsx` (Alamat URL: `/top-up`)
8. `src/pages/Page8_AdminPanel.jsx` (Alamat URL: `/admin`)

Serta komponen `Navbar.jsx` kami:
[Tempel kode Navbar.jsx di sini]

Tolong buatkan:
1. Kode lengkap `App.jsx` yang membungkus halaman-halaman tersebut dengan `BrowserRouter`, `Routes`, dan `Route`, serta menyimpan state global `isMentorMode` (Mode Mentee vs Mode Mentor) agar saat pengguna mengganti mode di halaman Profil/Navbar, tampilan Navbar dan Dashboard ikut berubah.
2. Perbarui kode `Navbar.jsx` kami menggunakan `NavLink` atau `Link` dari `react-router-dom` agar saat menu di atas diklik, halaman benar-benar berpindah dan tab putih aktifnya berpindah mengikuti halaman yang sedang dibuka!