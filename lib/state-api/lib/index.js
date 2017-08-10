// @flow

/* eslint-disable no-console */

import type {Article, Author} from './types';
export type {Article, Author};

export default class StateApi {
  constructor(rawData: $rawData) {
    this.data = {
      articles: this._mapIntoObject(rawData.articles),
      authors: this._mapIntoObject(rawData.authors),
      searchTerm: '',
    };

    this.subscriptions = {};
    this.lastSubscriptionId = 0;
  }

  rawData: $rawData;
  data: $storeState;
  lastSubscriptionId: number;
  subscriptions: { [subscriptionId: number]: $subscriptionHandler }

  // $FlowFixMe
  _mapIntoObject(arr: Article[] | Author[]): * {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  lookupAuthor: $authorLookup = authorId => this.data.authors[authorId];
  getState: $getState = () => this.data;

  /// Store subscriptions
  subscribe = (cb: $subscriptionHandler): number => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = cb;
    return this.lastSubscriptionId;
  };

  unsubscribe = (subscriptionId: number) => {
    delete this.subscriptions[subscriptionId];
  };


  notifySubscribers = () => {
    // $FlowFixMe
    Object.values(this.subscriptions).forEach(cb => cb());
  };

  // Notify all subscribers when store changes, e.g. `searchTerm` updates
  setSearchTerm = (searchTerm: string) => {
    this.data.searchTerm = searchTerm;
    this.notifySubscribers();
  };
}

type $subscriptionHandler = () => void;

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


