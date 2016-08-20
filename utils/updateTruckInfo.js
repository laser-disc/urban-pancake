const Truck = require('../db/truckSchema');
const Twitter = require('twitter');
const Yelp = require('yelp');
let Scraper = require ('images-scraper');
let google = new Scraper.Google();

const twitterInfo = {
  consumer_key: process.env.TWITTERINFO_CONSUMER_KEY,
  consumer_secret: process.env.TWITTERINFO_CONSUMER_SECRET,
  bearer_token: process.env.TWITTERINFO_BEARER_TOKEN,
};
const yelpInfo = {
  consumer_key: process.env.YELPINFO_CONSUMER_KEY,
  consumer_secret: process.env.YELPINFO_CONSUMER_SECRET,
  token: process.env.YELPINFO_TOKEN,
  token_secret: process.env.YELPINFO_TOKEN_SECRET,
};
const twitterClient = new Twitter(twitterInfo);
const { truckSchedules } = require('../utils/truckSchedules');

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
    website: null,
    allTweetObjs: [],
    allTweetMessages: [],
    chosenIndex: null,
    getLocationResults: { poi: null, address: null },
    geoInfo: null,
    truck: null,
  };
};


module.exports.getYelpInfo = (truck) => {
  if(!truck.yelpBizID){
    truck.yelpBizID = truck.truck.yelpId;
  }
  return new Promise((resolve, reject) => {
    let yelp = new Yelp(yelpInfo);
    let categories = [];
    yelp.business(truck.yelpBizID, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let categories = [];
        if(data.categories) {
          data.categories.forEach(function(cat) {
            return categories.push(cat[0]);
          })
        }

        const truckYelpObj = yelpObj(truck.yelpBizID);
        truckYelpObj.name = data.name;
        // if the image below (data.rating_img_url) is too large, use data.rating_img_url_small instead (or simply data.rating if you just want the number rating 4.5 or 4)
        truckYelpObj.starsRating = data.rating_img_url_large;
        truckYelpObj.review_count = data.review_count;
        truckYelpObj.custReview = data.snippet_text;
        truckYelpObj.photo = data.image_url.substr(0, data.image_url.length-6) + 'o.jpg';
        truckYelpObj.categories = categories;
        truckYelpObj.phone = data.display_phone;

        // TODO: turn this array into a string
        truckYelpObj.twitterHandle = truck.truckName;
        truck.truck.yelpInfo = truckYelpObj;
        resolve(truck);
      }
    });
  });
};

module.exports.getFiveTweets = (newTruckObj, tweetID) => {
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
      newTruckObj.fiveTweetObjs.push(tweet.url);
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
      if(tweets){
        if(tweets[0]) {
          newTruckObj.website = tweets[0].user.url;
          newTruckObj.allTweetObjs = tweets;
          tweets.forEach(tweet => newTruckObj.allTweetMessages.push(tweet.text));
        }
      }
      resolve(newTruckObj);
    });
  });
};

module.exports.getUserEnteredTruckTwitterInfo = (newTruckObj) => {
  return new Promise((resolve, reject) => {
    const searchParams = {
      screen_name: newTruckObj.truck.handle.slice(1, newTruckObj.truck.handle.length),
      exclude_replies: true,
      include_rts: true,
    };
    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    twitterClient.get('statuses/user_timeline', searchParams, (error, tweets) => {
      if (error) {
        console.log('error', error);
        reject(error);
      }

      if(tweets){
        if(tweets[0]) {
          newTruckObj.truck.imageUrl = tweets[0].user.profile_image_url.split('_normal').join('');
        }
      }
      resolve(newTruckObj);
    });
  });
};

module.exports.createTruckWithGeoInfo = (newTruckObj) => {
  return new Promise((resolve) => {
    // send all tweet messages to getLocationFromTweets
    const tweets = newTruckObj.allTweetObjs;
    let description = tweets[0].user.description
    description = description.length <= 120 ? description : description.substring(0, 117) + '...';

    newTruckObj.truck = new Truck({
      name: tweets[0].user.name,
      handle: `@${tweets[0].user.screen_name}`,
      website: newTruckObj.website,
      description: description,
      message: tweets[0].text,
      timeStamp: tweets[0].created_at,
      imageUrl: tweets[0].user.profile_image_url.split('_normal').join(''),
      location: newTruckObj.geoInfo,
      schedule: truckSchedules[tweets[0].user.name],
      photosFromGoogle: [],
      yelpId: null,
      yelpInfo: null,
    });
    resolve(newTruckObj);
  });
};

module.exports.createOrUpdateDB = (newTruckObj) => {
  return new Promise((resolve, reject) => {
    // Truck.find will return an array of all the trucks in the db that match the search criteria that is given in the first argument
    if(newTruckObj.truck.handle[0] !== '@'){
      newTruckObj.truck.handle = '@' + newTruckObj.truck.handle;
    }
    Truck.find({ handle: newTruckObj.truck.handle }, (err, trucks) => {
      //  if no matches are found, it will return an empty array
      if (trucks.length === 0) {
        // and then we create a new document in the db for that truck
        module.exports.getTenImages(newTruckObj)
        .then(newTruckObj => {
          return module.exports.getYelpInfo(newTruckObj)
        })
        .then(newTruckObj => {

          newTruckObj.truck.save((err, resp) => {
            if(err){
              console.log("createOrUpdateDB error", err);
              reject(err)
            }
            else{
              resolve(resp);
            }
          });
          console.log(`${newTruckObj.name} truck created`);
        })
        .catch( error => {
          console.log("createOrUpdateDB promise chain error", error);
        })
      } else {
        // otherwise update existing document
        Truck.findOneAndUpdate(
          { handle: newTruckObj.truck.handle },
          { $set: {
            message: newTruckObj.truck.message,
            timeStamp: newTruckObj.truck.timeStamp,
            location: newTruckObj.truck.location,
          } }, { upsert: true },
          (err, resp) => err ? reject(err) : resolve(resp)
        );
        console.log(`${newTruckObj.name} truck updated`);
      }
    });
  });
};

module.exports.getTenImages = (newTruckObj) => {
  return new Promise((resolve, reject) => {
    google.list({
      keyword: newTruckObj.truck.name + " sf menu items",
      num: 10,
      detail: true,
      nightmare: {
        show: true
      }
    })
    .then(function (res) {
      res.forEach( pic => {
        newTruckObj.truck.photosFromGoogle.push(pic.url);
      });
      resolve(newTruckObj);
    }).catch(function(err) {
      console.log('updateTruckInfo.js getTenImages error', err);
      reject(err);
    });
  });
};

module.exports.getYelpMap = (newTruckObj) => {
  return new Promise((resolve, reject) => {

  })
};
