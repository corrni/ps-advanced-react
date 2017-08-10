// @flow
import React from 'react';

import Article from './Article';
import type {ArticleObject} from 'state-api';
import type {Article as ArticleItem} from 'state-api';

type t = { articles: ArticleObject };
const ArticleList = ({ articles }: t) => {
  // $FlowFixMe
  const articleItems: ArticleItem[] = Object.values(articles); // TODO: ensure you're ONLY getting Article objects

  return (
    <div>
      {articleItems.map(article => (
        <Article
          key={article.id}
          article={article}
        />
      ))}
    </div>
  );
};

export default ArticleList;
