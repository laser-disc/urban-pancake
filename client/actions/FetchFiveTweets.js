import axios from 'axios';

export const FETCH_FIVE_TWEETS = 'FETCH_FIVE_TWEETS';

export function FetchFiveTweets(truckName) {
  const url = '/API/fiveTweets';
  const request = axios.get(url, { params: { truckName: truckName } });
  return {
    type: FETCH_FIVE_TWEETS,
    payload: request,
  };
}