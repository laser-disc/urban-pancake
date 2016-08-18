import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import TruckItem from '../components/TruckItem.jsx';
import { FetchTrucks } from '../actions/FetchTrucks';
import TruckItemModal from "../components/TruckItemModal.jsx";
import {modal} from 'react-redux-modal'; // The modal emitter
// import { FetchEvents } from '../actions/FetchEvents';

let selectedTruck = "";
class EventViewTruckList extends Component {
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
  };

 addModal(truck) { 
  modal.add(TruckItemModal, {
    size: 'large',
    closeOnOutsideClick: true, 
    hideCloseButton: true,
    truck: truck,
    })
  }

  renderTrucks(truck) {
    var handle = truck.handle.slice(1, truck.handle.length); 
    if(selectedTruck == truck.name){
       return  <div onClick={ this.addModal.bind(this, handle) } className="selected"><TruckItem truck={truck} /></div>
    } else {
      return  <div onClick={ this.addModal.bind(this, handle) } className="not-selected"><TruckItem truck={truck} /></div>
    }
  };

  render() {
    let onlyTodaysTrucks=[], todaysTrucksArray=[], handle;
    let thisEvent = this.props.events.filter( event => event.name===this.props.currentTruck.currentTruck);
    if(thisEvent.length){
      todaysTrucksArray = thisEvent[0].todaysTrucks;
      onlyTodaysTrucks = this.props.trucks.filter( truck => {
        if(truck.handle){
          handle = truck.handle.slice(1, truck.handle.length);
          return todaysTrucksArray.includes(handle);
        } else {
          return false;
        }
      })
    }

    return (
      <div className="truck-list well container-well">
        {onlyTodaysTrucks.map(truck => this.renderTrucks(truck))}
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
  return bindActionCreators({ FetchTrucks }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventViewTruckList);
