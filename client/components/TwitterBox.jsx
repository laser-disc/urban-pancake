import React, {Component} from 'react';
import Tweet from './Tweet.jsx'
export default class TwitterBox extends Component {
  render() {
    return (
      <div className = "twitter-box well">
      <div className = "tweet">
        <blockquote className="twitter-tweet"><p lang="en" dir="ltr">We&#39;ll be at 225 Bush (FiDi), <a href="https://twitter.com/otgsf">@otgsf</a> (UN Plaza &amp; Stanford Hospital), <a href="https://twitter.com/TruckStopSF">@TruckStopSF</a>... it&#39;s almost Friday :)</p>&mdash; Curry Up Now (@CurryUpNow) <a href="https://twitter.com/CurryUpNow/status/763789672170590208">August 11, 2016</a></blockquote><script async src="//platform.twitter.com/widgets.js"></script>
      </div>
      </div>
    )
  }
}