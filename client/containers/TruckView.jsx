import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header.jsx';
import TruckProfile from '../containers/TruckProfile.jsx';
import TruckImageContainer from '../components/TruckImageContainer.jsx';
import { FetchYelp } from '../actions/FetchYelp';
import { FetchFiveTweets } from '../actions/FetchFiveTweets';
import Footer from '../components/Footer.jsx';
// { this.props.yelpInfo.yelpInfo ? <TruckProfile key={this.props.yelpInfo.yelpBizID} yelpInfo={this.props.yelpInfo.yelpInfo} fiveTweets={this.props.yelpInfo.fiveTweetObjs} /> : <div><h1>Whoops! Something went wrong...</h1></div> }
    
class TruckView extends Component {

  componentWillMount(){
    this.props.FetchFiveTweets(this.props.params.truckName);
    this.props.FetchYelp(this.props.params.truckName)
  }

  renderTruckView(truck, fiveTweets){
    return <TruckProfile key={ truck.yelpBizID } yelpInfo ={ truck } fiveTweets = { fiveTweets } />
  }

  render(){
    // console.log('[truck profile] props: ', this.props) 
    return (
      <div className="body-truck-view">
        <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
        <Header />
        {this.renderTruckView(this.props.yelpInfo, this.props.yelpInfo.fiveTweetObjs)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TruckView);
