let allTweets = require('./updateTruckInfo').allTweets;
let addressValidator = require('address-validator');
let Address = addressValidator.Address;
// var _ = require('underscore');

// var address = new Address({
//     street: possibleAddress,
//     city: 'San Francisco',
//     state: 'CA',
//     country: 'US'
// });


module.exports = function (allTweets){
  let results = {};
  results.foundLocation = '';
  results.chosenTweet = null;
  // allTweets.forEach( (tweet) => {
  //   console.log(tweet);
  // });
  return results;
};