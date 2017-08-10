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

  props: Props;

  state = this.props.store.getState();

  setSearchTerm = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  render() {
    return (
      <div>
        <SearchBar doSearch={this.setSearchTerm} />
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
