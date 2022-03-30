module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    semi: 'off',
    'no-console': 'off',
    'global-require': 'off',
    'max-len': 'off',
    'consistent-return': 'off',
    'object-curly-newline': 'off',
  },
}
