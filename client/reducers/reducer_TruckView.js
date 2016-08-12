import { FETCH_YELP } from '../actions/FetchYelp';
import { FETCH_FIVE_TWEETS } from '../actions/FetchFiveTweets';

// state represents a truck
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_YELP:
      return Object.assign({}, state, action.payload.data);
    case FETCH_FIVE_TWEETS:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}
