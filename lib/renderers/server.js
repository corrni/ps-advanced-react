// @flow
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import type {AxiosPromise} from 'axios';

import {host, port} from '../../config/server';
import App from 'components/App';
import StateApi from 'state-api';

import type {$Article, $Author} from 'state-api';
type $apiResp = { articles: $Article[], authors: $Author[] };

async function serverRender() {
  const resp = await (axios.get(`http://${host}:${port}/data`): AxiosPromise<$apiResp>);
  const store = new StateApi(resp.data);

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App store={store} />
    ),
    initialData: resp.data
  };
}

export default serverRender;
