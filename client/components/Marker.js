import React, {Component} from 'react';
import {Marker, Size} from 'react-google-maps';

export default class Icon extends Component {
  render() {
    return (
      <Marker position={this.props.position}
        icon={{url:'https://media.giphy.com/media/8K1IYSnhUaNH2/giphy_s.gif'}}
      />
    );
  };
}
