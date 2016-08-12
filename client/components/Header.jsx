import React, {Component} from 'react'
import {Link} from "react-router";

export default class HomeHeader extends Component {
  render() {
    return ( 
      <header className="">
        <nav role="navigation" className="navbar navbar-default">
          <div className="home-text"><Link to="/">Home</Link></div>
          <div className="github">
            <a href="https://github.com/laser-disc/urban-pancake" className="signin-button login">Check out the code</a>
          </div>
         </nav>
       </header>
    )
  }
}