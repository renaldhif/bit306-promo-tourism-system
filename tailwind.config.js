/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#007DFC',
        darkPrimary: '#0069D9',
        secondary: '#DEE8FF',
        whiteBackground: '#ffffff',

        border: '#DDE2E4',
        backgroundHover: 'bg-gray-100',
        iconFill: '#A0AEC0',
      },
    },
  },
  plugins: [],
}

