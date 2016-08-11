import React from 'react';
import TruckList from '../containers/TruckList.jsx';
import GoogleMap from '../containers/GoogleMap.jsx';
import {Link} from "react-router";
import {Router, Route, hashHistory} from 'react-router';
import Header from './Header.jsx'


let googleMap;
if (process.env.TEST_ENV === 'test') {
  googleMap = <div />;
} else {
  googleMap = <GoogleMap />;
}

export default () => {
return (
  <div>
    <Header />
     <section className='jumbotron'>
          <h1>SF City Food Trucks</h1>
          <p>Find a food truck for lunch in San Francisco</p>
      </section>
      
        <div className="col-md-5 col-md-offset-1 google-map"> {googleMap} </div>
        <div className="col-md-6 truck-list">
          <TruckList />
        </div>
    
  </div>
)
}
