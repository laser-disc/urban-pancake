import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
// import Marker from '../components/Marker';

class Map extends Component {
  renderMarkers(truck) {
    return <Marker
      key={truck._id} position={truck.location}
      // icon={{url:'https://media.giphy.com/media/8K1IYSnhUaNH2/giphy_s.gif'}}
    />
  };
  render() {
    console.log(this.props.trucks)
    return (
      <GoogleMapLoader
        containerElement={ <div style={{height: '100%', width: '100%'}} /> }
        googleMapElement={
          <GoogleMap defaultZoom={14} defaultCenter={{lat: 37.7874707, lng: -122.4019886}}>
            {this.props.trucks.map(truck => this.renderMarkers(truck))}
          </GoogleMap>
        }
      />
    );
  }
};

function mapStateToProps(state) {
  return {
    trucks: state.trucks
  };
};

export default connect(mapStateToProps)(Map);
