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
  bearer_token: process.env['TWITTERINFO_BEARER_TOKEN']
};
const twitterClient = new Twitter(twitterInfo);

module.exports = {};
module.exports.foodTrucks = ['JapaCurry','CurryUpNow', 'chairmantruck']; // make sure to add the exact Twitter handle minus the @
module.exports.foodEvents = ['gloungesf', 'otgsf', 'SPARKsocialSF'];
// Don't try to get Twitter info from these trucks - you will FAIL
// badFoodTrucks equalz ['senorsisig'];

let TruckObj = function(){
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

module.exports.getTruckTwitterInfo = function (foodTruck){
  console.log("&&&&&& BEGINNING OF MATTs CONSOLE.LOGS &&&&&&&");
  return new Promise((resolve, reject) => {
    let newTruckObj = new TruckObj();
    newTruckObj.name = foodTruck;
    let searchParams = {
      screen_name: foodTruck,
      exclude_replies: true,
      include_rts: true
    };
    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    twitterClient.get('statuses/user_timeline', searchParams, function(error, tweets, response){
      console.log("******If the following line throws an error, the Twitter Handle for the truck is not searchable on Twitter ABORT*****");
      console.log(tweets[0].text)

      if(error) {
        console.log("error ", error);
        reject(error);
      }
      newTruckObj.allTweetObjs = tweets;
      tweets.forEach( (tweet) => {
        newTruckObj.allTweetMessages.push(tweet.text);
      });
      resolve(newTruckObj);
    });
  });
};

module.exports.createTruckWithGeoInfo = function(newTruckObj){
  console.log("inside createTruckWithGeoInfo, just received ", JSON.stringify(newTruckObj.geoInfo));
  return new Promise((resolve, reject) => {
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
      location: newTruckObj.geoInfo
    });
    resolve(newTruckObj);
  });
};

module.exports.createOrUpdateDB = (newTruckObj) => {
  console.log("inside createOrUpdateDB, just received "+ newTruckObj.name+" info");
  return new Promise ((resolve,reject) => {
    // Truck.find will return an array of all the trucks in the db that match the search criteria that is given in the first argument
    Truck.find({handle: newTruckObj.truck.handle}, (err, trucks) => {
      if(trucks.length === 0) {  //  if no matches are found, it will return an empty array
        // and then we create a new document in the db for that truck
        Truck.findOneAndUpdate(
          {handle: newTruckObj.truck.handle},
          newTruckObj.truck, {upsert: true},
          (err, response) => err ? reject(err) : resolve(trucks)
        );
      } else {
        trucks[0].remove(); // removes the old truck document
        newTruckObj.truck.save((err, returnedTruck) => err ? reject(err) : resolve(trucks));
      }
    });
  });
};
