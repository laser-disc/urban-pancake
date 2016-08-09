// FetchTrucks: makes a call to the database in order to update the state. It's
// called in the container TruckList.js

import axios from 'axios';

export const FETCH_TRUCKS = 'FETCH_TRUCKS';

export function FetchTrucks() {
  const url = '/API/fetchAll';
  const request = axios.get(url);
  return {
    type: FETCH_TRUCKS,
    payload: request,
  };
}
