import { FETCH_YELP } from '../actions/FetchTrucks';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_YELP:
      return [...state, ...action.payload.data];
    default:
      return state;
  }
}
