import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from 'components/App';
import StateApi from 'state-api';

const store = new StateApi(window.__INITIAL_DATA__);

const render = (Component, store) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App, store);

// HMR API
if (module.hot) {
  module.hot.accept('components/App', () => {
    const NextApp = require('components/App').default;
    render(NextApp, store);
  });
}
