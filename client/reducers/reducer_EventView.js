import { FETCH_ONE_EVENT } from '../actions/FetchOneEvent';

// state represents a truck
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_ONE_EVENT:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}