// TruckItem: the individual tweets that will appear on the page

import React, {Component} from 'react';
export default class TruckItem extends Component {
  render() {
    var truckItemThumbNailStyle = {
        backgroundImage : "url(" + this.props.truck.imageUrl +")",
      }
    return (
      <div className="truck-item container well">
        <div className="truck-avatar" style={truckItemThumbNailStyle}></div>
         <div className="truck-item-data">
          <h4 className="truck-name">{this.props.truck.name}</h4> 
          <p className="truck-description">{this.props.truck.description} </p>
          <img className = "yelp-score" src={this.props.truck.yelpInfo.starsRating} alt=""/>
          <blockquote className="yelp-review">{this.props.truck.yelpInfo.custReview} </blockquote>
         </div> 
      </div>
    );
  };
};
