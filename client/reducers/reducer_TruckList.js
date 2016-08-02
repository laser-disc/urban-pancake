import {FETCH_TRUCKS} from '../actions/FetchTrucks';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TRUCKS:
    // console.log('INSIDE REDUCER', action.payload.data)
      return [...state, ...action.payload.data];
  }

  return state;
}
