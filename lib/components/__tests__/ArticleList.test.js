import React from 'react';
import ArticleList from '../ArticleList';
import {shallow} from 'enzyme';

describe('ArticleList', function () {

  const testProps = {
    articles: {
      a: { id: 'a' },
      b: { id: 'd' },
    },
    store: {
      lookupAuthor: jest.fn(() => ({})),
    },
  };

  it('renders correctly', () => {
    const wrapper = shallow(<ArticleList {...testProps} />);

    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
