// @flow
import React from 'react';

import {dateDisplay, timeIcon} from './common';
import storeProvider from './storeProvider';

import type {Article, Author} from 'state-api';

type Props = {
  article: Article,
  author: Author,
};

class ArticleComponent extends React.PureComponent {
  props: Props;

  render() {
    const {article, author} = this.props;
    return (
      <div className="box">
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
  }
}

function extraProps(store, { article }: *) {
  return {
    author: store.lookupAuthor(article.authorId),
  };
}

export default storeProvider(extraProps)(ArticleComponent);
