// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {pickBy} from 'lodash'

import StateApi from 'state-api';
import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './Timestamp';

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
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
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
        <Timestamp initialTimestamp={this.props.__ts__} />
        <br />
        <SearchBar doSearch={this.props.store.setSearchTerm} />
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
  __ts__: Date | false,
};

export default App;
