import axios from 'axios';
// import API_KEY from './../env/config';


// const ROOT_URL = ``;

export const FETCH_TRUCKS = 'FETCH_TRUCKS';

export function FetchTrucks() {
  const url = '/API/fetchAll';
  const request = axios.get(url)
  // .then(function (response) {
  //   console.log('INSIDE PROMISE OF ACTION', response);
  // })
  return {
    type: FETCH_TRUCKS,
    payload: request
  };

}
