import React, {Component} from 'react'
import {Link} from "react-router";

export default class HomeHeader extends Component {
  render() {
    return ( 
      <header className="site-header">
         <nav role="navigation" className="navbar navbar-default">
           <div className="container">
             <Link to='/'><img className='home-logo' src="http://image.flaticon.com/icons/svg/184/184534.svg"/></Link>
             <div id="navbar-collapse" className="collapse navbar-collapse">
               <ul className="nav navbar-nav navbar-left no-basic">
                 <li><Link to="/truckview">Truck View</Link></li>
               </ul>
               <ul className="nav navbar-nav navbar-right">
                 <li><a href="https://github.com/laser-disc/urban-pancake" className="signin-button login">Check out the code</a></li>
               </ul>
             </div>
           </div>
         </nav>
       </header>
    )
  }
}