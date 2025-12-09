/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'], 
        inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'latent-yellow': '#FACC15',
        'latent-black': '#0a0a0a',
        'latent-gray': '#1c1c1c',
      }
    },
  },
  plugins: [],
}