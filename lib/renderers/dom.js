import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from 'components/App';
import StateApi from 'state-api';

const store = new StateApi(window.__INITIAL_DATA__);

ReactDOM.render(
  <AppContainer>
    <App store={store} />
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
// SEE: https://github.com/gaearon/react-hot-loader/tree/master/docs#migration-to-30
if (module.hot) {
  module.hot.accept('components/App', () => {
    const NextApp = require('components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
