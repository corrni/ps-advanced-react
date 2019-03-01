// @flow
import * as React from 'react';
import {debounce} from 'lodash';

import {searchIcon} from './common';
// import type {Store} from './App';
import storeProvider from './storeProvider';

type InputEvent = Event & {
  currentTarget: HTMLInputElement,
};

type SearchBarState = {
  searchTerm: string
};

class SearchBar extends React.PureComponent<*, SearchBarState> {
  state = {
    searchTerm: '',
  };

  state: SearchBarState;

  doSearch = debounce(() => {
    this.props.store.setSearchTerm(this.state.searchTerm);
  }, 300);

  // SEE: https://github.com/facebook/flow/issues/2099#issuecomment-252411179
  handleSearch = ({ currentTarget }: InputEvent) => {
    if (!(currentTarget instanceof window.HTMLInputElement)) return;
    this.setState({ searchTerm: currentTarget.value }, () => {
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

export default storeProvider()(SearchBar);
