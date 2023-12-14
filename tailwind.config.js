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

      // warning
      warningBackground: '#FEFCE8',
      warningTitle: '#844D0F',
      warningSubtitle: '#A16207',
      warningBorder: '#F7C948',
      warningIcon: '#FACC14',

      // success
      successBackground: '#F0FFF4',
      successTitle: '#22543D',
      successSubtitle: '#2F855A',
      successBorder: '#38A169',
      successIcon: '#51CF66',


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

