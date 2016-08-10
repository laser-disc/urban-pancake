import React, {Component} from 'react';
import Tweet from './Tweet.jsx'
export default class TwitterBox extends Component {
  render() {
    return (
      <div className = "twitter-box col-md-4 row test">
        <div className='twitter-box-header col-md-12 test row'>
          <h5>@ Food Truck</h5>
        </div>
        <div className="tweet-list row col-md-offset-1 col-md-10">
          <Tweet />
        </div>
      </div>
    )
  }
}