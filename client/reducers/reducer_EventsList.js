// Uses data provided by the FETCH_EVENTS action to update the state
import { FETCH_EVENTS } from '../actions/FetchEvents';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_EVENTS:
    // only adds to the state events that are open today
      const everyEvent = action.payload.data;
      const today = (new Date()).toString().slice(0, 3);
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const todayNum = daysOfWeek.indexOf(today);
      return everyEvent.filter((event) => {
        if (!event.schedule[todayNum].closed) {
          return event;
        };
      });
    default:
      return state;
  }
}
