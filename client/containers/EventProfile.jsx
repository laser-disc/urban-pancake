import React, { Component } from 'react';
import EventViewTruckList from './EventViewTruckList.jsx';
import { connect } from 'react-redux';
import Slider from 'react-slick'


export default class EventProfile extends Component {
  
  componentDidUpdate() {
    twttr.widgets.load()
  }

  renderImages(){
    let thisEvent = this.props.events.filter( event => event.name === this.props.currentTruck.currentTruck);
    let thisEventsPhotos = thisEvent[0].photosFromGoogle;
    if(thisEventsPhotos.length){
      return thisEventsPhotos.map(photo => <img className="google-image" src={photo} alt="google photo" />)
    }
  }

  render(){
    var sliderSettings = {
            adaptiveHeight : false,
            arrows: false, 
            autoplay: true,
            autoplaySpeed:  4000,
            dots: false,
            pauseOnHover: true,
            fade: true,
            swipe: false,
            swipeToSlide: false,
            vertical: true,
          }

    if(this.props.yelpInfo.yelpInfo){
      var truckProfileImgStyle = {
        backgroundImage : "url(" + this.props.yelpInfo.yelpInfo.photo+")",
      }
      var truckName = this.props.yelpInfo.yelpInfo.name
      var yelpScore = this.props.yelpInfo.yelpInfo.starsRating
    }
    return (
      <div className='container'>
        <div className="row">
          <div>
           <h1>{truckName}</h1>
           <div><img src={yelpScore} alt=""/></div>
          </div>
        </div>
        <div className="row">
         <div className="truck-event-photos container well">
            <Slider {...sliderSettings} >
              {this.renderImages()}
            </Slider>
          </div>
          <div>
           <blockquote className="twitter-tweet">
            <a href="https://twitter.com/blakecontreras/status/757736890468491264" />
           </blockquote>
          </div>
          <EventViewTruckList />
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
