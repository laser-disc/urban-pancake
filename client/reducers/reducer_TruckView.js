import { FETCH_YELP } from '../actions/FetchYelp';
import { FETCH_FIVE_TWEETS } from '../actions/FetchFiveTweets';

export default function (state = [], action) {

  switch (action.type) {
    case FETCH_YELP:
      console.log(action.payload.data);
      return [action.payload.data];
    case FETCH_FIVE_TWEETS:
      return [action.payload.data];
    default:
      return state;
  }
}
