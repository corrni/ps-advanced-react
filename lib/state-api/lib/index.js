// @flow

import type {Article, Author} from './types';
export type {Article, Author};

export default class StateApi {
  constructor(rawData: $rawData) {
    this.data = {
      articles: this._mapIntoObject(rawData.articles),
      authors: this._mapIntoObject(rawData.authors),
      searchTerm: '',
    };
  }

  data: $storeState;
  rawData: $rawData;

  // $FlowFixMe
  _mapIntoObject(arr: Article[] | Author[]): * {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  lookupAuthor: $authorLookup = authorId => this.data.authors[authorId];
  getState: $getState = () => this.data;

  setSearchTerm = (searchTerm: string) => {
    this.data.searchTerm = searchTerm;
  };
}

type $rawData = {
    articles: Article[],
    authors: Author[]
};

type $authorLookup = (string) => Author;
type $getState = () => $storeState;

type $storeState = {
  articles: ArticleObject,
  authors: AuthorObject,
  searchTerm: string,
};

// DB stubs (from mapIntoObject function)
export type AuthorObject  = { [string]: Author };
export type ArticleObject = { [string]: Article };


