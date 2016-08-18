import React, {Component} from 'react'
import {Link} from "react-router";

export default class HomeHeader extends Component {
  render() {
    return ( 
        <div className="header">
          <div className="col-xs-offset-1 col-xs-1"><Link to="/"><img className="link-logo burrito"src="http://image.flaticon.com/icons/svg/184/184534.svg" alt="Home"/><p className="home-text ">Home</p></Link></div>
          <div className="col-xs-2"><Link to="/"><img className="link-logo truck-logo" src="http://imgur.com/rKaONN6.png" alt="Truck"/><p className="home-text">Add a truck</p></Link></div>
          <div className ="col-xs-7">
            <div className="title">
              <h1 className='title' >HUNGER STOP</h1>
            </div>
          </div>
        </div>
    )
  }
}