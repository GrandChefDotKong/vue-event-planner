const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    "./index.html",
    "./src/**/*.{vue, js, ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#b58900',
        primary_bg: '#fdf6e3',
        cyan: '#2aa198',
        magenta: '#d33682',
        green: '#859900',
        violet: '#6c71c4',
        gray: colors.gray
      }
    },
  },
  plugins: [],
}
