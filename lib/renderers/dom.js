import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from 'components/App';
import StateApi from 'state-api';

const store = new StateApi(window.__INITIAL_DATA__);

// NOTE:
// * Initial render - We use window.__INITIAL_TIMESTAMP__
// * Subsequent (client-side routing, HMR, ...) - we use `timestamp` from the store
const initialTimestamp = new Date(window.__INITIAL_TIMESTAMP__);

const render = (Component, store, isInitial) => {
  ReactDOM.render(
    <AppContainer>
      <Component
        store={store}
        __ts__={!isInitial ? false : initialTimestamp}
      />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App, store, true);

// HMR API
if (module.hot) {
  module.hot.accept('components/App', () => {
    const NextApp = require('components/App').default;
    render(NextApp, store, false);
  });
}
