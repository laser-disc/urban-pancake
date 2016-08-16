import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';

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
    this.state = {
      truck: {
        name: '',
        handle: ''
      }
    };
    this.getValue = this.getValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    console.log('event: ', event, ' target: ', event.target, ' this: ', this)
  }
  handleChange(event) {
    const newState = this.state;
    newState.truck[event.target.name] = event.target.value;
    this.setState(newState);
    console.log(this.getValue());
  }
  getValue() {
    return this.state.truck;
  }
    // TODO: Add help option to describe Yelp ID
  render() {
    return (
      <div>
        <form
          className="add-truck"
          onChange={this.handleChange}>
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
            name="name"
            />
          <label>Twitter Handle</label>
          @<input
            type="text"
            placeholder="T. Handle"
            />
          <label>Yelp ID</label>
          <input
            type="text"
            placeholder="Yelp ID"
            />
          <label>Locations</label>
          Sunday<input
            type="text"
            />
          Monday<input
            type="text"
            />
          Tuesday<input
            type="text"
            />
          Wednesday<input
            type="text"
            />
          Thursday<input
            type="text"
            />
          Friday<input
            type="text"
            />
          Saturday<input
            type="text"
            />
          <button type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddTruck;
