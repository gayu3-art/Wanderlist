/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          light: '#f8fafc',
          accent: '#0ea5e9',
          muted: '#64748b',
          bg: '#1e293b', // Slate 800 for map background
        }
      },
    },
  },
  plugins: [],
}
