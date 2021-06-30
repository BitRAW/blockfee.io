module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/__mocks__/styleMocks.js',
  },
  transform: {
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        'preprocess': true,
      },
    ],
    '^.+\\.ts$': 'ts-jest',
  },
};
