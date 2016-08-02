import {combineReducers} from 'redux';
import TruckReducer from './reducer_TruckList';
// import trucksList from './reducer-trucksList';
// import activeTruck from './reducer-activeTruck';

const rootReducer = combineReducers({
  trucks: TruckReducer
});

export default rootReducer;
