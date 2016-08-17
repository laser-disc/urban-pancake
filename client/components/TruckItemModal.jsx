import React, {Component} from 'react';
import {modal} from 'react-redux-modal' // The modal emitter
import TruckView from '../containers/TruckView.jsx';

export default class myModalComopnent extends Component {
  constructor(props) {
    super(props);
    console.log('## MODAL DATA AND PROPS:', this.props);
  }

  removeThisModal() {
    this.props.removeModal();
  }

  render() {
    console.log("MODAL PROPS", this.props)
    return (
      <div>
        <TruckView truckName={this.props.truck} />
      </div>
    );
  }
}

export class YourComponent extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return <button onClick={this.addModal.bind(this)}>Add modal</button>;
  }
}
