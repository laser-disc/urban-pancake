// Combines all of the reducers in order to pass them to the store

import { combineReducers } from 'redux';
import TruckReducer from './reducer_TruckList';
import TruckViewReducer from './reducer_TruckViewReducer';

const rootReducer = combineReducers({
  trucks: TruckReducer,
  truckView: TruckViewReducer,
});

export default rootReducer;
