import React, { Component } from 'react';
import TwitterBox from '../components/TwitterBox.jsx';
import EventViewTruckList from './EventViewTruckList.jsx';
import { connect } from 'react-redux';

export default class EventProfile extends Component {
  
  renderImages(){
    let thisEvent = this.props.events.filter( event => event.name===this.props.currentTruck.currentTruck);
    let thisEventsPhotos = thisEvent[0].photosFromGoogle;
    if(thisEventsPhotos.length){
      return thisEventsPhotos.map(photo => <img className="google-image" src={photo} alt="google photo" />)
    }
  }

  render(){
  
    if(this.props.yelpInfo.yelpInfo){
      var truckProfileImgStyle = {
        backgroundImage : "url(" + this.props.yelpInfo.yelpInfo.photo+")",
      }
      var truckName = this.props.yelpInfo.yelpInfo.name
    }
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

function mapStateToProps(state) {
  return {
    trucks: state.trucks,
    events: state.events,
    yelpInfo: state.yelpInfo,
    currentTruck: state.currentTruck
  };
};


export default connect(mapStateToProps)(EventProfile);
