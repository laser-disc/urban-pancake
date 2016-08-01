import axios from 'axios';
// import API_KEY from './../env/config';


const ROOT_URL = ``;

export const FETCH_TWEET = 'FETCH_TWEET';

export function fetchTweet(truck) {
  const url = '/API/fetch';
  const request = axios.get(url, {
      params: {
        handle: truck.handle
      }
    })
  console.log('INSIDE FETCHTWEET FUNCTION', request);
  return {
    type: FETCH_TWEET,
    payload: request
  };
}

// returning the promise as the payload
