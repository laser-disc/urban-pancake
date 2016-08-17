import React, { Component } from 'react';
import TwitterBox from '../components/TwitterBox.jsx';
import TruckCategories from '../components/TruckCategories.jsx'
import Slider from 'react-slick'
import GoogleMap from '../containers/GoogleMap.jsx';

// let googleMap;
// if (process.env.TEST_ENV === 'test') {
//   googleMap = <div />;
// } else {
//   googleMap = <GoogleMap />;
// }



export default class TruckProfile extends Component {
// ? {this.props.yelpInfo.photosFromGoogle.map(function(image){return <img src={image} alt="googlePhoto" />})} : <h1>loading...</h1>
  renderImages(){
    if(this.props.yelpInfo.photosFromGoogle){
      return this.props.yelpInfo.photosFromGoogle.map(photo => <div><img className="goolge-image" src={photo} alt="google photo" /></div>)
    }
  }

  render(){
    if(this.props.yelpInfo.yelpInfo){
      var truckProfileImgStyle = {
        backgroundImage : "url(" + this.props.yelpInfo.yelpInfo.photo+")",
      }
      var truckName = this.props.yelpInfo.yelpInfo.name
    }
    // console.log('[truck profile] props.yelpInfo.photos: ', this.props.yelpInfo.photosFromGoogle) 
    var sliderSettings = {
            adaptiveHeight : false,
            arrows: false, 
            autoplay: true,
            autoplaySpeed:  4000,
            dots: false,
            pauseOnHover: true,
            fade: true,
            swipe: false,
            swipeToSlide: false,
            vertical: true,
          }

    var yelpScoreUrl = "";
    if(this.props.yelpInfo.yelpInfo){
      yelpScoreUrl = this.props.yelpInfo.yelpInfo.starsRating;
    }

    return (
      <div className="container">
        <div className="row truck-view-info">
          <div className="col-md-2">
            <img className='truck-view-profile-img' src={this.props.yelpInfo.imageUrl} alt="Truck Profile Image"/>
          </div>
          <div className="col-md-2">
            <h1 className="truck-view-title">{this.props.yelpInfo.name}</h1>
            <p>{this.props.yelpInfo.handle}</p>
            <h1><img src={yelpScoreUrl} alt="yelp score"/></h1>
            <ul className="cuisin-list">
              <li>Category</li>
              <li>Cateogry</li>
              <li>Category</li>
            </ul>
          </div>
          <div className="col-md-offset-4 col-md-2">
            <div className='address-box'>
              
            </div>
           </div>
          <div className="col-md-2">
            <div className='address-box'></div>
          </div>
         </div>
        <div className="row">
          <div className="truck-profile-img-container well">
          <Slider {...sliderSettings} >
            {this.renderImages()}
        </Slider>
          </div>
          <TwitterBox fiveTweets = {this.props.fiveTweets} />
        </div>
      </div>
    )
  }
}