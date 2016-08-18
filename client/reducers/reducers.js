// Combines all of the reducers in order to pass them to the store

import { combineReducers } from 'redux';
import TruckReducer from './reducer_TruckList';
import TruckViewReducer from './reducer_TruckView';
import TruckItemReducer from './reducer_TruckItem';
import EventItemReducer from './reducer_EventView';
import EventsReducer from './reducer_EventsList';
import AddTruckReducer from './reducer_AddTruck';
import {reducer as modalReducer} from 'react-redux-modal';

const rootReducer = combineReducers({
  trucks: TruckReducer,
  events: EventsReducer,
  yelpInfo: TruckViewReducer,
  currentTruck: TruckItemReducer,
  currentEvent: EventItemReducer,
  newTruck: AddTruckReducer,
  modals: modalReducer,
});

export default rootReducer;
