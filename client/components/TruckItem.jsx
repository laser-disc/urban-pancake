// TruckItem: the individual tweets that will appear on the page

import React, {Component} from 'react';

export default class TruckItem extends Component {
  render() {
    return (
      <div className="truck-item container well">
        <div className="truck-item">
          <img className="truck-avatar" src={this.props.truck.imageUrl} alt="Truck Image" />
         
         <div className="truck-item-data">
          <h4 className="truck-name">{this.props.truck.name}</h4> 
          <p>[Truck Description Truck Description Truck Description Truck Description Truck Description]</p>
          <img className = "yelp-score" src="http://sfchiro.org/wp-content/uploads/2015/10/yelp-stars.png" alt=""/>
         </div> 
        </div>
      </div>
    );
  };
};
