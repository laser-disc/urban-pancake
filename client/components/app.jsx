import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers/reducers.js';
import TruckList from '../containers/TruckList.jsx';
import GoogleMap from '../containers/GoogleMap';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

export default () => {
  return (
    <Provider store={createStoreWithMiddleware(rootReducer)}>
      <div className="container theme-light">
        <div className="jumbotron">
          <h1>Food Trucks Near You</h1>
          <p>...assuming you live in San Francisco </p>
        </div>
        <div style={{ height: '500px', width: '550px' }}>
          <GoogleMap />
        </div>
        <TruckList />
      </div>
    </Provider>
  );
}
