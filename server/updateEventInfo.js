const Event = require('../db/eventsSchema');
const Twitter = require('twitter');
// const Yelp = require('yelp');

let secretKeys = null;
if (!process.env.TWITTERINFO_CONSUMER_KEY) {
  secretKeys = require('../env/config');  // DO NOT LINT
}
const twitterInfo = secretKeys ? secretKeys.twitterInfo : {
  consumer_key: process.env.TWITTERINFO_CONSUMER_KEY,
  consumer_secret: process.env.TWITTERINFO_CONSUMER_SECRET,
  bearer_token: process.env.TWITTERINFO_BEARER_TOKEN,
};
// const yelpInfo = secretKeys ? secretKeys.yelpInfo : {
//   consumer_key: process.env.YELPINFO_CONSUMER_KEY,
//   consumer_secret: process.env.YELPINFO_CONSUMER_SECRET,
//   token: process.env.YELPINFO_TOKEN,
//   token_secret: process.env.YELPINFO_TOKEN_SECRET,
// };
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

// Constructs the equivalent of TruckObj, which contains all of the Twitter info for an event
const EventInfo = () => {
  return {
    twitterHandle: null,
    fullTweets: null, // will be the raw data object returned from Twitter
    allMessages: [], // we will create this
    chosenIndex: null,
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
    // anything without #lunch and #dinner hashtags
    if (event.twitterHandle === 'gloungesf' || event.allMessages[0].split(' ').indexOf('#dinner') === -1) {
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
    });
    resolve(eventObj);
  });
};

module.exports.createOrUpdateEvent = (eventObj) => {
  const eventName = eventObj.info.name;
  return new Promise((resolve, reject) => {
    // searches for an event record in the database with a matching Twitter handle
    Event.find({ name: eventName }, (err, result) => {
      if (result.length === 0) {
        eventObj.info.save((err, resp) => err ? reject(err) : resolve(resp));
        console.log(`${eventName} created`);
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
        console.log(`${eventName} updated`);
      }
    });
  });
};








// this function is designed to grab the truck handles from a tweet containing
const grabHandles = function(tweet) {
  let handles = [];
  // split the string into an array
  let tweetArr = tweet.split(" ");
    // take any element that begins with @ and remove the @
    for (word of tweetArr) {
      if (word[0] === '@') {
        let minusAt = word.substr(1);
        if (minusAt[minusAt.length-1] === '.') {
          minusAt = minusAt.substr(0, minusAt.length-1);
        }
        //TODO: remove punctuation
        // push the element to the trucks array
        handles.push(minusAt);
      };
    };
    console.log(handles);
};


//this function is the same as grabHandles but also looks for a #lunch marker in the tweet
const grabWithHashtag = function(tweet) {
  let tester = tweet.split(" ");
  if (tester.indexOf('#lunch') !== -1) {
    grabHandles(tweet)
  };
};


// returns an object that will indicate which trucks are present TODAY
const grabTodaysTrucks = (newEvent) => {
  // we want to return an object {today: 5, trucks: ['senor sesig, etc']}
  //first we check if the date on hte obj in the dtabase is the same as today's date'
    // if it's the same, we're done
    // if it's not, we update the obj
};


//   //gives us the latest tweet object from the twitter acct
//   const lastTweet = newEvent.allTweetObjs[0];
//   let truckInfo = {};

//   today is a time stamp for the current date and time, eg "Fri Aug 12 2016 17:19:57 GMT-0700 (PDT)"
//   const today = (new Date).toString();
//  we need to check in the DB to see if 
//   truckInfo.today = today;

//  now we need to get all the trucks from this particular day only

//   we want return an object that contains today: 0, 1, 2, etc and an array of trucks from that tweet

// craeted_at = "Fri Aug 12 17:45:13 +0000 2016