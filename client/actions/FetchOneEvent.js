import axios from 'axios';

export const FETCH_ONE_EVENT = 'FETCH_ONE_EVENT';

export function FetchOneEvent(eventName) {
  const url = '/API/fetchOneEvent';
  const request = axios.get(url, { params: { name: eventName } })
  return {
    type: FETCH_ONE_EVENT,
    payload: request,
  };
}
