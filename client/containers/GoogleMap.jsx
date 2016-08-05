import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GoogleApiComponent} from 'google-maps-react';
let secretKeys = null;
if(!process.env['MONGOOSE_URI']) {
  secretKeys = require('../../env/config');
}

class Container extends Component {
  render(){
    if(!this.props.loaded){
      return (
        <div> Loading... </div>
      )
    }
    return (
      <div>Map will go here</div>
    )
  }
}

export default GoogleApiComponent({
  apiKey: secretKeys.GMAP_API_KEY
})(Container)

