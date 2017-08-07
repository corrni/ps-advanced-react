// @flow
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';

import {host, port} from '../../config/server';
import App from 'components/App';
import DataApi from 'state-api';

import type {AxiosPromise} from 'axios';
import type {$Article, $Author} from 'state-api';
type $apiResp = {
  articles: $Article[],
  authors: $Author[],
};

async function serverRender() {
  const response = await (axios.get(`http://${host}:${port}/data`): AxiosPromise<$apiResp>);
  const api = new DataApi(response.data);

  const initialData = {
    articles: api.getArticles(),
    authors: api.getAuthors(),
  };

  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App initialData={initialData} />
    ),
    initialData
  };
}

export default serverRender;
