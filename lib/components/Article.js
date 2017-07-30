// @flow
import React from 'react';

import type {$Article, $Author} from '../DataApi';
import styles from './styles_Article';

const Article = (props: Props) => {
  const {author, article} = props;

  return (
    <div style={styles.article}>
      <div style={styles.title}>{article.title}</div>
      <div style={styles.date}>{article.date}</div>
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
  author: $Author,
}

export default Article;
