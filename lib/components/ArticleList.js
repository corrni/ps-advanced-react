// @flow
import React from 'react';

import type {
  ArticleObject,
  AuthorObject,
  $Article,
  $Author
} from '../DataApi';
import Article from './Article';

const ArticleList = (props: Props) => {
  const {articles, authors} = props;
  function getCurrentAuthor(authorId: string): $Author {
    // $FlowFixMe
    return authors[authorId];
  }

  return (
    <div>
      {Object.values(articles).map((article: $Article) => (
        <Article
          key={article.id}
          article={article}
          author={getCurrentAuthor(article.authorId)}
        />
      ))}
    </div>
  );
};

type Props = {
  articles: ArticleObject[],
  authors: AuthorObject[],
}

export default ArticleList;
