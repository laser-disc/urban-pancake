import {FETCH_TWEET} from '../actions/FetchTweet';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TWEET:
      return [...state, action.payload.data];
  }

  return state;
}
