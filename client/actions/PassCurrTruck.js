// import axios from 'axios';

export const PASS_CURR_TRUCK = 'PASS_CURR_TRUCK';

export function PassCurrTruck(truck) {
  console.log("PassCurrTruck invoked for ", truck.name)
  const request = { currentTruck: truck.name };
  // console.log("PassCurrTruck request", request);
  return {
    type: PASS_CURR_TRUCK,
    payload: request
  };
}