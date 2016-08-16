import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';
import { PassCurrTruck } from '../actions/PassCurrTruck';
import { bindActionCreators } from 'redux';
var userLat;
var userLng;
let center = {lat: 37.7678011, lng: -122.4443519};  // default
let zoom = 12;  // default

// import Marker from '../components/Marker.jsx';
// Marker position needs to be broken up to the individual lat, lng props
// use new Date.now().getDay() for day of week index
class Map extends Component {

  componentWillMount(){
    this.renderUserLocation();
  };

  handleClick(truck){
    if(truck._id==="user"){
      console.log("That ain't no truck.  That's YOU breh...");
    } else {
      console.log("you've selected ", truck.name);
      this.props.PassCurrTruck(truck);
    }
  };

  renderUserLocation(){

    return new Promise((resolve, reject) => {
      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      function success(pos) {
        var crd = pos.coords;
        userLat = crd.latitude;
        userLng = crd.longitude;
        resolve(pos);
      };

      function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        reject(err);
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    })
    .then( (userPosition) => {
      if (userPosition) {
        let user = {};
        user._id = 'user';
        user.timeStamp = JSON.stringify(new Date);
        user.location = {lat: userPosition.coords.latitude, lng: userPosition.coords.longitude};
        this.props.trucks.push(user);
        this.setState({userLocationFound: true, userLocation: user.location});
      };
    })
    .catch( err => {
      console.log("GoogleMap renderUserLocation error", err);
    })
  };

  renderMarkers(truck) {
    // this.renderUserLocation(); 
    // GRAB CURRENT DAY OF WEEK
    const date = new Date;
    let index = date.getDay();
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const tweetDay = truck.timeStamp.slice(0, 3);

    // GRAB DAY OF TWEET TIMESTAMP FROM DB
    let tweetIndex = dayOfWeek.indexOf(tweetDay);

    if(truck._id==="user"){
      tweetIndex = 1;
      index = 1;
    }

    // IF TWEET IS FROM TODAY, USE LOCATION OBJECT PULLED FROM TWEET,
    // OTHERWISE USE SCHEDULE FOUND IN DATABASE FOR LOCATION,
    // UNLESS THE TRUCK IS CLOSED TODAY. THEN PASS NULL TO MARKER SO IT DOESN'T RENDER
    const position = tweetIndex === index ? truck.location : truck.schedule[index].closed ? {lat: null, lng: null} : truck.schedule[index];
    if (position.lat) {
      return (
        <Marker
          key={ truck._id } position={{ lat: position.lat, lng: position.lng }} onClick={ this.handleClick.bind(this, truck) }
        />
      );
    };
  };
  render() {
    console.log("GoogleMap rendered this.state", this.state);
    if(this.state){
      zoom = 15;
      center = { lat: this.state.userLocation.lat, lng: this.state.userLocation.lng };
    }
    return (
      <GoogleMapLoader
        containerElement={ <div style={{height: '100%', width: '100%'}} /> }
        googleMapElement={
          <GoogleMap zoom={ zoom } center={{ lat: center.lat, lng: center.lng }}>
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
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ PassCurrTruck }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
