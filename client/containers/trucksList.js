import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import trucks from '../reducers/reducer-trucksList';
import {selectTruck} from '../actions/selectTruck';

class TruckList extends Component {
  createTrucksList() {
    return this.props.trucks.map((truck) => {
      return (<h4 key={truck.id} onClick={() => {this.props.selectTruck(truck)}}>{truck.name}</h4>);
    });
  }
  render() {
    return (
      <ul>
        {this.createTrucksList()}
      </ul>
    )
  };
};

//if i have a bug, this variable "stte" could be why
function mapStateToProps(state) {
  return {
    trucks: state.trucks
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectTruck}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TruckList);
