import axios from 'axios';

export const FETCH_EVENTS = 'FETCH_EVENTS';

export function FetchEvents() {
  const url = '/API/fetchEvents';
  const request = axios.get(url);
  return {
    type: FETCH_EVENTS,
    payload: request,
  };
};

