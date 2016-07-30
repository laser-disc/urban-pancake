const db = require('../db/config');
const mongoose = require('mongoose');
const Tweet = require('./tweetSchema');

// PUT ALL THE GET REQUESTS IN HERE FROM SERVER TO TWITTER
module.exports = function(app) {



  let tweet = new Tweet({handle: '@Barky', message: 'I am a food truck. Eat my Food.'});

  tweet.save(function(err, tweet) {
    if(err) {
      return console.error(err);
    }
    console.dir(tweet);
  });



}
