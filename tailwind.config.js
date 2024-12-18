/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#9B2C2CCC',
          grey: '#4C4C4C'
        }
      },
      boxShadow: {
        'glow': '0 0 10px rgba(155, 44, 44, 0.8), 0 0 20px rgba(155, 44, 44, 0.6), 0 0 30px rgba(155, 44, 44, 0.4)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

