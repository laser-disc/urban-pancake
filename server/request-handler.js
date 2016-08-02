const db = require('../db/config');
const mongoose = require('mongoose');
const Tweet = require('../db/tweetSchema');
const Twitter = require('twitter');
const secretKeys = require('../env/config');

// PUT ALL THE GET REQUESTS IN HERE FROM SERVER TO TWITTER
module.exports = function(app) {
  const twitterClient = new Twitter(secretKeys.twitterInfo);
  let trucks = ['senorsisig','curryupnow'];


//post tweets to DB
  //perform this function periodically
  trucks.forEach( truck => {
    twitterClient.get('search/tweets', {q: truck}, function(error, tweets, response){
      if(error) { return error;}
      if (!error) {
        let tweet = new Tweet({handle: '@'+truck, message: tweets.statuses[0].text});
        tweet.save(function(err, tweet) {
          if(err) {
            return console.error(err);
          }
        });
      }
    });
  });

  app.get("/API/fetchAll", function(req,res){ 
    Tweet.find(function(err, trucks){
      res.status(200).send(trucks);
    })
  })

  app.get("/API/fetch", function(req,res){
    //handle must be different for test and client
    let handle = req.body.params ? req.body.params.handle : req.query.handle;

    Tweet.findOne({handle: handle}, function(err, truck){
        res.status(200).send(truck);
    })
  })
}
