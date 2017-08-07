import Express from 'express';
import morgan from 'morgan';

import {host, port} from '../config/server';
import serverRender from 'renderers/server';
import {data} from './testData';

const app = Express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(Express.static('public'));

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
