const db = require('../db/config');
const mongoose = require('mongoose');
const Truck = require('../db/truckSchema');
const Twitter = require('twitter');
const secretKeys = require('../env/config');

// PUT ALL THE GET REQUESTS IN HERE FROM SERVER TO TWITTER
module.exports = function(app) {
  const twitterClient = new Twitter(secretKeys.twitterInfo);
  let foodTrucks = ['curryupnow', 'chairmantruck'];


//post tweets to DB
  //perform this function periodically
  
  foodTrucks.forEach( truck => {
    // search parameters according to https://dev.twitter.com/rest/reference/get/statuses/user_timeline
    twitterClient.get('statuses/user_timeline', {screen_name: truck, exclude_replies: true, include_rts: true}, function(error, tweets, response){
      
      if(error) { return error;}
      if (!error) {
        let tweet = new Truck({ 
            name: tweets[0].user.name,
            handle: '@'+truck,
            description: tweets[0].user.description,

            message: tweets[0].text,
            timeStamp: tweets[0].created_at,
            imageUrl: tweets[0].user.profile_image_url
        });


        // Truck.findOneAndUpdate({handle: '@'+truck}, tweet, {upsert: true}, function(err, tweet) {
        Truck.find({handle: '@'+truck}, function(err, trucks) {
          if(trucks.length===0){
            Truck.findOneAndUpdate({handle: '@'+truck}, tweet, {upsert: true}, function(err, tweet) {
              if(err){
                return console.error(err);
              } else {
                console.log("truck "+truck+" created");
              }
            });
          } else {
            trucks[0].remove();
            tweet.save(function(err, returnedTruck) {
              if(err) {
                return console.error(err);
              } else {
                console.log("truck "+truck+" updated");
              }
            });
          }
        });
      }
    });
  });

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
