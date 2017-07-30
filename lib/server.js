// @flow
import Express from 'express';
import type {
  $Request as Req,
  $Response as Res
} from 'express';
import morgan from 'morgan';

import {port} from '../config/server';
import serverRender from './serverRender';

const app = Express();

app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.use(Express.static('public'));

// render index.ejs template
app.get('/', (req: Req, res: Res) => {
  const initialContent = serverRender();
  res.render('index', { initialContent });
});

// start server
app.listen(port, function listenHandler() {
  console.info(`Running on ${port}`); // eslint-disable-line no-console
});
