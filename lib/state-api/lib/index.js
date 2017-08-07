// @flow

export default class StateApi {
  constructor(rawData: $rawData) {
    this.rawData = rawData;
  }

  rawData: $rawData;

  // $FlowFixMe
  mapIntoObject(arr: $Article[] | $Author[]): * {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  getArticles(): ArticleObject {
    return this.mapIntoObject(this.rawData.articles);
  }

  getAuthors(): AuthorObject {
    return this.mapIntoObject(this.rawData.authors);
  }

  getState(): $storeState {
    return {
      articles: this.getArticles(),
      authors: this.getAuthors(),
    };
  }
}

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
