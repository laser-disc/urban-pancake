import React, {Component} from 'react';
import TruckList from '../containers/TruckList';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>Food Trucks Near You (assuming you live in San Francisco):</h1>
        <TruckList />
      </div>
    );
  }
};
