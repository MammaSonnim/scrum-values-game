// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react/prop-types': 'off',
    'jsx-quotes': ['off', 'prefer-double'],
    'no-debugger': 'warn',
    'no-shadow': 'error',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: 'const', next: '*' },
      { blankLine: 'always', prev: 'let', next: '*' },
      { blankLine: 'always', prev: 'var', next: '*' },

      { blankLine: 'any', prev: 'const', next: 'const' },
      { blankLine: 'any', prev: 'const', next: 'let' },
      { blankLine: 'any', prev: 'const', next: 'var' },

      { blankLine: 'any', prev: 'let', next: 'let' },
      { blankLine: 'any', prev: 'let', next: 'var' },
      { blankLine: 'any', prev: 'let', next: 'const' },

      { blankLine: 'any', prev: 'var', next: 'var' },
      { blankLine: 'any', prev: 'var', next: 'let' },
      { blankLine: 'any', prev: 'var', next: 'const' },

      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'react-hooks/rules-of-hooks': 'error',
  },
};
