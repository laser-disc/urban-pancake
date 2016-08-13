import React, {Component} from 'react';
import GoogleMap from 'google-maps-react';
import ReactDOM from 'react-dom';

export default class Map extends Component{
  componentDidMount(){
      return this.loadMap();
  }
  loadMap(){
    if(this.props && this.props.google){
      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
    
      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;

      const center = new maps.LatLng(lat, lng);
      const mapConfig = {
        center: center,
        zoom: zoom
      }
      this.map = new maps.Map(node, mapConfig);
    }
  }
  render(){
    return (
      <div style={{height: '500px', width: '500px', border: '1px solid black'}} ref="map">
      </div>
    );
  }
}