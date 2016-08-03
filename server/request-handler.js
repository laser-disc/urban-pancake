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
// PUT ALL THE GET REQUESTS IN HERE FROM SERVER TO TWITTER
module.exports = function(app) {

  const twitterClient = new Twitter(twitterInfo);
  let foodTrucks = ['curryupnow', 'chairmantruck', 'senorsisig'];
 
//post tweets to DB
  //perform this function periodically
  
  foodTrucks.forEach( foodTruck => {

    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    twitterClient.get('statuses/user_timeline', {screen_name: foodTruck, exclude_replies: true, include_rts: true}, function(error, tweets, response){
      
      if(error) { console.log("error ", error); return error;}
      if (!error) {
        let truck = new Truck({ 
            name: tweets[0].user.name,
            handle: '@'+foodTruck,
            description: tweets[0].user.description,
            message: tweets[0].text,
            timeStamp: tweets[0].created_at,
            imageUrl: tweets[0].user.profile_image_url
        });


        // Truck.findOneAndUpdate({handle: '@'+truck}, tweet, {upsert: true}, function(err, tweet) {
        Truck.find({handle: '@'+foodTruck}, function(err, trucks) {
          if(trucks.length===0){
            Truck.findOneAndUpdate({handle: '@'+foodTruck}, truck, {upsert: true}, function(err, response) {
              if(err){
                return console.error(err);
              } else {
                console.log("truck "+foodTruck+" created");
              }
            });
          } else {
            trucks[0].remove();
            truck.save(function(err, returnedTruck) {
              if(err) {
                return console.error(err);
              } else {
                console.log("truck "+foodTruck+" updated");
              }
            });
          }
        });
      }
    });
  });

  // foodTrucks.forEach((foodTruck) => {
  //   twitterClient.get('search/tweets', {q: foodTruck}, function(error, trucks, response){
  //     if(error) { return error;}
  //     if (!error) {
  //       let truck = new Truck({handle: `@${foodTruck}`, message: trucks.statuses[0].text});
  //       truck.save(function(err, truck) {
  //         if(err) {
  //           return console.error(err);
  //         }
  //       });
  //     }
  //   });
  // });

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
