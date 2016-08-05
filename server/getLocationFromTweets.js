let allTweets = require('./updateTruckInfo').allTweets;
let addressValidator = require('address-validator');
let Address = addressValidator.Address;
let geoCoder = require('../client/utils/utils')

module.exports = {};
module.exports.chosenIndex = undefined;
module.exports.getLocation = function (allTweets){
  return new Promise((resolve, reject) => {
    let results = {poi: null, address: null};
    let location, latLong;
    
    for(var i=0; i<allTweets.length; i++){
      location = atFromSubroutine(allTweets[i]);
      if(location){
        module.exports.chosenIndex=i;
        break;
      }  
    }
    results.address = location;
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