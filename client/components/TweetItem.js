import React from 'react';

export default TweetItem(props) => {
  render() {
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
