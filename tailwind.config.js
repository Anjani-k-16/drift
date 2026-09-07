/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#07090e',
          900: '#0f1624',
          850: '#151f32',
          800: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
