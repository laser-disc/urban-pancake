import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import Validate from '../../utils/truckSchemaValidation';
import AddTruckForm from '../components/AddTruckForm.jsx';
import {PassNewTruck} from '../actions/PassNewTruck';
const geoCoder = require('../../utils/utils').geoCoder;

class AddTruck extends Component {

  constructor(props) {
    super(props);

    // this truck schema is ridiculous.
    // we use React state here to track the state of the UI.
    this.state = {
      /* begin truck obj definition */
      truck: {
        name: '',  // user added
        handle: '', // user added
        website: '',
        description: '',
        message: 'No message yet. Check back tomorrow!',
        timeStamp: '',
        imageUrl: 'http://www.gannett-cdn.com/-mm-/7e47370877b354b5fb83086acfb1d60a36b24af8/c=0-50-400-351&r=x404&c=534x401/local/-/media/2015/10/08/Pensacola/Pensacola/635798979592323969-generic-food-truck.jpg',
        location: { lat: 0, lng: 0, closed: true },
        schedule: [ // user added
          /* sunday:*/ { lat: 0, lng: 0, closed: true },
          /* monday:*/ { lat: 0, lng: 0, closed: true },
          /* tuesday:*/ { lat: 0, lng: 0, closed: true },
          /* wednesday:*/ { lat: 0, lng: 0, closed: true },
          /* thursday:*/ { lat: 0, lng: 0, closed: true },
          /* friday:*/ { lat: 0, lng: 0, closed: true },
          /* saturday:*/ { lat: 0, lng: 0, closed: true },
        ],
        photosFromGoogle: [],
        yelpId: '', // user added
        yelpInfo: {
          name: null,
          yelpBizID: null,
          starsRating: null,
          review_count: null,
          custReview: null,
          photo: null,
          categories: null,  // aka 'cuisine'
        }
      },
      /* end truck obj definition */

      valid: true,
      days: {
        sunday: '',
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
      },

      // error messages
      err: {
        name: '',
        handle: '',
        yelp: '',
        loc: '',
      }
    };

    // bind this value of all methods
    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.geocode = this.geocode.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.createTruck = this.createTruck.bind(this);
    this.setError = this.setError.bind(this);
    this.unsetError = this.unsetError.bind(this);
  }

  // creates a truck in the db via Redux
  createTruck() {
    console.log('creating a truck');
    if (this.state.truck.name && this.state.truck.handle && this.state.truck.yelpId) {
      let truckObj = {};
      truckObj.truck = this.state.truck;
      this.props.PassNewTruck(truckObj);
    } else {
      this.setError('name');
      console.error('You need a name, handle, and yelp ID to add a truck!');
    }
  }

  // set an error next to the appropriate input field
  setError(field) {
    let newState = this.state;
    newState.err[field] = 'Invalid input';
    this.setState(newState);
  }

  // remove the appropriate error
  unsetError(field) {
    let newState = this.state;
    newState.err[field] = '';
    this.setState(newState);
  }

  // geocode all of the locations then attempt to save the new truck
  handleSubmit(event) {
    let days = this.state.days;
    let arrayOfPromises = [];
    for (let day in days) {
      arrayOfPromises.push(() => this.geocode(days[day], day));
    }
    Promise.all(arrayOfPromises).then(this.createTruck)
      .catch(() => {
        console.log('Promise.all rejected');
      });
  }

  // when the user types, validate input and set the local UI state
  handleChange(event) {
    const value = event.target.value;
    const inputName = event.target.name;
    const newState = this.state;
    if (this.state.days[inputName] === undefined) {
      newState.truck[inputName] = value;
    } else {
      newState.days[inputName] = value;
    }

    this.setState(newState, () => {
      this.validateInput(value, inputName);
    });
  }

  // update the state with the location of the truck on a particular day
  setLocation(geoInfo, day) {
    let index;
    switch(day) {
      case 'sunday': index = 0;
      break;
      case 'monday': index = 1;
      break;
      case 'tuesday': index = 2;
      break;
      case 'wednesday': index = 3;
      break;
      case 'thursday': index = 4;
      break;
      case 'friday': index = 5;
      break;
      case 'saturday': index = 6;
      break;
    }
    let newState = this.state;
    newState.truck.schedule[index] = Object.assign(geoInfo, { closed: false } )
    this.setState(newState);
  }

  // truck.truck
  getValue() {
    return this.state.truck;
  }

  geocode(target, inputName) {
    return new Promise((resolve, reject) => {
      let newTruckObj = {
        getLocationResults: {
          address: target,
          poi: null,
        }
      };
      geoCoder(newTruckObj).then(truckObj => {
        this.setLocation(truckObj.geoInfo, inputName);
        resolve(truckObj.geoInfo);
      })
      .catch(error => {
        if (error) {
          console.error(error);
          reject('add a truck geocoder error');
        }
      });
    });
  }

  // validateInput doesn't need to take a target param, it can use the state.
  // feel free to refactor.
  validateInput(target, inputName) {
    if (inputName === 'name') {
      if (!Validate.name(target)) {
        this.setError(inputName);
        return this.state.valid = false;
      } else {
        this.unsetError(inputName);
        return this.state.valid = true;
      }
    } else if (inputName === 'handle') {
      if (!Validate.handle(target)) {
        this.setError(inputName);
        return this.state.valid = false;
      } else {
        this.unsetError(inputName);
        return this.state.valid = true;
      }
    } else if (inputName === 'description') {
      if (!Validate.description(target)) {
        this.setError(inputName);
        return this.state.valid = false;
      } else {
        this.unsetError(inputName);
        return this.state.valid = true;
      }
    } else if (inputName === 'website') {
      if (!Validate.website(target)) {
        this.setError(inputName);
        return this.state.valid = false;
      } else {
        this.unsetError(inputName);
        return this.state.valid = true;
      }
    } else if (inputName === 'yelpId') {
      if (!Validate.yelpId(target)) {
        this.setError('yelp');
        return this.state.valid = false;
      } else {
        this.unsetError(inputName);
        return this.state.valid = true;
      }
    } else { // inputName must be a location.
      if (!Validate.location(target)) {
        this.setError('loc');
        return this.state.valid = false;
      } else {
        this.unsetError(inputName);
        return this.state.valid = true;
    }
    return this.state.valid = true; // if the code doesn't know what's happening it's probably fine.
  }
}

    // TODO: Add help option to describe Yelp ID
  render() {
    return (
      <AddTruckForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} truck={this.state.truck} days={this.state.days} err={this.state.err} />
    )
  }
}

function mapStateToProps(state) {
  return {
    trucks: state.trucks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ PassNewTruck }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTruck);
