// @flow
import React from 'react';
import {debounce} from 'lodash';

import {searchIcon} from './common';
import type {Store} from './App';
import storeProvider from './storeProvider';

type InputEvent = Event & {
  currentTarget: HTMLInputElement,
};

class SearchBar extends React.PureComponent {
  state = {
    searchTerm: '',
  };

  state: SearchBarState;

  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 300);

  handleSearch = (event: InputEvent) => {
    this.setState({ searchTerm: event.currentTarget.value }, () => {
      this.doSearch();
    });
  };

  render() {
    return (
      <div className="field">
        <div className="control has-icons-left">
          <input
            className="input is-medium"
            type="search"
            placeholder="Enter search term..."
            value={this.state.searchTerm}
            onChange={this.handleSearch}
          />
          {searchIcon()}
        </div>
       </div>
    );
  }
}

type SearchBarState = { searchTerm: string };

export default storeProvider()(SearchBar);
