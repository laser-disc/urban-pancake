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

 <section className='jumbotron'>
  <h1>SF City Food Trucks</h1>
  <p>Find a food truck for lunch in San Francisco</p>
  </section>
      
export default () => {
return (
  <div className='mega-container'>

    <div className='container wrap'>
      <Header />
      <div className="col-md-5 col-md-offset-1 google-map"> {googleMap} </div>
      <div className="col-md-6 truck-list">
      <TruckList />
      </div>
    </div>

    <div className="footer">
      <h6>Contact</h6>
      <div className="item item-text">Created By MKS Students</div>
    </div>

  </div>
)
}
