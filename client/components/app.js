import React, {Component} from 'react';
import TweetList from '../containers/TweetList';
import TrucksList from '../containers/trucksList';
import LastTweet from '../containers/lastTweet';

export default class App extends Component {
  render() {
    return (
      <div>
        <TweetList />
        <h2>Food Trucks Near You: </h2>
        <TrucksList></TrucksList>
        <hr/>
        <LastTweet></LastTweet>
      </div>
    );
  }
};
