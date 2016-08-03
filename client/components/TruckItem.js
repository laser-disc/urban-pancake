// TruckItem: the individual tweets that will appear on the page

import React, {Component} from 'react';

// <FIX> ADD NAME AND DESCRIPTION FROM TWITTER
 export default class TruckItem extends Component {
    
    render() {
      return (
      <div className="TruckItem">
          <div className="tweet col-lg-offset-2 col-sm-8 col-md-8 col-lg-8">
              <img className="TruckAvatar" src={this.props.truck.imageUrl} alt="Truck Image" />
              <div>
                <h4 className="TruckName">{this.props.truck.name}</h4>
                <h6 className="TruckHandle">{this.props.truck.handle}</h6>
              </div>
              <p className="TruckDescription">{this.props.truck.description}</p>
              <h5 className="TruckTweet"> {this.props.truck.message}</h5>
              <div className="TruckTimeStamp">{this.props.truck.timeStamp}</div>
          </div>
      </div>
      );
    };
 };

