import Express from 'express';
import morgan from 'morgan';

import {host, port} from '../config/server';
import serverRender from 'renderers/server';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import wpDevConfig from '../config/webpack.config.dev';

// TODO: extract "raw" data access to fetching utility
import {data} from './testData';

const app = Express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(Express.static('public'));

// Webpack (dev) setup
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
const compiler = webpack(wpDevConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: wpDevConfig.output.publicPath,
  stats: { colors: true },
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}));
app.use(webpackHotMiddleware(compiler));


  // render index.ejs template
app.get('/', async (req, res) => {
  const initialContent = await serverRender();
  res.render('index', { ...initialContent });
});

// fake API
app.get('/data', (req, res) => {
  res.send(data);
});

// start server
app.listen(port, host, (_err) => {
  console.info(`Running on http://${host}:${port}`); // eslint-disable-line no-console
});
