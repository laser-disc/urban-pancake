import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers/reducers';
import TruckViewHeader from '../components/TruckViewHeader.jsx';
import TruckProfile from '../components/TruckProfile.jsx';
import TwitterBox from '../components/TwitterBox.jsx'
import TruckImageContainer from '../components/TruckImageContainer.jsx';
import {FetchYelp} from '../actions/FetchYelp';

class TruckView extends Component {
  componentWillMount() {
    this.props.FetchYelp();
  }
  render(){
    return (
      <div className="truck-view">
        <TruckViewHeader />
        <TruckProfile />
        <TwitterBox />
        <TruckImageContainer />
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    truckView: state.truckView
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({FetchYelp}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckView);
