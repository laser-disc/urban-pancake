const db = require('../db/config');
const mongoose = require('mongoose');
const Tweet = require('./tweetSchema');
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
          console.dir(tweet);
        });
      }
    });
  });

  app.get("/API/fetch", function(req,res){
    // console.log("app.get req", req);
    Tweet.findOne({handle: req.query.handle}, function(err, tweet){
      // if(err){
      //   return res.status(400).send("Error retrieving tweet" + err)
      // }
      // else if(tweet === null){
      //   return res.status(400).send("no tweets by that user")
      // }
      // else{
        // res.status(200).send("app.get 200 success");
        // console.log(tweet);
        res.status(200).send(JSON.stringify(tweet));
        
      // }
    })
  })
}





