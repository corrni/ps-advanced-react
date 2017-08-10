// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {pickBy} from 'lodash'

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
    let {searchTerm, articles} = this.state;
    if (searchTerm) {
      articles = pickBy(articles, ({ title, body}) => {
        return title.match(searchTerm)
          || body.match(searchTerm);
      });
    }

    return (
      <div>
        <SearchBar doSearch={this.setSearchTerm} />
        <ArticleList
          articles={articles}
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
