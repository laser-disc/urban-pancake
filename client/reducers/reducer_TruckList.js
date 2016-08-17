// Uses data provided by the FetchTrucks action to update the state
import { FETCH_TRUCKS } from '../actions/FetchTrucks';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TRUCKS:
    // only adds to the state trucks that are open today
      const everyTruck = action.payload.data;
      const today = (new Date()).toString().slice(0, 10);
      return everyTruck.filter((truck) => {
        const lastTweetDay = truck.timeStamp.slice(0, 10);
        if (today === lastTweetDay) {
          return truck;
        }
      });
    default:
      return state;
  }
}
