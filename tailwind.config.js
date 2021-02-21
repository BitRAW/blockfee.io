const colors = require('tailwindcss/colors')
module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
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

      stroke1: '#0cc162',
      stroke2: '#3fc10c',
      stroke3: '#a6c10c',
      stroke4: '#c1af0c',
      stroke5: '#c1450c',
    },
  },
  variants: {},
  plugins: [],
}
