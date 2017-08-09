// @flow
import React, { Component } from 'react';
import ArticleList from './ArticleList';

import StateApi from 'state-api';
import type {Author} from 'state-api';

class App extends Component {
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
