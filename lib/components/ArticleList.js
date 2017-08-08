// @flow
import React from 'react';

import Article from './Article';
import type {ArticleObject, $Article} from 'state-api';
import type {$articleActions} from './App';

const ArticleList = ({ articles, articleActions }: Props): * => {
  return (
    <div>
      {Object.values(articles).map((article: $Article) => (
        <Article
          key={article.id}
          article={article}
          actions={articleActions}
        />
      ))}
    </div>
  );
};

type Props = {
  articles: ArticleObject,
  articleActions: $articleActions,
};

export default ArticleList;
