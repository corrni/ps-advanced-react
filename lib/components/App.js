// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ArticleList from './ArticleList';
import StateApi from 'state-api';

class App extends Component {
  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  state = this.props.store.getState();

  props: Props;

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        store={this.props.store}
      />
    );
  }
}

export type Store = StateApi;

type Props = {
  store: Store,
};

export default App;
