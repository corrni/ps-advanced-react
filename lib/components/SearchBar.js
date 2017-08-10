/* eslint-disable no-console */
import React from 'react';
import {searchIcon} from './common';

class SearchBar extends React.Component {
  state = {
    searchTerm: '',
  };

  handleSearch = (event) => {
    this.setState({ searchTerm: event.currentTarget.value });
    console.log(this.state.searchTerm);
  }

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

export default SearchBar;
