import {combineReducers} from 'redux';
import TweetReducer from './reducer_TweetList';
import trucksList from './reducer-trucksList';
import activeTruck from './reducer-activeTruck';

const rootReducer = combineReducers({
  tweet: TweetReducer,
  trucks: trucksList,
  activeTruck: activeTruck
});

export default rootReducer;
