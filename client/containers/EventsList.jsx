import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { bindActionCreators } from 'redux';
import EventItem from '../components/EventItem.jsx';
import { FetchEvents } from '../actions/FetchEvents';

class EventsList extends Component {
  // Runs FetchEvents immediately so that the state will be up to date before the content starts to load
  componentWillMount() {
    this.props.FetchEvents();
  }
  // Iterates over each event in the database
  renderEvents(event) {
    // removes the @ symbol from the Twitter handle provided in the database
    const handle = event.handle.slice(1, event.handle.length);
    return  <Link to={"/eventview/" + handle} key={event._id} > <EventItem event={event} /></Link>
  };

  render() {
    return (
      // maps the event to props
      <div className="event-list well">
        {this.props.event.map(event => this.renderEvents(event))}
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    events: state.events,
    // yelpInfo: state.yelpInfo
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchEvents }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EventsList);
