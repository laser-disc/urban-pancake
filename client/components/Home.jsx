import React from 'react';
import TruckList from '../containers/TruckList.jsx';
import GoogleMap from '../containers/GoogleMap.jsx';
import {Link} from "react-router";
import {Router, Route, hashHistory} from 'react-router';

let googleMap;
if (process.env.TEST_ENV === 'test') {
  googleMap = <div />;
} else {
  googleMap = <GoogleMap />;
}

export default () => {
return (
  <div className="container theme-light">
    <div className="jumbotron">
      <h1>Food Trucks Near You</h1>
      <p>...assuming you live in San Francisco </p>
    </div>
    <Link to="/truckview"><button>TRUCK VIEW</button></Link>
    <div style={{ height: '500px', width: '550px' }}>
      {googleMap}
    </div>
    <TruckList />
  </div>
)
} 