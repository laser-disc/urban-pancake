// Combines all of the reducers in order to pass them to the store
import { combineReducers } from 'redux';
import { reducer as modalReducer } from 'react-redux-modal';
import TruckReducer from './reducer_TruckList';
import TruckViewReducer from './reducer_TruckView';
import TruckItemReducer from './reducer_TruckItem';
import EventsReducer from './reducer_EventsList';
import AddTruckReducer from './reducer_AddTruck';
import UpdateSearchTermReducer from './reducer_UpdateSearchTerm';

const rootReducer = combineReducers({
  trucks: TruckReducer,
  events: EventsReducer,
  yelpInfo: TruckViewReducer,
  currentTruck: TruckItemReducer,
  newTruck: AddTruckReducer,
  modals: modalReducer,
  searchTerm: UpdateSearchTermReducer,
});

export default rootReducer;
