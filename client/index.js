import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';




ReactDOM.render( <App />, document.getElementById('app') );