const wdio = require('eslint-plugin-wdio');
const prettier = require('eslint-plugin-prettier');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  {
    ignores: ['node_modules/', 'allure-report/', 'allure-results/'],
    files: ['./src/**/*.js', './tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: {
      wdio,
      prettier
    },
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'no-unused-vars': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'require-await': 'error',
      'no-async-promise-executor': 'error',
      'prettier/prettier': 'error'
    }
  }
];
