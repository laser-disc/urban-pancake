import React, { Component } from 'react';
import TwitterBox from '../components/TwitterBox.jsx';
import EventViewTruckList from './EventViewTruckList.jsx';

export default class EventProfile extends Component {
// ? {this.props.yelpInfo.photosFromGoogle.map(function(image){return <img src={image} alt="googlePhoto" />})} : <h1>loading...</h1>
  renderImages(){
    if(this.props.yelpInfo.photosFromGoogle){
      return this.props.yelpInfo.photosFromGoogle.map(photo => <img className="google-image" src={photo} alt="google photo" />)
    }
  }

  render(){
    console.log("eventProfile.jsx render() this.props", this.props);

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
          <EventViewTruckList />
        </div>
        <div className="row">
        </div>
      </div>
    )
  }
}

