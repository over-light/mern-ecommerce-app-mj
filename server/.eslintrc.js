module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 0,
    'no-multiple-empty-lines': [1, { max: 1 }],
    quotes: [1, 'single'],
    semi: [2, 'always'],
    'no-underscore-dangle': 0,
    'prefer-const': 0,
    'no-param-reassign': [0, { 
      'props': false
  }]
  },
};
