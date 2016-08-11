import React, {Component} from 'react';
import TwitterBox from '../components/TwitterBox.jsx';

export default class TruckProfile extends Component {
  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="truck-profile-img-container well">
              <div className="truck-profile-img">
              </div>
                <ul className="list-inline">
                   <li>Vegetarian</li>
                   <li>Indian</li>
                   <li>Gluten-Free</li>
                 </ul> 
            </div>
          </div>
          <div className="col-md-6">
            <TwitterBox />
          </div>
        </div>
        <div className="row">
        </div>
      </div>
    )
  }
}
      // <div className='truck-profile col-md-7 test'>
      //   <div className="truck-profile-title">
      //   </div>
      //   <img className='truck-profile-img test' src="https://pbs.twimg.com/profile_images/336415645/P1010033.JPG" alt="png"/>
      // </div>