// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StateApi from 'state-api';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

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
      <div>
        <SearchBar />
        <ArticleList
          articles={this.state.articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export type Store = StateApi;

type Props = {
  store: Store,
};

export default App;
