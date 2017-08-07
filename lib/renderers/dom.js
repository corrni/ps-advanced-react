// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
import StateApi from 'state-api';

const store = new StateApi(window.__INITIAL_DATA__);

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
