import React, {Component} from 'react'
import {Link} from "react-router";

export default class HomeHeader extends Component {
  render() {
    return ( 
      <header className="row">
        <nav className="navbar navbar-default site-header">
          <div className="home-text col-xs-offset-1 col-md-1"><Link to="/"><button className="btn btn-success"> Home </button></Link></div>
          <div className ="col-xs-offset-1 col-md-offset-2 col-md-5">
            <h1 >SF CITY FOOD TRUCKS</h1>
          </div>
          <div className="col-xs-offset-1 col-md-offset-1 col-md-1 github">
            <a href="https://github.com/laser-disc/urban-pancake"><button className="btn btn-success">Check out the code</button></a>
          </div>
         </nav>
       </header>
    )
  }
}