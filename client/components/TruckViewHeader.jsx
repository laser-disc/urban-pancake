import React, {Component} from 'react';
import {Link} from "react-router";
import {Router, Route, hashHistory} from 'react-router';

export default class TruckViewHeader extends Component {
  render(){
    return (
    <div>
      <header className="site-header clearfix nav-bar">
          <ul className='nav nav-tabs list-inline'>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Photos</a></li>
          </ul>
      </header>
      <section className='jumbotron has-header'>
          <h2><img className='jumbotron-logo' src="http://image.flaticon.com/icons/svg/184/184534.svg"/></h2>
          <h1>Curry Up Now</h1>
          <p>Offering Indian street food with restaurants food trucks catering services & Mortar & Pestle bar. Serving San Fransisco San Mateo & Palo Alto.</p>
      </section>
     </div>
    )
  }
}