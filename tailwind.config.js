/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['"Anton"', 'sans-serif'], // For Headings
        inter: ['"Inter"', 'sans-serif'], // For Body text
      },
      colors: {
        'latent-yellow': '#FACC15', // The branding color
        'latent-black': '#0a0a0a',
        'latent-gray': '#1c1c1c',
      }
    },
  },
  plugins: [],
}