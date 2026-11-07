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