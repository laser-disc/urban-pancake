import React, {Component} from 'react';
import TruckList from '../containers/TruckList';
// import TrucksList from '../containers/trucksList';
// import LastTweet from '../containers/lastTweet';

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
