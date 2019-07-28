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
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off'
  }
}

// module.exports = {
//   'root': true,

//   'env': {
//     'browser': true,
//     'node': true,
//     'amd': false,
//   },

//   'extends': [
//     'plugin:vue/base',
//     'mangokk'
//   ],

//   'parserOptions': {
//     ecmaVersion: 6,
//     sourceType: 'module',
//     'ecmaFeatures': {
//       'experimentalObjectRestSpread': true,
//     },
//     'parser': 'babel-eslint',
//   },

//   'plugins': ['html', 'json']
// };