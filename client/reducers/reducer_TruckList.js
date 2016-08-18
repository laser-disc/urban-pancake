// Uses data provided by the FetchTrucks action to update the state
import { FETCH_TRUCKS } from '../actions/FetchTrucks';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TRUCKS:
    // only adds to the state trucks that are open today
      const everyTruck = action.payload.data;
      const today = (new Date()).toString().slice(0, 10);
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayNum = daysOfWeek.indexOf(today.slice(0, 3));
      return everyTruck.filter((truck) => {
        const lastTweetDay = truck.timeStamp.slice(0, 10);
        // checks based on the day of the last tweet and falls back to check the schedule
        if (today === lastTweetDay || (truck.schedule.length > 0 && !truck.schedule[dayNum].closed)) {
          return truck;
        }
      });
    default:
      return state;
  }
}
