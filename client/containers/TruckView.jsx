import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers/reducers';
import TruckViewHeader from '../components/TruckViewHeader.jsx';
import TruckProfile from '../containers/TruckProfile.jsx';
import TruckImageContainer from '../components/TruckImageContainer.jsx';
import {FetchYelp} from '../actions/FetchYelp';

class TruckView extends Component {
  
  componentWillMount() {
    this.props.FetchYelp()
    // .then((response) =>{
    //   console.log(response.payload.data);
    // });
  }
  
  renderTruckView(truck){
    return <TruckProfile yelpInfo ={truck} />
  }


  render(){
    return (
      <div>
        <link href="https://cdn.auth0.com/styleguide/4.8.6/index.min.css" rel="stylesheet" />
        <TruckViewHeader />
        {this.props.truckView.map(truck => this.renderTruckView(truck))}
      </div>
    )
  }
}
function mapStateToProps(state) {
  console.log('state:' , state.truckView)
  return {
    truckView: state.truckView
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({FetchYelp}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckView);
