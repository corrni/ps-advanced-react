// @flow
import React from 'react';

import type {$Article} from 'state-api';
import type {Store} from 'components/App';

const styles = {
  article: {
    paddingBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: '0.85em',
    color: '#888',
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    paddingLeft: 20,
  }
};

const dateDisplay = dateString =>
  new Date(dateString).toDateString();

const Article = ({ article, store }: Props) => {
  const author = store.lookupAuthor(article.authorId);
  return (
    <div style={styles.article}>
      <div style={styles.title}>
        {article.title}
      </div>
      <div style={styles.date}>
        {dateDisplay(article.date)}
      </div>
      <div style={styles.author}>
        <a href={author.website}>
        {author.firstName} {author.lastName}
        </a>
      </div>
      <div style={styles.body}>
        {article.body}
      </div>
    </div>
  );
};

type Props = {
  article: $Article,
  store: Store,
};

export default Article;
