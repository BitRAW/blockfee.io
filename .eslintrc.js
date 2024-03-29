module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  plugins: [
    '@typescript-eslint',
    'svelte3',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'require-jsdoc': ['off'],
    'camelcase': ['off'],
    'linebreak-style': ['off'],
    'max-len': ['warn', {
      code: 120,
    }],
  },
  settings: {
    'svelte3/typescript': () => require('typescript'),
  },
};
