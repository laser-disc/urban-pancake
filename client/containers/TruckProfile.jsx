import React, { Component } from 'react';
import TwitterBox from '../components/TwitterBox.jsx';
import TruckCategories from '../components/TruckCategories.jsx'
export default class TruckProfile extends Component {
// ? {this.props.yelpInfo.photosFromGoogle.map(function(image){return <img src={image} alt="googlePhoto" />})} : <h1>loading...</h1>
  renderImages(){
    if(this.props.yelpInfo.photosFromGoogle){
      return this.props.yelpInfo.photosFromGoogle.map(photo => <img className="goolge-image" src={photo} alt="google photo" />)
    }
  }

  render(){
    if(this.props.yelpInfo.yelpInfo){
      var truckProfileImgStyle = {
        backgroundImage : "url(" + this.props.yelpInfo.yelpInfo.photo+")",
      }
      var truckName = this.props.yelpInfo.yelpInfo.name
    }
    // console.log('[truck profile] props.yelpInfo.photos: ', this.props.yelpInfo.photosFromGoogle) 
    return (
      <div className="container">
        <div className="row">
          <div className="truck-profile-img-container container-well well">
               {this.renderImages()}
          </div>
          <TwitterBox fiveTweets = {this.props.fiveTweets} />
        </div>
        <div className="row">
        </div>
      </div>
    )
  }
}