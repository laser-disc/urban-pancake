import { PASS_CURR_TRUCK } from '../actions/PassCurrTruck';

export default function (state = {}, action) {
  switch (action.type) {
    case PASS_CURR_TRUCK:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
