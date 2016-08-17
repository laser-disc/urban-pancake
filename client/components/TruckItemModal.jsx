import React, {Component} from 'react';
import {modal} from 'react-redux-modal' // The modal emitter
import TruckView from '../containers/TruckView.jsx';

export default class TruckItemModal extends Component {
  constructor(props) {
    super(props);
  }
  removeThisModal() {
    this.props.removeModal();
  }
  render() {
    return (
      <div>
        <TruckView truckName={this.props.truck} />
      </div>
    );
  }
}