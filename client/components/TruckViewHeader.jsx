import React, {Component} from 'react';
import {Link} from "react-router";
import {Router, Route, hashHistory} from 'react-router';

export default class TruckViewHeader extends Component {
  render(){
    return (
      <div className='truck-view-header col-sm-12 test'>
        <div className="navbar">
          <ul className='nav nav-tabs list-inline'>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">Menu</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="#">Photos</a></li>
          </ul>
        </div>
      </div>
    )
  }
}