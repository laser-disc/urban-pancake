// Combines all of the reducers in order to pass them to the store

import { combineReducers } from 'redux';
import TruckReducer from './reducer_TruckList';

const rootReducer = combineReducers({
  trucks: TruckReducer,
});

export default rootReducer;
