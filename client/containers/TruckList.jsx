import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TruckItem from '../components/TruckItem.jsx';
import { FetchTrucks } from '../actions/FetchTrucks';

class TruckList extends Component {
  // Runs FetchTrucks immediately so that the state will be up to date before the content starts to load
  componentWillMount() {
    this.props.FetchTrucks();
  }
  // Iterates over each truck in the database
  renderTrucks(truck) {
    return <TruckItem key={ truck._id } truck={ truck } />
  };
  // Maps truck prop to TruckItem
  render() {
    return (
      <div className="truck-list">
        { this.props.trucks.map(truck => this.renderTrucks(truck)) }
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    trucks: state.trucks
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FetchTrucks }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
