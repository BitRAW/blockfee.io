const colors = require('tailwindcss/colors')
module.exports = {
  purge: ['./public/**/*.html', './public/**/*.svelte'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      amber: colors.amber,
      gray: colors.gray,
      yellow: colors.yellow,
      green: colors.green,
      cyan: colors.cyan,
      blue: colors.blue,
      indigo: colors.indigo,
      red: colors.red,
      pink: colors.pink,

      darkbg: '#1e293b',
      lightbg: '#1E314B',
      darkeryellow: '#4b2a0e',
    },
  },
  variants: {},
  plugins: [],
}
