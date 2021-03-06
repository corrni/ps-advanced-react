const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');


const CLIENT_SRC_PATH = path.resolve(__dirname, '../lib/renderers/dom.js');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const {host, port} = require('../config/server');

const plugins = [
  // HMR
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const config = {
  resolve: {
    modules: [
      path.resolve(__dirname, '../lib'),
      path.resolve(__dirname, '../node_modules'),
    ],
  },

  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?http://${host}:${port}`,
    CLIENT_SRC_PATH
  ],

  output: {
    // path: PUBLIC_PATH,
    filename: 'bundle.js',
    publicPath: '/',
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
      },

      // quasi-verbatim from create-react-app webpack configuration
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
      //     {
      //       loader: require.resolve('postcss-loader'),
      //       options: {
      //         // Required for external CSS imports
      //         ident: 'postcss',
      //         plugins: () => [
      //           require('postcss-flexbugs-fixes'),
      //           autoprefixer({
      //             browsers: [
      //               '>2%',
      //               'last 4 versions',
      //               'Firefox ESR',
      //               'not ie < 9',
      //             ],
      //             flexbox: 'no-2009'
      //           }),
      //         ],
      //       },
      //     }
      //   ],
      // },
    ]
  },

  devtool: 'cheap-module-eval-source-map',

  plugins,
};

module.exports = config;
