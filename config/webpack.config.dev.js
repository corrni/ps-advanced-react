const path = require('path');

const CLIENT_SRC_PATH = path.resolve(__dirname, '../lib/renderers/dom.js');
const PUBLIC_PATH = path.resolve(__dirname, '../public');

const config = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../lib'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },

  entry: [
    'babel-polyfill',
    CLIENT_SRC_PATH
  ],

  output: {
    path: PUBLIC_PATH,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      }
    ]
  }
}

module.exports = config;
