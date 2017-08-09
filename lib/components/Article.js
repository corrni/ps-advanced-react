// @flow
import React from 'react';

import type {Article} from 'state-api';
import type {Store} from 'components/App';

const dateDisplay = dateString =>
  new Date(dateString).toDateString();

const Article = ({ article, store }: Props) => {
  const author = store.lookupAuthor(article.authorId);
  return (
    <div className="Article__article">
      <div className="Article__title">
        {article.title}
      </div>
      <div className="Article__date">
        {dateDisplay(article.date)}
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

type Props = {
  article: Article,
  store: Store,
};

export default Article;
