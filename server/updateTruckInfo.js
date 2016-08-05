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

// module.exports.foodTrucks = ['curryupnow', 'chairmantruck'];
module.exports.foodTrucks = ['japacurry'];

module.exports.foodEvents = ['gloungesf', 'otgsf', 'SPARKsocialSF'];
module.exports.allTweetMessages = [ ];
module.exports.allTweetObjects = [];

//post tweets to DB
//perform this function periodically

// Create a new Truck with Twitter's status info

module.exports.createTruckWithTwitterInfo = function (foodTruck){
  return new Promise((resolve, reject) => {
    let truck;
    let searchParams = { 
        screen_name: foodTruck, 
        exclude_replies: true, 
        include_rts: true
    };
    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    twitterClient.get('statuses/user_timeline', searchParams, function(error, tweets, response){
      if(error) { 
        console.log("error ", error); 
        reject(error); // return error;
      }
      // stash all the tweets in module.exports.allTweetMessages to be consulted later
      module.exports.allTweetObjects = tweets;
      // resolve(tweets);
      tweets.forEach( (tweet) => {
        module.exports.allTweetMessages.push(tweet.text);
      });
      resolve(module.exports.allTweetMessages);
      // let truckLocation = getLocationFromTweets(module.exports.allTweets);
    });
  });
};

module.exports.createTruckWithGeoInfo = function(geoInfo){
  return new Promise((resolve, reject) => { 
    // send all tweet messages to getLocationFromTweets
    let index = getLocationFromTweets.chosenIndex;
    let tweets = module.exports.allTweetObjects;
    console.log("The current location of "+ tweets[index].user.name + " is lat "+ geoInfo.lat + " lng "+geoInfo.lng);
    
    console.log(tweets[index].text); 
    truck = new Truck({ 
      name: tweets[index].user.name,
      handle: '@'+tweets[index].user.screen_name,
      description: tweets[index].user.description,
      message: tweets[index].text,
      timeStamp: tweets[index].created_at,
      imageUrl: tweets[index].user.profile_image_url,
      location: geoInfo
    });
    module.exports.allTweetObjects.length = 0;  // reset for the next truck
    module.exports.allTweetMessages.length = 0;  // reset for the next truck
    resolve(truck);
  });
};

module.exports.createOrUpdateDB = function (foodTruck){
  // Truck.find will return an array of all the trucks in the db that match the search criteria that is given in the first argument
  return new Promise ((resolve,reject) => {
    Truck.find({handle: foodTruck.handle}, function(err, trucks) {
      if(trucks.length===0){  //  if no matches are found, it will return an empty array
        // and then we create a new document in the db for that truck
        Truck.findOneAndUpdate({handle: foodTruck.handle}, foodTruck, {upsert: true}, function(err, response) {
          if(err){
            console.error(err);
            reject(err);
          }
          else {
            console.log("truck "+foodTruck.name+" created");
            resolve(trucks);
          }
        });
      } else {
        trucks[0].remove(); // removes the old truck document
        foodTruck.save(function(err, returnedTruck) {  // creates a new truck document
          if(err){
            console.error(err);
            reject(err);
          }
          else {
            console.log("truck "+foodTruck.name+" updated");
            resolve(trucks);
          }
        });
      }
    });
  });
};      


