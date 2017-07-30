const path = require('path');

const CLIENT_SRC_PATH = path.resolve(__dirname, '../lib/components/index.js');
const PUBLIC_PATH = path.resolve(__dirname, '../public');

const config = {
  entry: CLIENT_SRC_PATH,

  output: {
    path: PUBLIC_PATH,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
      }
    ]
  }
}

module.exports = config;
