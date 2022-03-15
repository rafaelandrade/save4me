module.exports = {
    env: {
      es2021: true,
      node: true
    },
    extends: ['airbnb-base'],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      ecmaFeatures: {
        experimentalObjectRestSpread: true
      }
    },
    rules: {
      semi: 'off',
      'implicit-arrow-linebreak': 'off',
      'comma-dangle': 'off',
      'no-restricted-globals': 'off',
      'no-param-reassign': 'off',
      'operator-linebreak': 'off',
      'no-console': 'off',
      'no-return-assign': 'off',
      'object-curly-newline': 'off',
      'max-len': 'off',
      'no-restricted-syntax': 'off',
      'global-require': 'off',
      'arrow-parens': 'off',
      'arrow-body-style': 'off',
      quotes: 'off',
      'nonblock-statement-body-position': 'off',
      radix: 'off',
      'consistent-return': 'off',
      'func-names': 'off',
      'no-unused-expressions': 'off',
      'no-continue': 'off',
      'no-await-in-loop': 'off',
      'space-before-function-paren': 'off',
      'no-underscore-dangle': 'off',
      'no-prototype-builtins': 'off',
      'function-paren-newline': 'off',
      'array-callback-return': 'off',
      indent: 'off',
      'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }]
    },
    overrides: [
      {
        files: ['*.test.js'],
        rules: {
          'no-undef': 'off',
          'prefer-arrow-callback': 'off',
          'no-unused-expressions': 'off'
        }
      }
    ]
  }
  