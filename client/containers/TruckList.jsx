import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import TruckItem from '../components/TruckItem.jsx';
import { FetchTrucks } from '../actions/FetchTrucks';
import { FetchEvents } from '../actions/FetchEvents';

let selectedTruck = "";
class TruckList extends Component {
  // Runs FetchTrucks immediately so that the state will be up to date before the content starts to load
  componentWillReceiveProps(nextProps){
    // console.log("[truck list] nextprops: ", nextProps.currentTruck.currentTruck)
    if(nextProps.currentTruck.currentTruck){
      selectedTruck = nextProps.currentTruck.currentTruck;
      this.render();
    }
  };

  componentWillMount() {
    this.props.FetchTrucks();
    this.props.FetchEvents();
  };

  // Iterates over each truck in the database
  renderTrucks(truck) {
    var handle = truck.handle.slice(1, truck.handle.length);
    if(selectedTruck == truck.name){
      return  <div className="selected"><Link to={"/truckview/" + handle} key={truck._id} > <TruckItem truck={truck} /></Link></div>
    } else {
      return  <div className="not-selected"><Link to={"/truckview/" + handle} key={truck._id} > <TruckItem truck={truck} /></Link></div>
    }
  };
  // Maps truck prop to TruckItem
  render() {

    return (
      <div className="truck-list well container-well">

        {this.props.trucks.map(truck => this.renderTrucks(truck))}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    trucks: state.trucks,
    events: state.events,
    yelpInfo: state.yelpInfo,
    currentTruck: state.currentTruck
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchTrucks, FetchEvents }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
