import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TruckViewHeader from '../components/TruckViewHeader.jsx';
import TruckProfile from '../containers/TruckProfile.jsx';
import TruckImageContainer from '../components/TruckImageContainer.jsx';
import { fetchYelp } from '../actions/FetchYelp';
import { fetchFiveTweets } from '../actions/FetchFiveTweets';

class TruckView extends Component {

  componentWillMount() {
    this.props.fetchFiveTweets(this.props.params.truckName);
    this.props.fetchYelp(this.props.params.truckName)
  }

  renderTruckView(truck, fiveTweets){
    return <TruckProfile key={ truck.yelpBizID } yelpInfo ={ truck } />
  }

  render(){
    return (
      <div>
        <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
        <TruckViewHeader />
        { this.props.yelpInfo.yelpInfo ? <TruckProfile key={this.props.yelpInfo.yelpBizID} yelpInfo={this.props.yelpInfo.yelpInfo} /> : <div><h1>Whoops! Something went wrong...</h1></div> }
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
  return bindActionCreators({ fetchYelp, fetchFiveTweets }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckView);
