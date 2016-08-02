import React, {Component} from 'react';

export default class TruckItem extends Component {
  render() {
    // console.log('INSIDE TRUCKITEM', this.props)
    return (
      <div>
        <div>Your Truck: {this.props.truck.handle}</div>
        <div>Last Tweet: {this.props.truck.message}</div>
        <div>Time: {this.props.truck.timeStamp}</div>
        <img src={this.props.truck.image} />
      </div>
    );
  };
};
