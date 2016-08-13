import React, {Component} from 'react';
import Tweet from './Tweet.jsx'
// {this.props.fiveTweets.map(tweet => this.renderTweets(tweet))}
export default class TwitterBox extends Component {
  



  render() {
    if(this.props.fiveTweets) {
      var counter = 0;
      return (
        <div className="twitter-box well">
          { this.props.fiveTweets.map( function(tweet){
              return <div key={counter = counter+1} dangerouslySetInnerHTML={{__html : tweet}}></div>
            })
          }
        </div>
        )
    }
    else {
      return (
        <div className = "twitter-box well">
          <p> Loading ... </p>  
        </div>
      )
    }
  }
}