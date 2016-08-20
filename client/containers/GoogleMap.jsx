import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { PassCurrTruck } from '../actions/PassCurrTruck';
import { bindActionCreators } from 'redux';

var userLat;
var userLng;
let center = {lat: 37.7678011, lng: -122.4443519};  // default
let zoom = 12;  // default
let icon;
const today = new Date;
const index = today.getDay();

class Map extends Component {
  componentWillMount(){
    this.renderUserLocation();
  };

  handleMarkerClick(marker){
    if(marker._id==="user"){
      console.log("That ain't no marker.  That's YOU breh...");
    } else {
      this.props.PassCurrTruck(marker);
    }
    marker.showInfo = true;
  };

  renderUserLocation(){
    return new Promise((resolve, reject) => {
      var options = {
        enableHighAccuracy: true,
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
      // If the user agrees to share their location
      if (userPosition) {
        // create a new 'user Truck'
        let user = {};
        user._id = 'user';
        user.timeStamp = JSON.stringify(new Date);
        user.location = {lat: userPosition.coords.latitude, lng: userPosition.coords.longitude};
        user.schedule = [{ closed: false },{ closed: false },{ closed: false },{ closed: false },{ closed: false },{ closed: false },{ closed: false }];
        user.yelpInfo = {name: null, yelpBizID: null, starsRating: null, review_count: null, custReview: null, photo: null,categories: null};
        // check to see if there is already a user truck in this.props.trucks
        let userTrucks = this.props.trucks.filter( truck => {
          return truck._id==='user';
        });
        // if there is already a user truck
        if(userTrucks.length){
          // then return and do not add another user truck
          return;
        }
        else{
          // otherwise, push the user truck to this.props.trucks
          this.props.trucks.push(user);
          // and force a re-render by changing the state
          this.setState({userLocationFound: true, userLocation: user.location});
        }
      };
    })
    .catch( err => {
      res.status(400).send(err)
    })
  };

  renderTruckMarkers(truckMarker) {
    // GRAB CURRENT DAY OF WEEK
    const date = new Date;
    let index = date.getDay();
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const tweetDay = truckMarker.timeStamp.slice(0, 3);
    let position = null;
    // GRAB DAY OF TWEET TIMESTAMP FROM DB
    let tweetIndex = dayOfWeek.indexOf(tweetDay);
    // icon = 'http://maps.google.com/mapfiles/ms/micons/red-dot.png';
    
    var icon = {
      url: truckMarker.imageUrl,
      scaledSize: new google.maps.Size(40, 40), // scaled size
    };

    if(truckMarker._id==="user"){
      tweetIndex = 1;
      index = 1;
      icon = 'https://www.google.com/mapfiles/arrow.png';
    }
    if(!truckMarker.schedule.length) {
      position = {lat: null, lng: null};
    } else {
      // IF TWEET IS FROM TODAY, USE LOCATION OBJECT PULLED FROM TWEET,
      // OTHERWISE USE SCHEDULE FOUND IN DATABASE FOR LOCATION,
      // UNLESS THE TRUCK IS CLOSED TODAY. THEN PASS NULL TO MARKER SO IT DOESN'T RENDER
      position = truckMarker._id === "user" ? truckMarker.location : truckMarker.schedule[index].closed ? {lat: null, lng: null} : truckMarker.schedule[index];
      // position = tweetIndex === index ? truck.location : truck.schedule[index].closed ? {lat: null, lng: null} : truck.schedule[index];
    }

    if (position.lat) {
      return (
        <Marker
          key={ truckMarker._id }
          position={{ lat: position.lat, lng: position.lng }}
          onClick={ this.handleMarkerClick.bind(this, truckMarker) }
          icon= { icon }
        >
        </Marker>
      );
    };
  };

  renderEventMarkers(event) {
    let position;
    if(!event.schedule.length) {
      position = {lat: null, lng: null};
    } else {
      position = (event.schedule[index].closed ? { lat: null, lng: null } : event.location);
    }
    if (position.lat !== null) {
      return (
        <Marker
          key={ event._id } position={ position } onClick={ this.handleMarkerClick.bind(this, event) }
          icon= 'https://offthegrid.com/wp-content/themes/offthegrid/images/mapmark-blue-sm.png'
        />
      );
    };
  };

  render() {
    if(this.state){
      zoom = 15;
      center = { lat: this.state.userLocation.lat, lng: this.state.userLocation.lng };
    }
    return (
      <GoogleMapLoader
        containerElement={ <div style={{height: '100%', width: '100%'}} /> }
        googleMapElement={
          <GoogleMap zoom={ zoom } center={{ lat: center.lat, lng: center.lng }}>
            { this.props.events.map(event => this.renderEventMarkers(event)) }
            { this.props.trucks.map(truckMarker => this.renderTruckMarkers(truckMarker)) }
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
