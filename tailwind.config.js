const colors = require('tailwindcss/colors');
module.exports = {
  purge: {
    content: ['./public/**/*.html', './src/**/*.svelte'],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
    safelist: [
      'bg-stroke1',
      'bg-stroke2',
      'bg-stroke3',
      'bg-stroke4',
      'bg-gray1',
      'bg-gray2',
      'bg-stroke5',
      'text-stroke1',
      'text-stroke2',
      'text-stroke3',
      'text-stroke4',
      'text-stroke5',
      'text-gray1',
      'text-gray2',
    ],
  },
  theme: {
    extend: {
      gridTemplateColumns: {
        '25': 'repeat(25, minmax(0, 1fr))',
      },
    },
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
      gray1: '#abb7b7',
      gray2: '#e4e9ed',
    },
  },
  variants: {
    margin: ['responsive, hover'],
    fontWeight: ['responsive, hover'],
  },
  plugins: [],
};
