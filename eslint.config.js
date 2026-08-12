import ashNazg from 'eslint-config-ash-nazg';

export default [
  ...ashNazg(['sauron', 'node']),
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        expect: 'readonly'
      }
    }
  },
  {
    files: ['**/*.md/*.js'],
    languageOptions: {
      globals: {
        it: 'readonly',
        chai: 'readonly',
        expect: 'readonly',
        Strategy: 'readonly'
      }
    },
    rules: {
      'no-shadow': 'off',
      'n/no-unpublished-import': 'off',

      // Middleware
      'promise/prefer-await-to-callbacks': 'off'
    }
  }
];
