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
        handle: '',
        description: '',
        yelpId: '',
      }
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
    const newState = this.state;
    newState.truck[event.target.name] = event.target.value;
    this.setState(newState, this.validateInput);
    console.log(this.getValue());
  }
  validateInput() {
    return;
  }
  getValue() {
    return this.state.truck;
  }
    // TODO: Add help option to describe Yelp ID
  render() {
    return (
      <div style={{"color": "white"}}>
        <form
          className="add-truck"
          onChange={this.handleChange}
          >
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              />
          </div>
          <div>
            <label>Twitter Handle</label>
            @<input
            type="text"
            placeholder="T. Handle"
            name="handle"
            />
          </div>
          <div>
            <label>Yelp ID</label>
            <input
              type="text"
              placeholder="Yelp ID"
              name="yelpId"
              />
          </div>
          <div>
            <label>Locations</label>
            <ul>
              <li>
                Sunday<input
                  type="text"
                  name="sunday"
                />
              </li>
              <li>
                Monday<input
                  type="text"
                  name="monday"
                />
              </li>
              <li>
                Tuesday<input
                  type="text"
                  name="tuesday"
                />
              </li>
              <li>
                Wednesday<input
                  type="text"
                  name="wednesday"
                />
              </li>
              <li>
                Thursday<input
                  type="text"
                  name="thursday"
                />
              </li>
              <li>
                Friday<input
                  type="text"
                  name="friday"
                />
              </li>
              <li>
                Saturday<input
                  type="text"
                  name="saturday"
                />
              </li>
            </ul>
          </div>
          <button type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}

export default AddTruck;
