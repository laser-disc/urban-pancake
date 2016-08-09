import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers/reducers';
import { Link } from "react-router";
import {Router, Route, hashHistory} from 'react-router';
import TruckList from '../containers/TruckList.jsx';
import GoogleMap from '../containers/GoogleMap.jsx';
import TruckView from '../containers/TruckView.jsx';
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const App = () => {
  return (
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <div className="container theme-light">
        <div className="jumbotron">
          <h1>Food Trucks Near You</h1>
          <p>...assuming you live in San Francisco </p>
        </div>
        <Link to="/truckview"><button>TRUCK VIEW</button></Link>
        <div style={{ height: '500px', width: '550px' }}>
          <GoogleMap />
        </div>
        <TruckList />
      </div>
    </Provider>
  );
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path = "/" component={App} />
    <Router path ="/truckview" component={TruckView} />
  </Router>
  , document.querySelector('#app'));

export default App;
