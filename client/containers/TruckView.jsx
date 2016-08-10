import React, {Component} from 'react';
import {connect} from 'react-redux';
import TruckProfile from '../components/TruckItem.jsx';

class TruckView extends Component {
  render(){
    return (
      <div>
        <h1>TRUCK VIEW</h1>
        <TruckProfile />
      </div>
    )
  }
}

export default TruckView
