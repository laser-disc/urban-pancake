import React, { Component } from 'react';
import TruckList from './TruckList.jsx';
import {Link} from "react-router";
import {Router, Route, hashHistory} from 'react-router';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EventProfile from './EventProfile.jsx';
import TruckImageContainer from '../components/TruckImageContainer.jsx';
import { FetchOneEvent } from '../actions/FetchOneEvent';
import { FetchFiveTweets } from '../actions/FetchFiveTweets';

class EventView extends Component {

  componentWillMount(){
    this.props.FetchOneEvent(this.props.params.eventName)
  }

  renderEventView(event){
    if(event.yelpInfo) {
      console.log('EVENT VIEW RENDER ....', event, this.props);
      return <EventProfile key={ event.yelpInfo.yelpBizID } yelpInfo ={ event.yelpInfo } />
    }
  }

  render(){
    return (
      <div className="body-truck-view">
        <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
        <Header />
        { this.props.currentEvent ? this.renderEventView(this.props.currentEvent) : 'Loading...' }
        <Footer />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    currentEvent: state.currentEvent,
    currentTruck: state.currentTruck,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchOneEvent, FetchFiveTweets }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventView);
