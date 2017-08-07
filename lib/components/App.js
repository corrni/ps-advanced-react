// @flow
import React, { Component } from 'react';
import ArticleList from './ArticleList';

import type {ArticleObject, AuthorObject, $Author} from 'state-api';

class App extends Component {
  state: State = {
    articles: this.props.initialData.articles,
    authors: this.props.initialData.authors,
  };

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

type State = { articles: ArticleObject, authors: AuthorObject };
type Props = {
  initialData: {articles: ArticleObject, authors: AuthorObject},
};

export type $articleActions = {
  lookupAuthor: (authorId: string) => $Author,
}

export default App;
