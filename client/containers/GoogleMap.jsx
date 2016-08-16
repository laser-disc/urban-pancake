import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { PassCurrTruck } from '../actions/PassCurrTruck';
import { bindActionCreators } from 'redux';

// import Marker from '../components/Marker.jsx';
// Marker position needs to be broken up to the individual lat, lng props
// use new Date.now().getDay() for day of week index
// GRAB CURRENT DAY OF WEEK
const today = new Date;
const index = today.getDay();

class Map extends Component {

  handleClick(truck){
    console.log("you've selected ", truck.name);
    // this.setState({currentTruck: truck.name});
    this.props.PassCurrTruck(truck);
  }

  renderMarkers(truck) {
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const tweetDay = truck.timeStamp.slice(0, 3);
    let position = null;
    // GRAB DAY OF TWEET TIMESTAMP FROM DB
    const tweetIndex = dayOfWeek.indexOf(tweetDay);
    if(truck.schedule.length === 0) {
      position = {lat: null, lng: null};
    } else {
      // IF TWEET IS FROM TODAY, USE LOCATION OBJECT PULLED FROM TWEET,
      // OTHERWISE USE SCHEDULE FOUND IN DATABASE FOR LOCATION,
      // UNLESS THE TRUCK IS CLOSED TODAY. THEN PASS NULL TO MARKER SO IT DOESN'T RENDER
      position = tweetIndex === index ? truck.location : truck.schedule[index].closed ? {lat: null, lng: null} : truck.schedule[index];
    }

    if (position.lat) {
      return <Marker
        key={ truck._id } position={{ lat: position.lat, lng: position.lng }} onClick={ this.handleClick.bind(this, truck) }
        // icon={{url:'https://media.giphy.com/media/8K1IYSnhUaNH2/giphy_s.gif'}}
      />
    };
  };
    renderEventMarkers(event) {

      //TODO: when we render the trucks list for the event, we need to make sure idx is the same as the date of the last tweet's timestamp

      // if the event is open today, we render it to the map
      // if it's closed, it's lat and lng are set to null so that the marker does not render
      const position = (event.schedule[index].closed ? { lat: null, lng: null } : event.location);

    if (position.lat !== null) {
      return <Marker
        key={ event._id } position={ position }
        icon= 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      />
    };
  };

  render() {
    return (
      <GoogleMapLoader
        containerElement={ <div style={{height: '100%', width: '100%'}} /> }
        googleMapElement={
          <GoogleMap defaultZoom={ 12 } defaultCenter={{ lat: 37.7678011, lng: -122.4443519 }}>
            { this.props.events.map(event => this.renderEventMarkers(event)) }
            { this.props.trucks.map(truck => this.renderMarkers(truck)) }
          </GoogleMap>
        }
      />
    );
  }
};

function mapStateToProps(state) {
  return {
    trucks: state.trucks,
    events: state.events,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ PassCurrTruck }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
