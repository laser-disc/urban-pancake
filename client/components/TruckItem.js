// TruckItem: the individual tweets that will appear on the page

import React, {Component} from 'react';


// <FIX> ADD NAME AND DESCRIPTION FROM TWITTER
export default class TruckItem extends Component {
  render() {
    return (
      <div className='TruckItem'>Your Truck:
        <div className='TruckName'>{this.props.truck.name}</div>
        <div className='TruckHandle'>{this.props.truck.handle}</div>
        <div className='TruckDescription'>{this.props.truck.description}</div>
        <div className='TruckTweet'>Last Tweet: {this.props.truck.message}</div>
        <div className='TruckTimeStamp'>Time: {this.props.truck.timeStamp}</div>
        <img className='TruckAvatar' src={this.props.truck.image} />
      </div>
    );
  };
};
