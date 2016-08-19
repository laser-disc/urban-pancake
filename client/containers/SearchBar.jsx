import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import updateSearchTerm from '../actions/UpdateSearchTerm.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { updateSearchTerm, trucks } = this.props;
    return (
      <input
        className="search-bar"
        placeholder="Search for your favorite truck or food here!"
        onChange={event => {
          updateSearchTerm(event.target.value, trucks)}
        }
      />
    );
  };
};

function mapStateToProps(state) {
   return { 
     trucks: state.trucks
   };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateSearchTerm }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
