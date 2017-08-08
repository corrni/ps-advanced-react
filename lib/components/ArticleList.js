// @flow
import React from 'react';

import Article from './Article';
import type {ArticleObject, $Article} from 'state-api';
import type {Store} from './App';

const ArticleList = ({ articles, store }: Props): * => {
  return (
    <div>
      {Object.values(articles).map((article: $Article) => (
        <Article
          key={article.id}
          article={article}
          store={store}
        />
      ))}
    </div>
  );
};

type Props = {
  articles: ArticleObject,
  store: Store,
};

export default ArticleList;
