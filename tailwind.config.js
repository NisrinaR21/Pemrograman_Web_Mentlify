/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#464b71',      // Frame, navigasi, teks gelap
        secondary: '#118AB2',    // Tombol utama & CTA
        accent: '#7cd5c7',       // Aksen, highlight, dan border
        darkNavy: '#1E2337',     // Contoh: Warna yang lebih gelap dari primary untuk kontras tinggi
        lightBg: '#f2f2ed',      // Canvas latar belakang
        accentYellow: '#F9C74F', // Tombol Top Up
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}