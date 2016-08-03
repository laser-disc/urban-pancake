import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker, Size} from 'react-google-maps';



export default function map() {
  return (
    <GoogleMapLoader
      containerElement={ <div style={{height: '100%', width: '100%'}} /> }
      googleMapElement={
        <GoogleMap defaultZoom={14} defaultCenter={{lat: 37.7874707, lng: -122.4019886}}>
          <Marker position={{lat: 37.7874707, lng: -122.4019886}}
            label= 'HELLO WORLD' icon={{url:'https://pbs.twimg.com/profile_images/664169149002874880/z1fmxo00.jpg'}}/>
        </GoogleMap>
      }
    />
  );
}
