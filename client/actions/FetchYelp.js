import axios from 'axios';

export const FETCH_YELP = 'FETCH_YELP';

export function FetchYelp(truckName) {
  const url = '/API/yelp';
  const request = axios.get(url, { params: { truckName: truckName } });
  return {
    type: FETCH_YELP,
    payload: request,
  };
}
