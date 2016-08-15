import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
// import Marker from '../components/Marker.jsx';
// Marker position needs to be broken up to the individual lat, lng props
// use new Date.now().getDay() for day of week index
class Map extends Component {

  renderMarkers(truck) {
    // GRAB CURRENT DAY OF WEEK
    const date = new Date;
    const index = date.getDay();
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const tweetDay = truck.timeStamp.slice(0, 3);

    // GRAB DAY OF TWEET TIMESTAMP FROM DB
    const tweetIndex = dayOfWeek.indexOf(tweetDay);

    // IF TWEET IS FROM TODAY, USE LOCATION OBJECT PULLED FROM TWEET,
    // OTHERWISE USE SCHEDULE FOUND IN DATABASE FOR LOCATION,
    // UNLESS THE TRUCK IS CLOSED TODAY. THEN PASS NULL TO MARKER SO IT DOESN'T RENDER
    const position = tweetIndex === index ? truck.location : truck.schedule[index].closed ? {lat: null, lng: null} : truck.schedule[index];
    if (position.lat) {
      return <Marker
        key={ truck._id } position={{ lat: position.lat, lng: position.lng }}
        // icon={{url:'https://media.giphy.com/media/8K1IYSnhUaNH2/giphy_s.gif'}}
      />
    };
  };
    renderEventMarkers(event) {
      console.log('THIS IS THE EVENT', event);
      //we need the current weekday in order to iterate over the schedules array and determine if the event is open today
      const today = new Date;
      // idx is the index of the array, in which 0 corresponds to Sunday, and so on
      const idx = today.getDay();

      //TODO: when we render the trucks list for the event, we need to make sure idx is the same as the date of the last tweet's timestamp

      // if the event is open today, we render it to the map
      // if it's closed, it's lat and lng are set to null so that the marker does not render
      const position = (event.schedule[idx].closed ? { lat: null, lng: null } : event.location);

    if (position.lat !== null) {
      console.log('I run at', position);
      return <Marker
        key={ event._id } position={ position }
        // icon={{url:'https://media.giphy.com/media/8K1IYSnhUaNH2/giphy_s.gif'}}
      />
    };
  };

  render() {
    console.log("I'm inside the render function in the map", this.props);
    return (
      // TODO: map and render the event markers too
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

export default connect(mapStateToProps)(Map);
