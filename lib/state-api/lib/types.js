// @flow

export type Article = {
  id: string,
  title: string,
  date: string,
  authorId: string,
  body: string
};

export type Author = {
  id: string,
  firstName: string,
  lastName: string,
  website: string
};
