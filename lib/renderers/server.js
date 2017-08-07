// @flow
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import App from 'components/App';
import DataApi from 'state-api';

import type {AxiosPromise} from 'axios';
import type {$apiResp} from 'components/App';

async function serverRender() {
  const response = await (axios.get('http://localhost:8080/data'): AxiosPromise<$apiResp>);
  const api = new DataApi(response.data);

  const initialData = {
    articles: api.getArticles(),
    authors: api.getAuthors(),
  };

  return ReactDOMServer.renderToString(
    <App initialData={initialData} />
  );
}

export default serverRender;
