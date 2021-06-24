module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts', 'svelte'],
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
