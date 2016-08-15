// Uses data provided by the FETCH_EVENTS action to update the state
import { FETCH_EVENTS } from '../actions/FetchEvents';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_EVENTS:
    console.log('Im inside reducer_EventsList', action.payload.data);
      return [...action.payload.data];
    default:
      return state;
  };
};
