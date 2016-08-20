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
    if(this.props.yelpInfo.yelpInfo){
      var truckProfileImgStyle = {
        backgroundImage : "url(" + this.props.yelpInfo.yelpInfo.photo+")",
      }
      var truckName = this.props.yelpInfo.yelpInfo.name
    }

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
    var fiveTweets = [];
    if(this.props.fiveTweets){
      fiveTweets = this.props.fiveTweets;
    }
    var yelpInfo = {name: "", review_count: 0};
    if(this.props.yelpInfo.yelpInfo){
      yelpInfo = this.props.yelpInfo.yelpInfo;
    }

    return (
      <div>
        <div className="row truck-view-info">       
            <div className="truck-view-info-item">
              <a href={this.props.yelpInfo.website}><img className='truck-view-profile-img' src={this.props.yelpInfo.imageUrl} alt="Truck Profile Image"/></a>
              <div className="truck-view-main-info container-well">
                <div className="">
                  <h1 className="truck-view-title">{yelpInfo.name}</h1>
                </div>
                <div className="truck-view-secondary-info">
               
                <div className="subinfo-1">
                  <img className="truck-view-yelp-score" src={yelpScoreUrl} alt="yelp score"/>
                  <p>Number of reviews: {yelpInfo.review_count} </p>
                  <p>{yelpInfo.categories[0][0]} </p>
                </div>

                <div className="subinfo-2">
                  <p><span className="icon-budicon-770"></span>  {yelpInfo.phone} </p>
                  <p><span className="icon-budicon-842"></span><a href="#">{this.props.yelpInfo.handle}</a></p>
                  <p><a href={this.props.yelpInfo.website}>WEBSITE</a></p>
                </div>

                </div>
              </div>
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