// Combines all of the reducers in order to pass them to the store

import { combineReducers } from 'redux';
import TruckReducer from './reducer_TruckList';
import TruckViewReducer from './reducer_TruckView';
import TruckItemReducer from './reducer_TruckItem';


const rootReducer = combineReducers({
  trucks: TruckReducer,
  yelpInfo: TruckViewReducer,
  currentTruck: TruckItemReducer
});

export default rootReducer;
