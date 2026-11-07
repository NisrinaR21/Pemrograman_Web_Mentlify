/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#464b71',      // Frame, navigasi, dan teks gelap (bg-primary, text-primary)
        secondary: '#118AB2',    // Tombol utama, CTA, serta status sukses (bg-secondary, text-secondary)
        deepBlue: '#118AB2',     // Alias tombol utama
        accent: '#7cd5c7',       // Aksen, border kartu, highlight, gradien (border-accent, bg-accent)
        darkNavy: '#7cd5c7',     // Alias aksen
        softMint: '#7cd5c7',     // Alias aksen lembut
        lightBg: '#f2f2ed',      // Canvas dan permukaan ringan latar belakang (bg-lightBg)
        accentYellow: '#F9C74F', // Tombol Top Up emas/kuning cerah (bg-accentYellow)
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}