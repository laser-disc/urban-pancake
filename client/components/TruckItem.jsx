// TruckItem: the individual tweets that will appear on the page

import React, {Component} from 'react';
import { connect } from 'react-redux';
var cssProps = "truck-item test  hvr-grow well";


export default class TruckItem extends Component {
  componentWillUpdate(){
    cssProps = this.props.truck.name === this.props.currentTruck.currentTruck ? 'truck-item-current-truck test hvr-grow well"' : "truck-item test hvr-grow well";
  };

  render() {
    var truckItemThumbNailStyle = {
      backgroundImage : "url(" + this.props.truck.imageUrl +")",
    };

    return (
      <div className={cssProps}>
        <div className="row">
          <div className="truck-item-avatar col-xs-4 col-lg-3 col-xl-2" style={truckItemThumbNailStyle}>
          </div>
          <div className ="col-xs-8 col-lg-9 col-xl-10">
            <div className="row truck-item-data">
              <div className="col-xs-12 col-sm-8">
                <h4 className="truck-item-title">{this.props.truck.name}</h4> 
              </div>
              <div className="col-xs-12 col-sm-4">
                <img className = "truck-item-yelp-score" src={this.props.truck.yelpInfo.starsRating} alt=""/>
              </div>
            </div>
            <div className="row hidden-xs">
              <p className="truck-item-description">{this.props.truck.description} </p>
            </div>
            <div className="row hidden-xs truck-item-yelp-review" >
              <p className="">{this.props.truck.yelpInfo.custReview} </p>
            </div>
          </div> 
        </div>
      </div>
    );
  };
};

function mapStateToProps(state) {
  return {
    currentTruck: state.currentTruck
  };
};

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ FetchTrucks }, dispatch);
// };

export default connect(mapStateToProps)(TruckItem);

