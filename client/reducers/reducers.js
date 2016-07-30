import {combineReducers} from 'redux';
import TweetReducer from './reducer_TweetList';

const rootReducer = combineReducers({
  tweet: TweetReducer
});

export default rootReducer;
