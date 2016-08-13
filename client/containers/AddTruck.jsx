import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';

class AddTruck extends Component {
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

  handleSubmit(event) {
    console.log('event: ', event, ' target: ', event.target, ' this: ', this)
  }

    // TODO: Add help option to describe Yelp ID
  render() {
    return (
      <div>
        <form
          className="add-truck"
          onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            placeholder="name"
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
