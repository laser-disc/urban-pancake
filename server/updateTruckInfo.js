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
const truckSchedules = require('./truckSchedules').truckSchedules;


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
  console.log("inside createTruckWithGeoInfo, just received ", JSON.stringify(newTruckObj.geoInfo /*.geoInfo */ ));
  return new Promise( function (resolve, reject) {
    // send all tweet messages to getLocationFromTweets
    let index = newTruckObj.chosenIndex;
    let tweets = newTruckObj.allTweetObjs;

    console.log('HELLO WORLD', truckSchedules, tweets[0].user.name.length, tweets[0].user.name);
    console.log('******* fuck off world *********', truckSchedules[tweets[0].user.name]);
    newTruckObj.truck = new Truck({
      name: tweets[0].user.name,
      handle: '@'+tweets[0].user.screen_name,
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

module.exports.createOrUpdateDB = function(newTruckObj) {
  console.log("inside createOrUpdateDB, just received "+ newTruckObj.truck.handle +" info");
  return new Promise (function(resolve,reject) {
    // Truck.find will return an array of all the trucks in the db that match the search criteria that is given in the first argument
    Truck.find({handle: newTruckObj.truck.handle}, function (err, trucks) {
      //  if no matches are found, it will return an empty array
      if(trucks.length === 0) {
        // and then we create a new document in the db for that truck
        Truck.findOneAndUpdate(
          {handle: newTruckObj.truck.handle},
          newTruckObj.truck, {upsert: true},
          (err, resp) => err ? reject(err) : resolve(resp)
        );
        console.log(newTruckObj.name + "created");
      } else {
        // removes the old truck document
        trucks[0].remove();
        console.log(newTruckObj.name + "updated")
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
