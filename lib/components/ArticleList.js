// @flow
import React from 'react';

import Article from './Article';
import type {ArticleObject} from 'state-api';
import type {Article as ArticleItem} from 'state-api';

class ArticleList extends React.PureComponent {
  props: Props;

  render() {
    // TODO: ensure you're ONLY getting Article objects
    // $FlowFixMe
    const articleItems: ArticleItem[] = Object.values(this.props.articles);

    return (
      <div>
        {articleItems.map(article => (
          <Article
            key={article.id}
            article={article}
          />
        ))}
      </div>
    );
  }
}

type Props = {
  articles: ArticleObject,
};

export default ArticleList;
