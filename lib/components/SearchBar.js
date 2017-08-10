// @flow
import React from 'react';
import debounce from 'lodash.debounce';
import {searchIcon} from './common';

type InputEvent = Event & {
  currentTarget: HTMLInputElement,
};

class SearchBar extends React.Component {
  state = {
    searchTerm: '',
  };

  props: Props;
  state: SearchBarState;

  doSearch = debounce(() => {
    const {searchTerm} = this.state;
    const {doSearch} = this.props;
    if (doSearch) {
      doSearch(searchTerm);
    } else {
      console.warn(`No 'doSearch' provided. searchTerm: "${searchTerm}"`); // eslint-disable-line no-console
    }
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

type Props = {
  doSearch?: (string) => mixed,
};

export default SearchBar;
