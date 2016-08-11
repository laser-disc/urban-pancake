// TODO REFACTOR createOrUpdateDB TO ONLY REWRITE CERTAIN PROPERTIES ON EXISTING
// DOCUMENTS AND NOT RECREATE WHOLE DOCUMENT

const getLocationFromTweets = require('./getLocationFromTweets');
const Truck = require('../db/truckSchema');
const Twitter = require('twitter');

let secretKeys = null;
if (!process.env.TWITTERINFO_CONSUMER_KEY) {
  secretKeys = require('../env/config');
}
const twitterInfo = secretKeys ? secretKeys.twitterInfo : {
  consumer_key: process.env.TWITTERINFO_CONSUMER_KEY,
  consumer_secret: process.env.TWITTERINFO_CONSUMER_SECRET,
  bearer_token: process.env.TWITTERINFO_BEARER_TOKEN,
};
const twitterClient = new Twitter(twitterInfo);
const { truckSchedules } = require('./truckSchedules');


const TruckObj = () => {
  return {
    name: null,
    allTweetObjs: [],
    allTweetMessages: [],
    chosenIndex: null,
    getLocationResults: { poi: null, address: null },
    geoInfo: null,
    truck: null,
  };
};

module.exports.getTruckTwitterInfo = (foodTruck) => {
  return new Promise((resolve, reject) => {
    const newTruckObj = TruckObj();
    newTruckObj.name = foodTruck;
    const searchParams = {
      screen_name: foodTruck,
      exclude_replies: true,
      include_rts: true,
    };
    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    twitterClient.get('statuses/user_timeline', searchParams, (error, tweets, response) => {
      if (error) {
        console.log('error', error);
        reject(error);
      }
      newTruckObj.allTweetObjs = tweets;
      tweets.forEach(tweet => newTruckObj.allTweetMessages.push(tweet.text));
      resolve(newTruckObj);
    });
  });
};

module.exports.createTruckWithGeoInfo = (newTruckObj) => {
  return new Promise((resolve) => {
    // send all tweet messages to getLocationFromTweets
    const tweets = newTruckObj.allTweetObjs;

    newTruckObj.truck = new Truck({
      name: tweets[0].user.name,
      handle: `@${tweets[0].user.screen_name}`,
      description: tweets[0].user.description,
      message: tweets[0].text,
      timeStamp: tweets[0].created_at,
      imageUrl: tweets[0].user.profile_image_url,
      yelpId: 'stringy',
      location: newTruckObj.geoInfo,
      schedule: truckSchedules[tweets[0].user.name],
    });
    resolve(newTruckObj);
  });
};

module.exports.createOrUpdateDB = (newTruckObj) => {
  return new Promise((resolve, reject) => {
    // Truck.find will return an array of all the trucks in the db that match the search criteria that is given in the first argument
    Truck.find({ handle: newTruckObj.truck.handle }, (err, trucks) => {
      //  if no matches are found, it will return an empty array
      if (trucks.length === 0) {
        // and then we create a new document in the db for that truck
        Truck.findOneAndUpdate(
          { handle: newTruckObj.truck.handle },
          newTruckObj.truck, { upsert: true },
          (err, resp) => err ? reject(err) : resolve(resp)
        );
        console.log(`${newTruckObj.name} created`);
      } else {
        // removes the old truck document
        trucks[0].remove();
        console.log(`${newTruckObj.name} updated`)
        // saves a new truck document
        newTruckObj.truck.save((err, resp) => err ? reject(err) : resolve(resp));
      }
    });
  });
};



// { $set: {
//   message: tweets[0].text,
//   timeStamp: tweets[0].created_at,
//   // newTruckObj.truck.location: newTruckObj.geoInfo,
// } }

// Truck.findOneAndUpdate(
//   {handle: newTruckObj.truck.handle},
//   { $set: { schedule: schedule } }, {upsert: true},
//   (err, resp) => err ? reject(err) : resolve(resp)
// );
