import axios from 'axios';
import API_KEY from './../env/config';


const ROOT_URL = ``;

export const FETCH_TWEETS = 'FETCH_TWEETS';

export function fetchTweets(tweets) {
  const url = ``;
  const request = axios.get(url);

  return {
    type: FETCH_TWEETS,
    payload: request
  };
}

// returning the promise as the payload
