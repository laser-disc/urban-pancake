import React, { Component } from 'react';
import TruckList from '../containers/TruckList.jsx';
// import EventsList from '../containers/EventsList.jsx';
import GoogleMap from '../containers/GoogleMap.jsx';
import {Link} from "react-router";
import {Router, Route, hashHistory} from 'react-router';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SearchBar from './SearchBar.jsx';
// import ModalInitializer from '../components/ModalInitializer.jsx'



let googleMap;
if (process.env.TEST_ENV === 'test') {
  googleMap = <div />;
} else {
  googleMap = <GoogleMap />;
}

export default () => {
  return (
    <div className="body-home">
    <Header />
    <SearchBar />
    <div className='mega-container container-fluid'>
      <div className='wrap row'>
        <div className="google-map-container container-well">
          <div className="google-map">
            {googleMap}
          </div>
        </div>
       <TruckList />
      </div>
    </div>
    <Footer />
    <link href=" https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
    </div>
  )
}

