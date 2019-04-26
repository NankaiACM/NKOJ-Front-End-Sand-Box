module.exports = {
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2018,
  },
  rules: {
    'linebreak-style': 0,
    'max-len': [2, { code: 241, tabWidth: 2, ignoreUrls: true }],
    'no-bitwise': 0,
    'no-multi-assign': 0,
    'no-return-assign': 0,
    'no-plusplus': 0,
  },
  // settings: {
  //   'import/resolver': {
  //     webpack: {
  //       config: './node_modules/@vue/cli-service/webpack.config.js',
  //     },
  //   },
  // },
};
