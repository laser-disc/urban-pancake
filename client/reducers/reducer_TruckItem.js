import { PASS_CURR_TRUCK } from '../actions/PassCurrTruck';

export default function (state = {}, action) {
  switch (action.type) {
    case PASS_CURR_TRUCK:
      console.log("reducer_TruckItem invoked");
      return Object.assign({}, state, action.payload);
    default:
      console.log("reducer_TruckItem default");
      return state;
  }
}