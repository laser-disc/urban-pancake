// Uses data provided by the FetchTrucks action to update the state
import { FETCH_TRUCKS } from '../actions/FetchTrucks';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TRUCKS:
      const everyTruck = action.payload.data;
      const today = (new Date()).toString().slice(0, 10); //should be something like 'Wed'
      return everyTruck.filter((truck) => {
        const lastTweetDay = truck.timeStamp.slice(0, 10);
        if (today !== lastTweetDay) {
          console.log('Throwing out', truck.name);
        } else {
          return truck;
        }
      });
    default:
      return state;
  }
}
