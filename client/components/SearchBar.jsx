import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };
  }

  render() {
    return (
      <input
        className="search-bar"
        placeholder="Search for your favorite truck or food here!"
        onChange={event => console.log(event.target.value)}
      />
    );
  };
};

export default SearchBar;
