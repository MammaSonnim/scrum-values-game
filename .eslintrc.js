module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-var-requires': 0,
    'react/prop-types': 0,
    'comma-dangle': ['warn', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
      'functions': 'never'
    }],
    'eol-last': ['error', 'always'],
    'indent': ['warn', 2, { 'SwitchCase': 1 }],
    'jsx-quotes': ['off', 'prefer-double'],
    'no-trailing-spaces': ['warn', {
      skipBlankLines: false,
      ignoreComments: false,
    }],    
    'no-shadow': 'error',
    'no-multiple-empty-lines': ['warn', { max: 2, maxEOF: 0 }],
    'object-curly-spacing': ['warn', 'always'],
    'padded-blocks': ['warn', {
      blocks: 'never',
      classes: 'never',
      switches: 'never',
    }],
    'padding-line-between-statements': [
      'warn',
      { 'blankLine': 'always', 'prev': 'const', 'next': '*' },
      { 'blankLine': 'always', 'prev': 'let', 'next': '*' },
      { 'blankLine': 'always', 'prev': 'var', 'next': '*' },

      { 'blankLine': 'any', 'prev': 'const', 'next': 'const' },
      { 'blankLine': 'any', 'prev': 'const', 'next': 'let' },
      { 'blankLine': 'any', 'prev': 'const', 'next': 'var' },

      { 'blankLine': 'any', 'prev': 'let', 'next': 'let' },
      { 'blankLine': 'any', 'prev': 'let', 'next': 'var' },
      { 'blankLine': 'any', 'prev': 'let', 'next': 'const' },

      { 'blankLine': 'any', 'prev': 'var', 'next': 'var' },
      { 'blankLine': 'any', 'prev': 'var', 'next': 'let' },
      { 'blankLine': 'any', 'prev': 'var', 'next': 'const' },

      { 'blankLine': 'always', 'prev': '*', 'next': 'return' }
    ],
  }
};
