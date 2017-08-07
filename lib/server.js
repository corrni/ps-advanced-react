// @flow
import Express from 'express';
import type {$Request as Req, $Response as Res} from 'express';
import morgan from 'morgan';

import {port} from '../config/server';
import serverRender from 'renderers/server';
import {data} from './testData';

const app = Express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(Express.static('public'));

// render index.ejs template
app.get('/', async (req: Req, res: Res) => {
  const initialContent = await serverRender();
  res.render('index', { initialContent });
});

// fake API
app.get('/data', (req: Req, res: Res) => {
  res.send(data);
});

// start server
app.listen(port, function listenHandler() {
  console.info(`Running on ${port}`); // eslint-disable-line no-console
});
