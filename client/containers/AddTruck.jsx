import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import Validate from '../../utils/truckSchemaValidation';
import AddTruckModal from '../components/AddTruckModal.jsx';

class AddTruck extends Component {
  // initial state: empty truck object
    // populate with initial state?
  // form
    // fields:
      // name*  - str
      // twitter handle* - str
      // description - str
      // schedule* - arr
      // yelp ID* - str
    // stores current input temporarily here
      // performs input validation client side
      // use onChange for live updating
    // on submit, sends action

  // handle submit func
    // create Promise, send to server
    // server says OK, create action to update state
    // post success message
  constructor(props) {
    super(props);

    // this truck schema is ridiculous.
    this.state = {
      truck: {
        name: '',  // user added
        handle: '', // user added
        website: '', // user added
        description: '', // user added
        message: 'No message yet. Check back tomorrow!',
        timeStamp: '',
        imageUrl: 'http://www.gannett-cdn.com/-mm-/7e47370877b354b5fb83086acfb1d60a36b24af8/c=0-50-400-351&r=x404&c=534x401/local/-/media/2015/10/08/Pensacola/Pensacola/635798979592323969-generic-food-truck.jpg',
        location: { lat: 0, lng: 0, closed: false },
        schedule: [ // user added
          /* sunday:*/ { lat: 0, lng: 0, closed: false },
          /* monday:*/ { lat: 0, lng: 0, closed: false },
          /* tuesday:*/ { lat: 0, lng: 0, closed: false },
          /* wednesday:*/ { lat: 0, lng: 0, closed: false },
          /* thursday:*/ { lat: 0, lng: 0, closed: false },
          /* friday:*/ { lat: 0, lng: 0, closed: false },
          /* saturday:*/ { lat: 0, lng: 0, closed: false },
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
      valid: false,
      sunday: '',
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
    };
    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateInput = this.validateInput.bind(this);
  }
  handleSubmit(event) {
    console.log('event: ', event, ' target: ', event.target, ' this: ', this)
  }
  handleChange(event) {
    const value = event.target.value;
    const inputName = event.target.name;
    const newState = this.state;
    newState.truck[inputName] = value;

    this.setState(newState, () => {
      this.validateInput(value, inputName);
    });
    console.log(this.getValue());
  }
  // validateInput doesn't need to take a target param, it can use the state.
  // feel free to refactor.
  validateInput(target, inputName) {
    if (inputName === 'name') {
      if (!Validate.name(target)) {
        // show error message
        // return false
      } else {
        // return true
      }
    } else if (inputName === 'handle') {
      if (!Validate.handle(target)) {
        // show error message
        // return false
      } else {
        // return true
      }
    } else if (inputName === 'description') {
      if (!Validate.description(target)) {
        // show error message
        // return false
      } else {
        // return true
      }
    } else if (inputName === 'website') {
      if (!Validate.website(target)) {
        // show error message
        // return false
      } else {
        // return true
      }
    } else if (inputName === 'yelpId') {
      if (!Validate.yelpId(target)) {
        // show error message
        // return false
      } else {
        // return true
      }
    } else { // inputName must be a location.
      if (!Validate.location(target)) {
        // show error message
        // return false
      } else {
        // return true
      }
    }
    return true; // if the code doesn't know what's happening it's probably fine.
  }
  getValue() {
    return this.state.truck;
  }
    // TODO: Add help option to describe Yelp ID
  render() {
    return (
      <AddTruckModal handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    )
  }
}

export default AddTruck;
