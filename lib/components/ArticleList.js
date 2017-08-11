// @flow
import React from 'react';

import ArticleComponent from './Article';
import type {ArticleObject} from 'state-api';
import type {Article} from 'state-api';

class ArticleList extends React.PureComponent {
  props: Props;

  render() {
    // TODO: ensure you're ONLY getting Article objects
    // $FlowFixMe
    const articleItems: Article[] = Object.values(this.props.articles);

    return (
      <div>
        {articleItems.map(article => (
          <ArticleComponent
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
