import axios from 'axios';


// twitter Access Token    730559537397141504-Sy7hpkpNbqWySwLbBXNs3kkyVMDbVmh
// twitter Consumer Key (API Key)
const API_KEY = 'Cb3njBPIsPYap5c4nucBgc8CD';
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
