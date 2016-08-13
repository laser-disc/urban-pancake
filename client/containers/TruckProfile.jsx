import React, { Component } from 'react';
import TwitterBox from '../components/TwitterBox.jsx';
import TruckCategories from '../components/TruckCategories.jsx'
export default class TruckProfile extends Component {

  render(){
    console.log("[Truck Profile] this.props", this.props)
    if(this.props.yelpInfo.yelpInfo){
      var truckProfileImgStyle = {
        backgroundImage : "url(" + this.props.yelpInfo.yelpInfo.photo+")",
      }
      var truckName = this.props.yelpInfo.yelpInfo.name
    }

    return (
      <div className="container">
        <div className="row container">
        <h1>{truckName}</h1>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="truck-profile-img-container well">
              <div className="truck-profile-img" style={truckProfileImgStyle}>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <TwitterBox fiveTweets = {this.props.fiveTweets} />
          </div>
        </div>
        <div className="row">
        </div>
      </div>
    )
  }
}