// @flow
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import {AppContainer} from 'react-hot-loader';

import {host, port} from '../../config/server';
import App from 'components/App';
import StateApi from 'state-api';

import type {AxiosPromise} from 'axios';
import type {Author, Article} from 'state-api';
type $apiResp = { articles: Article[], authors: Author[] };

async function serverRender() {
  const resp = await (axios.get(`http://${host}:${port}/data`): AxiosPromise<$apiResp>);
  const store = new StateApi(resp.data);
  const initialTimestamp = new Date();

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <AppContainer>
        <App store={store} __ts__={initialTimestamp} />
      </AppContainer>
    ),
    initialData: resp.data,
    initialTimestamp,
  };
}

export default serverRender;
