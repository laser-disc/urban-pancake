import {FETCH_TWEETS} from '../actions/FetchTweets';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TWEETS:
      return [...state, action.payload.data];
  }

  return state;
}
