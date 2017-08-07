// @flow
import React, { Component } from 'react';

import ArticleList from './ArticleList';
import DataApi from 'DataApi';
import { data } from 'testData';
import type {ArticleObject, AuthorObject, $Author} from 'DataApi';

const api = new DataApi(data);

class App extends Component {
  constructor() {
    super();
    this.state = {
      articles: api.getArticles(),
      authors: api.getAuthors(),
    };
  }

  state: State;

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

type State = {
  articles: ArticleObject,
  authors: AuthorObject,
};

export type $articleActions = {
  lookupAuthor: (authorId: string) => $Author,
}

export default App;
