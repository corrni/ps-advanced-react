import React from 'react';
import ArticleList from '../ArticleList';

import renderer from 'react-test-renderer';

describe('ArticleList', function () {

  const testProps = {
    articles: {
      a: { id: 'a' },
      b: { id: 'd' },
    },
    articleActions: {
      lookupAuthor: jest.fn(() => ({})),
    },
  };

  it('renders correctly', () => {
    const tree = renderer.create(
      <ArticleList {...testProps}/>
    ).toJSON();

    expect(tree).toMatchSnapshot();

    // NOTE: always try to test something **useful**
    expect(tree.children.length).toBe(2);
  });
});