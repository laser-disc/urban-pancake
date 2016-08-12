// TODO REFACTOR createOrUpdateDB TO ONLY REWRITE CERTAIN PROPERTIES ON EXISTING
// DOCUMENTS AND NOT RECREATE WHOLE DOCUMENT

// const getLocationFromTweets = require('./getLocationFromTweets');
const Truck = require('../db/truckSchema');
const Twitter = require('twitter');
const Yelp = require('yelp');

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
const { truckSchedules } = require('./truckSchedules');

const yelpObj = (yelpBizID) => {
  return {
    name: null,
    yelpBizID,
    starsRating: null,
    review_count: null,
    custReview: null,
    photo: null,
    categories: null,  // aka 'cuisine'
  };
};

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


module.exports.getYelpInfo = (truck) => {
  return new Promise((resolve, reject) => {
    let yelp = new Yelp(yelpInfo);
    yelp.business(truck.yelpBizID, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const truckYelpObj = yelpObj(truck.yelpBizID);
        truckYelpObj.name = data.name;
        // if the image below (data.rating_img_url) is too large, use data.rating_img_url_small instead (or simply data.rating if you just want the number rating 4.5 or 4)
        truckYelpObj.starsRating = data.rating_img_url;
        truckYelpObj.review_count = data.review_count;
        truckYelpObj.custReview = data.snippet_text;
        truckYelpObj.photo = data.image_url.substr(0, data.image_url.length-6) + 'o.jpg';
        // truckYelpObj.categories = data.categories;  // TODO: turn this array into a string
        truckYelpObj.twitterHandle = truck.truckName;
        truck.truck.yelpInfo = truckYelpObj;
        resolve(truck);
      }
    });
  });
};

module.exports.getFiveTweets = (newTruckObj, tweetID) => {
  console.log("getFiveTweets just recieved ", newTruckObj.name, tweetID);
  return new Promise ((resolve, reject) => {
    let searchParams = {
      url: 'https://twitter.com/' + newTruckObj.name + '/status/' + tweetID,
    };
    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/oembed
    twitterClient.get('statuses/oembed', searchParams, (error, tweet, response) => {
      if (error) {
        console.log("getFive Tweets error", error);
        reject(error);
      }
      let addClassName = '<blockquote className' + tweet.html.split('<blockquote class')[1];
      let noCharSet = addClassName.split(' charset="utf-8"').join('');
      newTruckObj.fiveTweetObjs.push(noCharSet);
      resolve(newTruckObj);
    });
  });    
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
    twitterClient.get('statuses/user_timeline', searchParams, (error, tweets) => {
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
      location: newTruckObj.geoInfo,
      schedule: truckSchedules[tweets[0].user.name],
      yelpId: null,
      yelpInfo: null,
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
        // newTruckObj.truck.save((err, resp) => err ? reject(err) : resolve(resp));
        newTruckObj.truck.save((err, resp) => err ? reject(err) : resolve(resp));
        console.log(`${newTruckObj.name} created`);
      } else {
        // otherwise update existing document
        Truck.findOneAndUpdate(
          { handle: newTruckObj.truck.handle },
          { $set: {
            message: newTruckObj.truck.message,
            timeStamp: newTruckObj.truck.timeStamp,
            location: newTruckObj.truck.location,
            yelpInfo: newTruckObj.truck.yelpInfo,
          } }, { upsert: true },
          (err, resp) => err ? reject(err) : resolve(resp)
        );
        console.log(`${newTruckObj.name} updated`);
      }
    });
  });
};


