// @flow
import * as React from 'react';

export const dateDisplay = (dateString: string) =>
  new Date(dateString).toDateString();

export const timeIcon = () => (
  <span className="icon is-small">
    <i className="fa fa-clock-o" />
  </span>
);

export const searchIcon = () => (
  <span className="icon is-left">
    <i className="fa fa-search"></i>
  </span>
);
