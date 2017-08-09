// @flow
import React from 'react';
import {dateDisplay, timeIcon} from './common';
import storeProvider from './storeProvider';

import type {Article as ArticleItem} from 'state-api';
import type {Store} from 'components/App';

type ArticleProps = {
  article: ArticleItem,
  store: Store,
};

const Article = ({ article, store }: ArticleProps) => {
  const author = store.lookupAuthor(article.authorId);
  return (
    <div className="Article__article">
      <div className="Article__title">
        {article.title}
      </div>
      <div className="Article__date">
        {timeIcon()} {dateDisplay(article.date)}
      </div>
      <div className="Article__author">
        <a href={author.website}>
        {author.firstName} {author.lastName}
        </a>
      </div>
      <div className="Article__body">
        {article.body}
      </div>
    </div>
  );
};

// poor man's "mapStateToProps"
function extraProps(store: Store, originalProps: *) {
  return {
    author: store.lookupAuthor(originalProps.article.authorId),
  };
}

export default storeProvider(Article);
