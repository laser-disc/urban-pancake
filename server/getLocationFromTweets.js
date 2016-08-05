let allTweets = require('./updateTruckInfo').allTweets;
let addressValidator = require('address-validator');
let Address = addressValidator.Address;
let geoCoder = require('../client/utils/utils')
// var _ = require('underscore');

// var address = new Address({
//     street: possibleAddress,
//     city: 'San Francisco',
//     state: 'CA',
//     country: 'US'
// });

module.exports = {};
module.exports.chosenIndex = undefined;
module.exports.getLocation = function (allTweets){
  console.log("adfasdfasdfasdfsadf")
  return new Promise((resolve, reject) => {
    console.log("coming at you live from inside the .getLocation() promise");
    let results = {poi: null, address: null};
    let location, latLong;
    
    
    for(var i=0; i<allTweets.length; i++){
      location = atFromSubroutine(allTweets[i]);
      if(location){
        console.log("location found, about to send it to geoCoder");
        module.exports.chosenIndex=i;
        break;
      }  
    }
    console.log("chosenIndex", module.exports.chosenIndex);
    console.log("location", location);
    results.address = location;
    console.log("results before resolving in getLocationFromTweets", results);
    resolve(results);

    function atFromSubroutine (strTweet) {
      let arrTweet = strTweet.split(" ");
      let at = arrTweet.indexOf('at');
      let frm = arrTweet.indexOf('from');
      if ((at === -1) || (frm === -1)) {
        return null;
      } else {
        let location = arrTweet.slice((at+1), frm).join(' ');
        return location;
      };
    };
  })
};