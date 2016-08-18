import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header.jsx';
import TruckProfile from '../containers/TruckProfile.jsx';
import TruckImageContainer from '../components/TruckImageContainer.jsx';
import { FetchYelp } from '../actions/FetchYelp';
import { FetchFiveTweets } from '../actions/FetchFiveTweets';
import { modal } from 'react-redux-modal'; // The modal emitter

    
class TruckView extends Component {
  componentWillMount(){
    this.props.FetchFiveTweets(this.props.truckName);
    this.props.FetchYelp(this.props.truckName)
  }
  renderTruckView(truck, fiveTweets){
    return <TruckProfile key={ truck.yelpBizID } yelpInfo ={ truck } fiveTweets = { fiveTweets } />
  }
  render(){
    return (
      <div className="body-truck-view">
        <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
        {this.renderTruckView(this.props.yelpInfo, this.props.yelpInfo.fiveTweetObjs)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    yelpInfo: state.yelpInfo,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchYelp, FetchFiveTweets }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckView);
