import React, {Component} from 'react';
import {connect} from 'react-redux';
import TweetItem from '../components/TweetItem';


class TweetList extends Component {
  render() {
    return (
      <div>
        <TweetItem />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {state};
}

export default connect(mapStateToProps)(TweetList);
