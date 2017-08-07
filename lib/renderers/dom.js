// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';
const el = document.getElementById('root');

const initialData = {articles: {}, authors: {}};

ReactDOM.render(<App initialData={initialData} />, el);
