/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['"Anton"', 'sans-serif'], // The dramatic show font
        inter: ['"Inter"', 'sans-serif'], // The clean body font
      },
      colors: {
        'latent-yellow': '#FACC15', // Samay's brand color
        'latent-black': '#0a0a0a',
        'latent-gray': '#1c1c1c',
      }
    },
  },
  plugins: [],
}