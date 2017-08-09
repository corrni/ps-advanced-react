import React from 'react';

export const dateDisplay = dateString => new Date(dateString).toDateString();

export const timeIcon = () => (
  <span className="icon is-small">
    <i className="fa fa-clock-o" />
  </span>
);
