const getLocationFromTweets = require('./getLocationFromTweets');
const Truck = require('../db/truckSchema');
const Twitter = require('twitter');
let secretKeys = null;
if(!process.env['TWITTERINFO_CONSUMER_KEY']) {
  secretKeys = require('../env/config');
}
const twitterInfo = secretKeys.twitterInfo || {
  consumer_key: process.env['TWITTERINFO_CONSUMER_KEY'],
  consumer_secret: process.env['TWITTERINFO_CONSUMER_SECRET'],
  bearer_token: process.env['TWITTERINFO_BEARER_TOKEN'],
};
const twitterClient = new Twitter(twitterInfo);
let TruckObj = function() {
  return {
    name: null,
    allTweetObjs : [],
    allTweetMessages : [],
    chosenIndex : null,
    getLocationResults : { poi : null, address : null },
    geoInfo : null,
    truck : null,
  }
};

module.exports.getTruckTwitterInfo = function(foodTruck) {
  console.log("&&&&&& BEGINNING OF MATTs CONSOLE.LOGS &&&&&&&");
  return new Promise(function(resolve, reject) {
    let newTruckObj = new TruckObj();
    newTruckObj.name = foodTruck;
    let searchParams = {
      screen_name: foodTruck,
      exclude_replies: true,
      include_rts: true,
    };
    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    twitterClient.get('statuses/user_timeline', searchParams, function(error, tweets, response) {
      console.log("******If the following line throws an error, the Twitter Handle for the truck is not searchable on Twitter ABORT*****");
      console.log(tweets[0].text)
      if(error) {
        console.log("error", error);
        reject(error);
      }
      newTruckObj.allTweetObjs = tweets;
      tweets.forEach(tweet => newTruckObj.allTweetMessages.push(tweet.text));
      resolve(newTruckObj);
    });
  });
};

module.exports.createTruckWithGeoInfo = function(newTruckObj) {
  console.log("inside createTruckWithGeoInfo, just received ", JSON.stringify(newTruckObj.geoInfo));
  return new Promise( function (resolve, reject) {
    // send all tweet messages to getLocationFromTweets
    let index = newTruckObj.chosenIndex;
    let tweets = newTruckObj.allTweetObjs;

    newTruckObj.truck = new Truck({
      name: tweets[index].user.name,
      handle: '@'+tweets[index].user.screen_name,
      description: tweets[index].user.description,
      message: tweets[index].text,
      timeStamp: tweets[index].created_at,
      imageUrl: tweets[index].user.profile_image_url,
      location: newTruckObj.geoInfo,
    });
    resolve(newTruckObj);
  });
};

module.exports.createOrUpdateDB = function(newTruckObj) {
  console.log("inside createOrUpdateDB, just received "+ newTruckObj.name+" info");
  return new Promise (function(resolve,reject) {
    // Truck.find will return an array of all the trucks in the db that match the search criteria that is given in the first argument
    Truck.find({handle: newTruckObj.truck.handle}, function (err, trucks) {
      //  if no matches are found, it will return an empty array
      if(trucks.length === 0) {
        // and then we create a new document in the db for that truck
        Truck.findOneAndUpdate(
          {handle: newTruckObj.truck.handle},
          newTruckObj.truck, {upsert: true},
          (err, response) => err ? reject(err) : resolve(trucks)
        );
        console.log(newTruckObj.name + "created");
      } else {
        // removes the old truck document
        trucks[0].remove();
        console.log(newTruckObj.name + "updated")
        // saves a new truck document
        newTruckObj.truck.save((err, returnedTruck) => err ? reject(err) : resolve(trucks));
      }
    });
  });
};
