// @flow
import React from 'react';
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

const dateDisplay = dateString => new Date(dateString).toDateString();

const timeIcon = () => (
  <span className="icon is-small">
    <i className="fa fa-clock-o" />
  </span>
);

export default storeProvider(Article);
