const Event = require('../db/eventsSchema');
const Twitter = require('twitter');
const Yelp = require('yelp');
const { getTruckTwitterInfo } = require('./updateTruckInfo');
const { createTruckWithGeoInfo } = require('./updateTruckInfo');
// const { getTenImages } = require('./updateTruckInfo');
// const { createOrUpdateDB } = require('./updateTruckInfo');
// const { getYelpInfo } = require('./updateTruckInfo');
const { getFiveTweets } = require('./updateTruckInfo');
let Scraper = require ('images-scraper');
let google = new Scraper.Google();
// const { updateDBwithYelpInfo } = require('./updateTruckInfo');

let secretKeys = null;
if (!process.env.TWITTERINFO_CONSUMER_KEY) {
  secretKeys = require('../env/config');  // DO NOT LINT
}
const twitterInfo = secretKeys ? secretKeys.twitterInfo : {
  consumer_key: process.env.TWITTERINFO_CONSUMER_KEY,
  consumer_secret: process.env.TWITTERINFO_CONSUMER_SECRET,
  bearer_token: process.env.TWITTERINFO_BEARER_TOKEN,
};
const yelpInfo = secretKeys ? secretKeys.yelpInfo : {
  consumer_key: process.env.YELPINFO_CONSUMER_KEY,
  consumer_secret: process.env.YELPINFO_CONSUMER_SECRET,
  token: process.env.YELPINFO_TOKEN,
  token_secret: process.env.YELPINFO_TOKEN_SECRET,
};
const twitterClient = new Twitter(twitterInfo);
const { sched, loc } = require('../utils/eventsSchedules');

// This yelp obj is the same as the one in updateTruckInfo, so we don't need this here;
// we can just import it or figure out some adjustment when we merge the files
const yelpObj = (yelpBizID) => {
  return {
    name: null,
    yelpBizID,
    starsRating: null,
    review_count: null,
    custReview: null,
    photo: null,
    categories: null,
  };
};

const getYelpInfo = (eventObj) => {
  return new Promise((resolve, reject) => {
    let yelp = new Yelp(yelpInfo);
    let categories = [];
    yelp.business(eventObj.info.yelpBizID, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // console.log("getYelpInfo data", data);
        const eventYelpObj = yelpObj(eventObj.info.yelpBizID);
        eventYelpObj.name = data.name;
        // if the image below (data.rating_img_url) is too large, use data.rating_img_url_small instead (or simply data.rating if you just want the number rating 4.5 or 4)
        eventYelpObj.starsRating = data.rating_img_url_large;
        eventYelpObj.review_count = data.review_count;
        eventYelpObj.custReview = data.snippet_text;
        eventYelpObj.photo = data.image_url.substr(0, data.image_url.length-6) + 'o.jpg';
        eventYelpObj.categories = data.categories;
        eventObj.info.yelpInfo = eventYelpObj;
        resolve(eventObj);
      }
    });
  });
};

// Constructs the equivalent of TruckObj, which contains all of the Twitter info for an event
const EventInfo = () => {
  return {
    twitterHandle: null,
    fullTweets: null, // will be the raw data object returned from Twitter
    allMessages: [], // we will create this
    info: null, // will contain all of the schema info
  };
};


// Calls the Twitter API to retrieve the last 20 tweets based on the event name
module.exports.getEventTwitterInfo = (event) => {
  return new Promise((resolve, reject) => {
    // creates a new event that is an instance of EventInfo
    const newEvent = EventInfo();
    newEvent.twitterHandle = event;
    // search parameters for the Twitter request include the user's twitter handle
    const searchParams = {
      screen_name: newEvent.twitterHandle,
      exclude_replies: true,
      include_rts: true,
    };
    // now we search Twitter for this user (same as the getTruckTwitterInfo function)
    twitterClient.get('statuses/user_timeline', searchParams, (error, tweets) => {
      if (error) {
        console.log('Error retrieving tweets', error);
        reject(error);
      }
      // set the property of fullTweets to the data returned from the server
      newEvent.fullTweets = tweets;
      // allTweetMessages should only contain message strings
      (newEvent.fullTweets).forEach((tweet) => {
        newEvent.allMessages.push(tweet.text);
      });
      resolve(newEvent);
    });
  });
};

// this function is designed to grab the truck handles from a tweet containing a list of handles
const grabHandles = (tweet) => {
  const handlesList = [];
  // split the string into an array
  const tweetArr = tweet.split(' ');
    // take any element that begins with @ and remove the @
  for (word of tweetArr) {
    if (word[0] === '@') {
      let minusAt = word.substr(1);
      if (minusAt[minusAt.length - 1] === '.') {
        minusAt = minusAt.substr(0, minusAt.length - 1);
      }
      handlesList.push(minusAt);
    }
  }
  return handlesList;
};

// takes eventObj as an argument and returns an array with today's trucks only
const grabTodaysTrucks = (event) => {
  const metaInfo = event.fullTweets[0];
  const today = (new Date()).toString().slice(0, 3);
  const lastTweetDay = metaInfo.created_at.slice(0, 3);
  // checks to see if the date of the last tweet is the same as today's date
  if (today === lastTweetDay) {
    if (event.twitterHandle === 'gloungesf' || event.allMessages[0].split(' ').indexOf( /* '#dinner' */ ) === -1) {
      return grabHandles(event.allMessages[0]);
    }
  } else {
    return [];
  }
};

module.exports.createEventRecord = (eventObj) => {
  return new Promise((resolve, reject) => {
    const tweet = eventObj.fullTweets[0];
    eventObj.info = new Event({
      name: tweet.user.name,
      handle: `@${tweet.user.screen_name}`,
      description: tweet.user.description,
      message: tweet.text,
      timeStamp: tweet.created_at,
      imageUrl: tweet.user.profile_image_url,
      location: loc[tweet.user.screen_name],
      schedule: sched[tweet.user.screen_name],
      todaysTrucks: grabTodaysTrucks(eventObj),
      yelpBizID: '',
      photosFromGoogle: [],
    });
    resolve(eventObj);
  });
};

module.exports.createOrUpdateEvent = (eventObj) => {
  const eventName = eventObj.info.name;
  // console.log("createOrUpdateEvent eventObj.info", eventObj.info)
  return new Promise((resolve, reject) => {
    // searches for an event record in the database with a matching Twitter handle
    Event.find({ name: eventName }, (err, result) => {
      if (result.length === 0) {
        getTenImages(eventObj)
        .then(eventObj => {
          return getYelpInfo(eventObj)
        })
        .then(eventObj => {
          eventObj.info.save((err, resp) => err ? reject(err) : resolve(resp));
          console.log(`${eventName} event created`);
        });
      } else {
        Event.findOneAndUpdate(
          { name: eventName },
          { $set: {
            message: eventObj.info.message,
            timeStamp: eventObj.info.timeStamp,
            todaysTrucks: grabTodaysTrucks(eventObj),
          } }, { upsert: true },
          (err, resp) => err ? reject(err) : resolve(resp)
        );
        console.log(`${eventName} event updated`);
      }
    });
  });
};

const getTenImages = (eventObj) => {
  return new Promise((resolve, reject) => {
    google.list({
      keyword: eventObj.info.name,
      num: 10,
      detail: true,
      nightmare: {
        show: true
      }
    })
    .then(function (res) {
      res.forEach( pic => {
        eventObj.info.photosFromGoogle.push(pic.url);
      });
      resolve(eventObj);
    }).catch(function(err) {
      console.log('get Ten event Images error', err);
      reject(err);
    });
  });
};
