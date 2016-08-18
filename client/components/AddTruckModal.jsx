import React, {Component} from 'react';
import {modal} from 'react-redux-modal' // The modal emitter
import AddTruck from '../containers/AddTruck.jsx';


export default class AddTruckModal extends Component {
  constructor(props) {
    super(props);
  }
  removeThisModal() {
    this.props.removeModal();
  }
  render() {
    return (
      <div>
        <AddTruck />
      </div>
    );
  }
}
