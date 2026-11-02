/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#464B71', //frame, navigasi, dan teks gelap    
                secondary: '#118AB2', //tombol utama, CTA, serta status sukses    
                accent: '#7CD5C7', //aksen, border, highlight, gradien
                lightBg: '#F2F2ED', //canvas dan permukaan ringan   
            },
            fontFamily: {
                sans: ['Montserrat', 'Poppins', 'Inter'],
            }
        },
    },
    plugins: [],
}