import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GoogleApiComponent} from 'google-maps-react';
let secretKeys = null;
if(!process.env['MONGOOSE_URI']) {
  secretKeys = require('../env/config');
}



// import {GoogleMapLoader, GoogleMap, Marker} from 'react-google-maps';
// import Marker from '../components/Marker';
// class Map extends Component {
//   renderMarkers(truck) {
//     return <Marker key={truck._id} position={truck.location} />
//   };
//   render() {
//     return (
//       <GoogleMapLoader
//         containerElement={ <div style={{height: '100%', width: '100%'}} /> }
//         googleMapElement={
//           <GoogleMap defaultZoom={14} defaultCenter={{lat: 37.7874707, lng: -122.4019886}}>
//             { this.props.trucks.map(truck => this.renderMarkers(truck)) }
//           </GoogleMap>
//         }
//       />
//     );
//   }
// };
// function mapStateToProps(state) {
//   return {
//     trucks: state.trucks
//   };
// };
// export default connect(mapStateToProps)(Map);




//NEED SWIRLY LOADING GIF
class Container extends Component {
  render(){
    if(!this.props.loaded){
      return (
        <div> Loading... </div>
      )
    }
    return (
      <div>Map will go here</div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: secretKeys.GMAP_API_KEY;
})(Container)

