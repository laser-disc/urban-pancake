// EventItem: the individual tweets that will appear on the page
import React, {Component} from 'react';

export default class EventItem extends Component {
  render() {
    var eventItemThumbNailStyle = {
        backgroundImage : "url(" + this.props.event.imageUrl +")",
      }
      
    return (
      <div className="event-item test  hvr-grow well">
        <div className="row">
          <div className="event-item-avatar col-xs-4 col-lg-3 col-xl-2" style={eventItemThumbNailStyle}>
          </div>
          <div className ="col-xs-8 col-lg-9 col-xl-10">
            <div className="row event-item-data">
              <div className="col-xs-12 col-sm-8">
                <h4 className="event-item-title">{this.props.event.name}</h4> 
              </div>
              <div className="col-xs-12 col-sm-4">
                <img className = "event-item-yelp-score" src={this.props.event.yelpInfo.starsRating} alt=""/>
              </div>
            </div>
            <div className="row hidden-xs">
              <p className="event-item-description">{this.props.event.description} </p>
            </div>
            <div className="row hidden-xs event-item-yelp-review" >
              <p className="">{this.props.event.yelpInfo.custReview} </p>
            </div>
          </div> 
        </div>
      </div>
    );
  };
};
