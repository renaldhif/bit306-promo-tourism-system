/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{html,ts}",
]
export const theme = {
  extend: {
    screens: {
      xs: '320px',
    },
    colors: {
      // base colors
      primary: '#007DFC',
      darkPrimary: '#0069D9',
      secondary: '#DEE8FF',

      // additional colors
      lightPrimaryBackground: '#3097FF',
      darkGrey: '#6b7280',
      whiteBackground: '#ffffff',
      backgroundHover: '#f3f4f6',
      border: '#DDE2E4',

        // text colors
        textPrimary: '#374151',
    },
  },
  plugins: [],
}

