'use strict'

const db = require('../db/config');
const mongoose = require('mongoose');
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
const GMAP_API_KEY = secretKeys.GMAP_API_KEY || process.env['GMAP_API_KEY'];
// PUT ALL THE GET REQUESTS IN HERE FROM SERVER TO TWITTER


const twitterClient = new Twitter(twitterInfo);
let foodTrucks = ['curryupnow', 'chairmantruck'];

//post tweets to DB
//perform this function periodically

foodTrucks.forEach( foodTruck => {
  // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
  let searchParams = {
      screen_name: foodTruck,
      exclude_replies: true,
      include_rts: true
    }
  twitterClient.get('statuses/user_timeline', searchParams, function(error, tweets, response){
    if(error) {
      console.log("error ", error);
      return error;
    }

    let truck = new Truck({
        name: tweets[0].user.name,
        handle: '@'+foodTruck,
        description: tweets[0].user.description,
        message: tweets[0].text,
        timeStamp: tweets[0].created_at,
        imageUrl: tweets[0].user.profile_image_url
    });

    // Truck.find will return an array of all the trucks in the db that match the search criteria that is given in the first argument
    Truck.find({handle: '@'+foodTruck}, function(err, trucks) {
      //  if no matches are found, it will return an empty array
      // and then we create a new document in the db for that truck
      if(trucks.length===0){
        Truck.findOneAndUpdate({handle: '@'+foodTruck}, truck, {upsert: true}, function(err, resp) {
          if(err) return console.error(err);
          else console.log("truck "+foodTruck+" created");
        });
      } else {
        // removes the old truck document
        trucks[0].remove();
        // creates a new truck document
        truck.save(function(err, resp) {
          if(err) return console.error(err);
          else console.log("truck "+foodTruck+" updated");
        });
      }
    });
  });
});

module.exports = function(app) {
  app.get("/API/fetchAll", function(req,res){
    Truck.find(function(err, trucks){
      res.status(200).send(trucks);
    })
  })

  app.get("/API/fetch", function(req,res){
    //handle must be different for test and client
    let handle = req.body.params ? req.body.params.handle : req.query.handle;

    Truck.findOne({handle: handle}, function(err, truck){
        res.status(200).send(truck);
    })
  })
}
