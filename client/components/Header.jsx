import React, {Component} from 'react'
import {Link} from "react-router";
import {modal} from 'react-redux-modal';
import AddTruckModal from '../components/AddTruckModal.jsx'
import SearchBar from '../containers/SearchBar.jsx'
export default class HomeHeader extends Component {
  addModal() {
    modal.add(AddTruckModal, {
      size: 'large',
      closeOnOutsideClick: true,
      hideCloseButton: true,
    })
  }

  render() {
    return (
        <div className="header">
          
          <div className="col-xs-offset-1 col-xs-1"><Link to="/"><img className="nav-btn"src="http://image.flaticon.com/icons/svg/184/184534.svg" alt="Home"/><p className="nav-btn-text ">Home</p></Link>
          </div>

          <div className="col-xs-2">
            <img onClick={ this.addModal.bind(this) } className="nav-btn truck-logo" src="http://imgur.com/rKaONN6.png" alt="Truck"/><p className="nav-btn-text">Add a truck</p>
          </div>

          <div className ="col-xs-4">
            <div className="title">
               <h1>
                HUNGER 
                <img className="hungerstop-logo" src="http://i.imgur.com/Q4N9zNA.png"/> 
                STOP
              </h1>
            </div>

          </div>
          <div className="col-xs-4">
            <SearchBar />
          </div>
        </div>
    )
  }
}
