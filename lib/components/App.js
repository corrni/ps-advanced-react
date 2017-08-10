// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {pickBy} from 'lodash'

import Perf from 'react-addons-perf';
if (typeof window !== 'undefined') {
  window.Perf = Perf;
}

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

    // Measure number of "wasted operations"
    setImmediate(() => {
      Perf.start();
    });
    setTimeout(() => {
      Perf.stop();
      Perf.printWasted();
    }, 5000);
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  render() {
    let {searchTerm, articles} = this.state;

    // search should be case-insensitive
    const searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, ({ title, body}) => {
        return title.match(searchRE)
          || body.match(searchRE);
      });
    }

    return (
      <div>
        <Timestamp initialTimestamp={this.props.__ts__} />
        <br />
        <SearchBar />
        <ArticleList articles={articles} />
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
