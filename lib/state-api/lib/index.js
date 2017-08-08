// @flow

export default class StateApi {
  constructor(rawData: $rawData) {
    this.data = {
      articles: this.mapIntoObject(rawData.articles),
      authors: this.mapIntoObject(rawData.authors),
    };
  }

  data: $storeState;
  rawData: $rawData;

  // $FlowFixMe
  mapIntoObject(arr: $Article[] | $Author[]): * {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  lookupAuthor: $authorLookup = authorId => this.data.authors[authorId];

  getState: $getState = () => this.data;
}

type $authorLookup = (string) => $Author;
type $getState = () => $storeState;

export type $storeState = {
  articles: ArticleObject,
  authors: AuthorObject,
};

// DB stubs (from mapIntoObject function)
export type AuthorObject  = { [string]: $Author };
export type ArticleObject = { [string]: $Article };

// Raw data types
type $rawData = {
    articles: $Article[],
    authors: $Author[]
};

export type $Article = {
  id: string,
  title: string,
  date: string,     // FSO: used as DateTime?
  authorId: string, // FSO: used as ObjectId?
  body: string
};

export type $Author = {
  id: string,
  firstName: string,
  lastName: string,
  website: string
};
