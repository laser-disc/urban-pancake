import React, {Component} from 'react';
import {connect} from 'react-redux';
import TruckProfile from '../components/TruckItem.jsx';

class TruckView extends Component {
  render(){
    return (
      <h1>TRUCK VIEW</h1>
      <TruckProfile />
    )
  }
}

export default TruckView