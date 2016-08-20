import React, { Component } from 'react';
import TruckCategories from '../components/TruckCategories.jsx'
import Slider from 'react-slick'
import GoogleMap from '../containers/GoogleMap.jsx';

let googleMap;
if (process.env.TEST_ENV === 'test') {
  googleMap = <div />;
} else {
  googleMap = <GoogleMap />;
}

export default class TruckProfile extends Component {
  renderImages(){
    if(this.props.yelpInfo.photosFromGoogle){
      return this.props.yelpInfo.photosFromGoogle.map(photo => <div><img className="google-image" src={photo} alt="google photo" /></div>)
    }
  }

  render(){
    let fiveTweets = [];
    let yelpInfo = {name: '', review_count: 0};
    let yelpScoreUrl = '';
    let categories = '';
    if(this.props.yelpInfo.yelpInfo){
      yelpInfo = this.props.yelpInfo.yelpInfo;
      let truckProfileImgStyle = {
        backgroundImage : 'url(' + yelpInfo.photo + ')',
      }
      yelpScoreUrl = this.props.yelpInfo.yelpInfo.starsRating;
    }
    if(this.props.fiveTweets){
      fiveTweets = this.props.fiveTweets;
    }
    if(yelpInfo.categories) {
      yelpInfo.categories.forEach(function(cat) {
        return categories += cat + ' ';
      })
    }

    const sliderSettings = {
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



    return (
      <div>
        <div className="row truck-view-info">
            <div className="truck-view-info-item">
              <a href={this.props.yelpInfo.website}><img className='truck-view-profile-img' src={this.props.yelpInfo.imageUrl} alt="Truck Profile Image"/></a>
              <div className="truck-view-main-info">
                <h1 className="truck-view-title">{yelpInfo.name}</h1>
                <p>{this.props.yelpInfo.handle}</p>
                <img src={yelpScoreUrl} alt="yelp score"/>
                <p>Number of reviews: {yelpInfo.review_count} </p>
                <p>Phone Number: {yelpInfo.phone}</p>
                <p>Categories: { categories }</p>
              </div>
            </div>
            <div className='mini-google-map'>
              {googleMap}
            </div>
        </div>
        <div className="row">
          <div className="truck-profile-img-container well">
            <Slider {...sliderSettings} >
              {this.renderImages()}
            </Slider>
          </div>
        </div>
        <div className="truck-profile-yelp-review">{yelpInfo.custReview}</div>
      </div>
    )
  }
}
