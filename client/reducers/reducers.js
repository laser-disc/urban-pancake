// Combines all of the reducers in order to pass them to the store

import { combineReducers } from 'redux';
import TruckReducer from './reducer_TruckList';
import TruckViewReducer from './reducer_TruckView';
import TruckItemReducer from './reducer_TruckItem';
import EventsReducer from './reducer_EventsList';
import {reducer as modalReducer} from 'react-redux-modal'

const rootReducer = combineReducers({
  trucks: TruckReducer,
  events: EventsReducer,
  yelpInfo: TruckViewReducer,
  currentTruck: TruckItemReducer,
  modals: modalReducer,
});

export default rootReducer;
