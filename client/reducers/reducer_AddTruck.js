import { PASS_NEW_TRUCK } from '../actions/PassNewTruck';

export default function (state = {}, action) {
  switch (action.type) {
    case PASS_NEW_TRUCK:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}
