// TruckItem: the individual tweets that will appear on the page

import React, {Component} from 'react';


// <FIX> ADD NAME AND DESCRIPTION FROM TWITTER
export default class TruckItem extends Component {
  render() {
    return (
      <div>
        <div>Your Truck: {this.props.truck.name}</div>
        <div>Your Truck: {this.props.truck.handle}</div>
        <div>Your Truck: {this.props.truck.description}</div>
        <div>Last Tweet: {this.props.truck.message}</div>
        <div>Time: {this.props.truck.timeStamp}</div>
        <img src={this.props.truck.image} />
      </div>
    );
  };
};
