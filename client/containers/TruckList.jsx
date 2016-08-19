import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import TruckItem from '../components/TruckItem.jsx';
import EventItem from '../components/EventItem.jsx';
import { FetchTrucks } from '../actions/FetchTrucks';
import { FetchEvents } from '../actions/FetchEvents';
import {modal} from 'react-redux-modal'; // The modal emitter
import TruckItemModal from "../components/TruckItemModal.jsx";
import { PassCurrTruck } from '../actions/PassCurrTruck';
import { findToday } from '../../utils/findToday';

let selectedTruck = "";
class TruckList extends Component {
  constructor(props) {
    super(props);
    this.renderFilteredTrucks = this.renderFilteredTrucks.bind(this);
  };

  componentWillReceiveProps(nextProps){
    // console.log("[truck list] nextprops: ", nextProps.currentTruck.currentTruck)
    if (nextProps.currentTruck.currentTruck){
      selectedTruck = nextProps.currentTruck.currentTruck;
      this.render();
    };
  };

// Runs FetchTrucks and FetchEvents to populate the page upon load
  componentWillMount() {
    this.props.FetchTrucks();
    this.props.FetchEvents();
  };

  addModal(truck) {
    modal.add(TruckItemModal, {
      size: 'large',
      closeOnOutsideClick: true,
      hideCloseButton: true,
      truck: truck,
      })
    }

// This function renders the individual truck modal to the list of trucks
  renderTrucks(truck) {
    if(truck._id==="user") return;
    var handle = truck.handle.slice(1, truck.handle.length);

    if(selectedTruck == truck.name) {
      return  <div key={truck._id} onClick={ this.addModal.bind(this, handle) } className="selected"><TruckItem truck={truck} /></div>
    } else {
      return  <div key={truck._id} onClick={ this.addModal.bind(this, handle) } className="not-selected"><TruckItem truck={truck} /></div>
    }
  };

// This function filters the trucks based on user input from the search bar
  renderFilteredTrucks() {
    const everyTruck = this.props.trucks;
    const today = (new Date()).toString().slice(0, 10);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayNum = daysOfWeek.indexOf(today.slice(0, 3));
    let todaysTrucks = everyTruck.filter((truck) => {
      // checks based on the day of the last tweet and falls back to check the schedule
      if (truck.schedule.length && !truck.schedule[findToday().dayIdx].closed && truck._id!=='user'){
        return truck;
      }
    });

    if(this.props.searchTerm !== '') {
      return todaysTrucks.reduce((accum, truck) => {
        const userQuery = this.props.searchTerm.toLowerCase();
        const searchName = truck.name.toLowerCase().indexOf(userQuery) > -1;
        const searchCategories = truck.yelpInfo.categories.some(function(arr){
          const first = arr[0].toLowerCase();
          const second = arr[1].toLowerCase();
          if (first.indexOf(userQuery) > -1 || second.indexOf(userQuery) > -1) {
            return true;
          } else {
            return false;
          }
        });
        if(searchName || searchCategories) {
          accum.push(this.renderTrucks(truck));
        }
        return accum;
      }, []);
    } else {
      return todaysTrucks.map(truck => this.renderTrucks(truck));
    };
  };

  handleClick(truck){
    if(truck._id==="user"){
      console.log("That ain't no truck.  That's YOU breh...");
    } else {
      // console.log("you've selected ", truck.name);
      this.props.PassCurrTruck(truck);
    }
  }

  // This function renders the individual event modal to the list of trucks
  renderEvents(event) {
    var handle = event.handle.slice(1, event.handle.length);
    if(selectedTruck == event.name){
      return  <div onClick={ this.handleClick.bind(this, event) } className="selected event-item"><Link to={"/eventview/" + handle} key={event._id} > <EventItem event={event} /></Link></div>
    } else {
      return  <div key={event._id} onClick={ this.handleClick.bind(this, event) } className="not-selected event-item"><Link to={"/eventview/" + handle} key={event._id} > <EventItem event={event} /></Link></div>
    }
  }


  renderFilteredEvents() {
    if(this.props.searchTerm !== '') {
      return this.props.events.reduce((accum, event) => {
        if(event.name.toLowerCase().indexOf(this.props.searchTerm.toLowerCase()) > -1) {
          accum.push(this.renderEvents(event));
        }
        return accum;
      }, []);
    } else {
      return this.props.events.map(event => this.renderEvents(event));
    };
  }

  // Maps truck prop to TruckItem
  render() {
    return (
      <div className="truck-list well container-well">
        {this.renderFilteredTrucks()}
        {this.renderFilteredEvents()}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    trucks: state.trucks,
    events: state.events,
    yelpInfo: state.yelpInfo,
    currentTruck: state.currentTruck,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchTrucks, FetchEvents, PassCurrTruck }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
