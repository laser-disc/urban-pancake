// TODO REFACTOR createOrUpdateDB TO ONLY REWRITE CERTAIN PROPERTIES ON EXISTING
// DOCUMENTS AND NOT RECREATE WHOLE DOCUMENT

const getLocationFromTweets = require('./getLocationFromTweets');
const Truck = require('../db/truckSchema');
const Twitter = require('twitter');
const Yelp = require('yelp');
let secretKeys = null;
if(!process.env['TWITTERINFO_CONSUMER_KEY']) {
  secretKeys = require('../env/config');
}
const twitterInfo = secretKeys ? secretKeys.twitterInfo : {
  consumer_key: process.env['TWITTERINFO_CONSUMER_KEY'],
  consumer_secret: process.env['TWITTERINFO_CONSUMER_SECRET'],
  bearer_token: process.env['TWITTERINFO_BEARER_TOKEN'],
};

const yelpInfo = secretKeys.yelpInfo || {
  consumer_key:  process.env['YELPINFO_CONSUMER_KEY'],
  consumer_secret: process.env['YELPINFO_CONSUMER_SECRET'],
  token: process.env['YELPINFO_TOKEN'],
  token_secret: process.env['YELPINFO_TOKEN_SECRET'],
};
const twitterClient = new Twitter(twitterInfo);
const {truckSchedules} = require('./truckSchedules');

let yelpObj = function(yelpBizID) {
  return {
    name: null,
    yelpBizID: yelpBizID,
    starsRating: null,
    review_count: null,
    custReview : null,
    photo: null,
    categories: null,  // aka 'cuisine'
  }
};

module.exports.getYelpInfo = function(yelpBizID){
  return new Promise(function(resolve, reject){
    let yelp = new Yelp({
      consumer_key: yelpInfo.consumer_key,
      consumer_secret: yelpInfo.consumer_secret,
      token: yelpInfo.token,
      token_secret: yelpInfo.token_secret,
    });
    yelp.business(yelpBizID, function(err, data){
      if(err){
        console.log("getYelpInfo error", err);
        reject(err);
      }
      else {
        let truckYelpObj = new yelpObj(yelpBizID);
        truckYelpObj.name = data.name;
        // if the image below (data.rating_img_url) is too large, use data.rating_img_url_small instead (or simply data.rating if you just want the number rating 4.5 or 4)
        truckYelpObj.starsRating = data.rating_img_url;
        truckYelpObj.review_count = data.review_count;
        truckYelpObj.custReview = data.snippet_text;
        truckYelpObj.photo = data.image_url;
        truckYelpObj.categories = data.categories;
        console.log("*******getYelpInfo truckYelpObj**********\n", truckYelpObj);
        resolve(truckYelpObj);
      }
    })
  });
}

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
  console.log("&&&&&& NO MORE CONSOLE.LOGS FOR MATT &&&&&&&");
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
  return new Promise( function (resolve, reject) {
    // send all tweet messages to getLocationFromTweets
    let index = newTruckObj.chosenIndex;
    let tweets = newTruckObj.allTweetObjs;

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
        console.log(newTruckObj.name + " created");
      } else {
        // removes the old truck document
        trucks[0].remove();
        console.log(newTruckObj.name + " updated")
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
