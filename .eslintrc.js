module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'airbnb',
    'plugin:vue/strongly-recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // Strict mode
    strict: 0,
    // Errors
    'no-console': 0,
    // ES6
    'arrow-parens': ['error', 'always'],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': [2, {
      'singleline': 2,
      'multiline': {
        'max': 2,
        'allowFirstLine': false
      }
    }],
    'comma-dangle': 'off',
    'object-curly-newline': ['error', 'never'],
  }
}
