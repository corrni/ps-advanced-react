// @flow
import React from 'react';
import PropTypes from 'prop-types';

import type {Article as ArticleItem} from 'state-api';

type Props = {
  article: ArticleItem,
};

type $Context = { store: Object, };

const dateDisplay = dateString => new Date(dateString).toDateString();

const timeIcon = () => (
  <span className="icon is-small">
    <i className="fa fa-clock-o" />
  </span>
);

const Article = ({ article }: Props, context: $Context) => {
  const author = context.store.lookupAuthor(article.authorId);
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

Article.contextTypes = {
  store: PropTypes.object,
};

export default Article;
