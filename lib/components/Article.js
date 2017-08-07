// @flow
import React from 'react';

import type {$Article} from '../DataApi';
import type {$articleActions} from './App';

import styles from './styles_Article';

const dateDisplay = dateString =>
  new Date(dateString).toDateString();

const Article = ({ article, actions }: Props) => {
  const author = actions.lookupAuthor(article.authorId);
  return (
    <div style={styles.article}>
      <div style={styles.title}>{article.title}</div>
      <div style={styles.date}>
        {dateDisplay(article.date)}
      </div>
      <div style={styles.author}>
        <a href={author.website}>
        {author.firstName} {author.lastName}
        </a>
      </div>
      <div styles={styles.body}>{article.body}</div>
    </div>
  );
}

type Props = {
  article: $Article,
  actions: $articleActions,
}

export default Article;
