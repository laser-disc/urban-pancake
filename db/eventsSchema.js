const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  name: String,
  handle: String,
  description: String,
  message: String,
  timeStamp: String,
  imageUrl: String,
  location: { lat: Number, lng: Number },
  schedule: [
    /* sunday: */ { closed: Boolean },
    /* monday: */ { closed: Boolean },
    /* tuesday: */ { closed: Boolean },
    /* wednesday: */ { closed: Boolean },
    /* thursday: */ { closed: Boolean },
    /* friday: */ { closed: Boolean },
    /* saturday: */ { closed: Boolean },
  ],
  todaysTrucks: Array,
  // yelpId: String,
  // yelpInfo: {
  //   name: String,
  //   yelpBizID: String,
  //   starsRating: String,
  //   review_count: Number,
  //   custReview: String,
  //   photo: String,
  //   categories: String,  // aka 'cuisine'
  // }
});

const Event = mongoose.model('Food Truck Events', eventsSchema);

module.exports = Event;
