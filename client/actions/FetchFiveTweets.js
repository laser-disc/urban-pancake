import axios from 'axios';

export const FETCH_FIVE_TWEETS = 'FETCH_FIVE_TWEETS';

export function FetchFiveTweets() {
  const url = '/API/fiveTweets';
  const request = axios.get(url, { params: { truckName: 'CurryUpNow' } });
  return {
    type: FETCH_FIVE_TWEETS,
    payload: request,
  };
}