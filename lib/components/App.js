// @flow
import React, { Component } from 'react';
import axios from 'axios';
import type {AxiosPromise} from 'axios';
import ArticleList from './ArticleList';
import DataApi from 'state-api';

import type {ArticleObject, AuthorObject, $Article, $Author} from 'state-api';
type $apiResp = { articles: $Article[], authors: $Author[] };

class App extends Component {
  state: State = {
    articles: {},
    authors: {},
  };

  async componentDidMount(): any {
    // FIXME: Refine Axios response flow annotations
    const response = await (axios.get('/data'): AxiosPromise<$apiResp>);
    const api = new DataApi(response.data);

    this.setState(() => ({
      articles: api.getArticles(),
      authors: api.getAuthors(),
    }));
  }

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
