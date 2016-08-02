import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TruckItem from '../components/TruckItem';
import {FetchTrucks} from '../actions/FetchTrucks';

class TruckList extends Component {
  // this.renderTrucks.bind(this);
  // Running once upon refresh; calling fetchTrucks to access DB
  componentWillMount() {
    this.props.FetchTrucks();
  }

  renderTrucks(truck) {
    // console.log('INSIDE renderTrucks IN TRUCKLIST', this.state.trucks)
    return <TruckItem key={truck._id} truck={truck} />
  };

  // Mapping trucks props to truckItems
  render() {

    return (
      <div>
        {this.props.trucks.map(truck => this.renderTrucks(truck))}
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
  return bindActionCreators({FetchTrucks}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
