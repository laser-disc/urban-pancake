import React, {Component} from 'react';
import TruckList from '../containers/TruckList';

export default class App extends Component {
  render() {
    return (
      <div>
        Food Trucks Near You:
        <TruckList />
      </div>
    );
  }
};
