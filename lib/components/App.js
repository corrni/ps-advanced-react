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
  subscriptionId: number;

  state = this.props.store.getState();

  onStoreChange = () => {
    this.setState(this.props.store.getState());
  };

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    const {store} = this.props;

    // Filter article list if `searchTerm` is non-blank
    let {searchTerm, articles} = this.state;
    if (searchTerm) {
      articles = pickBy(articles, ({ title, body}) => {
        return title.match(searchTerm)
          || body.match(searchTerm);
      });
    }

    return (
      <div>
        <SearchBar doSearch={store.setSearchTerm} />
        <ArticleList
          articles={articles}
          store={store}
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
