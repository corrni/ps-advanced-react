// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
const el = document.getElementById('root');

ReactDOM.render(<App initialData={window.__INITIAL_DATA__} />, el);
