import React, {Component} from 'react';
import TruckList from '../containers/TruckList';
// import TrucksList from '../containers/trucksList';
// import LastTweet from '../containers/lastTweet';

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
