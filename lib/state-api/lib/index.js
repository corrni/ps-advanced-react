// @flow

/* eslint-disable no-console */

import type {Article, Author} from './types';

type $storeState = {
  articles: ArticleObject,
  authors: AuthorObject,
  searchTerm: string,
  timestamp: Date,
  clockStarted: boolean,
};

export default class StateApi {
  constructor(rawData: { articles: Article[], authors: Author[] }) {
    this.data = {
      articles: this._mapIntoObject(rawData.articles),
      authors: this._mapIntoObject(rawData.authors),
      searchTerm: '',
      timestamp: new Date(),
      clockStarted: false,
    };

    this.subscriptions = {};
    this.lastSubscriptionId = 0;
  }

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

  getState = () => this.data;

  // Store pub-sub

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

  // Notify all subscribers when store changes
  mergeWithState = (stateChange: *) => {
    this.data = { ...this.data, ...stateChange };
    this.notifySubscribers();
  }

  setSearchTerm = (searchTerm: string) => {
    this.mergeWithState({ searchTerm });
  };

  // Update clock every second (use in CDM lifecycle method)
  startClock = () => {
    setInterval(() => {
      this.mergeWithState({
        timestamp: new Date(),
        clockStarted: true,
      });
    }, 1000);
  };
}

type $subscriptionHandler = () => void;

type $authorLookup = (string) => Author;

export type AuthorObject  = { [string]: Author };
export type ArticleObject = { [string]: Article };
export type {Article, Author};
