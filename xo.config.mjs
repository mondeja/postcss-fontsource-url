import importPlugin from 'eslint-plugin-import';

const config = [
  {
    prettier: true,
    space: true,
  },
  {
    plugins: {import: importPlugin},
    rules: {
      'unicorn/prefer-module': 'off',
      'unicorn/no-anonymous-default-export': 'off',
      'promise/prefer-await-to-then': 'off',
    },
  },
];

export default config;
