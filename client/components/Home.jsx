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
<div className="header">
  <Header />
</div>
  <div className='mega-container container-fluid'>
    <div className='wrap row'>
      <div className="col-md-4 google-map-container">
        <div className="google-map">
          {googleMap}
        </div>
      </div>
      <div className="col-md-offset-1 col-md-7">
        <TruckList />
      </div>
    </div>
  </div>
  <link href=" https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />

  <footer className="footer">
    <div className="container">
      <p className="text-muted">FOOTER</p>
    </div>
  </footer>
</div>
)}
