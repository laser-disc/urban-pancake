import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class LastTweet extends Component {
  createListItems() {
    if (!this.props.truck) {
      return <div>Select a truck...</div>
    }
    return (
      <div>
        <div>Your Truck: {this.props.truck.handle}</div>
        <div>Last Tweet: {this.props.truck.lastTweet.message}</div>
        <div>{this.props.truck.lastTweet.timestamp}</div>
      </div>
    );
  }

  render() {
    return (
      <ol>
        {this.createListItems()}
      </ol>
    )
  };
};

function mapStateToProps(state) {
  return {
    truck: state.activeTruck
  };
};

export default connect(mapStateToProps)(LastTweet);
