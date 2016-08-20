// import axios from 'axios';

export const PASS_CURR_TRUCK = 'PASS_CURR_TRUCK';

export function PassCurrTruck(truck) {
  const request = { currentTruck: truck.name };
  return {
    type: PASS_CURR_TRUCK,
    payload: request
  };
}
