// @flow
import React, { Component } from 'react';
import ArticleList from './ArticleList';

import StateApi from 'state-api';
import type {$Author} from 'state-api';

class App extends Component {
  state = this.props.store.getState();

  props: Props;

  articleActions: $articleActions = {
    lookupAuthor: authorId => this.state.authors[authorId],
  };

  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        articleActions={this.articleActions}
      />
    );
  }
}

type Props = {
  store: StateApi,
}

export type $articleActions = {
  lookupAuthor: (authorId: string) => $Author,
}

export default App;
