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
    const newState = this.state;
    newState.truck[event.target.name] = event.target.value;
    this.setState(newState, () => {
      this.validateInput(value);
    });
    console.log(this.getValue());
  }
  validateInput(target) {
    if (target)
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
          onChange={this.handleChange}
          >
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              value={this.state.truck.name}
              />
          </div>
          <div>
            <label>Twitter Handle</label>
            @<input
            type="text"
            placeholder="T. Handle"
            name="handle"
            value={this.state.truck.handle}
            />
          </div>
          <div>
            <label>Yelp ID</label>
            <input
              type="text"
              placeholder="Yelp ID"
              name="yelpId"
              value={this.state.truck.yelpId}
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
