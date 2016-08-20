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
    if(thisEvent.length){
      let thisEventsPhotos = thisEvent[0].photosFromGoogle;
      if(thisEventsPhotos.length){
        return thisEventsPhotos.map(photo => <img className="event-view-google-image" src={photo} alt="google photo" />)
      }
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

    if(this.props.yelpInfo){
      var truckProfileImgStyle = {
        backgroundImage : "url(" + this.props.yelpInfo.photo+")",
      }
      var eventName = this.props.yelpInfo.name
      var yelpScore = this.props.yelpInfo.starsRating
      var description = this.props.yelpInfo.description
    }

    return (
      <div>
      <div className="container">
        <div className="row event-view-info">
        <div className='col-xs-3'>
           <h1> {eventName} </h1>
          <img src={yelpScore} alt="yelp score"/>
        </div>
          <div className="event-view-address-box">
          </div>
        </div>
      </div>

      <div className="event-view-secondary-info">
        <div className="row">
          <div className="col-xs-4">
          
          <div>
            <div className ='event-view-photos'>
              <Slider {...sliderSettings} className="slider-images" >
                {this.renderImages()}
              </Slider>
            </div> 
          </div>

          <div className="MOVE">
          <blockquote className="twitter-tweet" data-cards="hidden">
            <a href="https://twitter.com/SPARKsocialSF/status/766651266613202944" />
          </blockquote>
          </div>

        </div>
          
          <div className="event-view-truck-list-container well col-xs-7">
            <EventViewTruckList />
          </div>
        </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    trucks: state.trucks,
    events: state.events,
    currentTruck: state.currentTruck
  };
};


export default connect(mapStateToProps)(EventProfile);
