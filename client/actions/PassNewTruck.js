import axios from 'axios';
export const PASS_NEW_TRUCK = 'PASS_NEW_TRUCK';

export function PassNewTruck(truck) {
  const url = '/API/addTruck';
  const request = axios.get(url, { params: { newTruck: truck } })
  return {
    type: PASS_NEW_TRUCK,
    payload: request
  };
}
