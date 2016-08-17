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
import { FetchYelp } from '../actions/FetchYelp';
import { FetchFiveTweets } from '../actions/FetchFiveTweets';

class EventView extends Component {

  componentWillMount(){
    console.log("EventView.jsx componentWillMount invoked");
    // this.props.FetchFiveTweets(this.props.params.truckName);
    // this.props.FetchYelp(this.props.params.truckName)
  }

  renderEventView(truck, fiveTweets){
    return <EventProfile key={ truck.yelpBizID } yelpInfo ={ truck } fiveTweets = { fiveTweets } />
  }

  render(){
    // console.log('[truck profile] props: ', this.props) 
    return (
      <div className="body-truck-view">
        <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
        <Header />
        {this.renderEventView(this.props.yelpInfo, this.props.yelpInfo.fiveTweetObjs)}
        <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(EventView);

// return (
//   <div className="body-home">
//     <Header />
//     <div className='mega-container container-fluid'>
//       <div className='wrap row'>
//         <div className="google-map-container container-well">
//           <div className="google-map">
//             {googleMap}
//           </div>
//         </div>
//           <TruckList />
//       </div>
//     </div>
//     <Footer />
//     <link href=" https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
//     <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
//   </div>
// )}