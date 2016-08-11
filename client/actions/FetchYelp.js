import axios from 'axios';

export const FETCH_YELP = 'FETCH_YELP';

export function FetchYelp() {
  console.log('FETCHING YELP FETCHING YELP FETCHING YELP FETCHING YELP FETCHING YELP FETCHING YELP FETCHING YELP FETCHING YELP FETCHING YELP FETCHING YELP')
  const url = '/API/yelp';
  const request = axios.get(url,   {params: {
      truckName: "Curry Up Now"
    }
  } );
  return {
    type: FETCH_YELP,
    payload: request,
  };
}
