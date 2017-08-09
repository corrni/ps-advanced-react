// @flow
import React from 'react';
import {dateDisplay, timeIcon} from './common';
import storeProvider from './storeProvider';

import type {Article as ArticleItem, Author} from 'state-api';
import type {Store} from 'components/App';

type t = { article: ArticleItem, author: Author };
const Article = ({ article, author }: t) => {
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

export default storeProvider(extraProps)(Article);
