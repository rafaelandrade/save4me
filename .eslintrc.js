module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
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
  },
}
