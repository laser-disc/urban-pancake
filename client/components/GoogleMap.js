import React from 'react';
import {GoogleMapLoader, GoogleMap} from 'react-google-maps';



export default function map() {
  return (
    <GoogleMapLoader
      containerElement={ <div style={{height: '100%', width: '100%'}} /> }
      googleMapElement={
        <GoogleMap defaultZoom={14} defaultCenter={{lat: 37.7874707, lng: -122.4019886}} />
      }
    />
  );
}
