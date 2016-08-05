let allTweets = require('./updateTruckInfo').allTweets;
let addressValidator = require('address-validator');
let Address = addressValidator.Address;
let geoCoder = require('../client/utils/utils')

module.exports = {};
module.exports.chosenIndex = undefined;

module.exports.getLocation = function (allTweets){
  console.log("inside getLocation, just received "+allTweets.length+" tweets");
  return new Promise((resolve, reject) => {
    let results = {poi: null, address: null};
    let location, latLong, currentTweet, noPuncTweet;
    
    for(var i=0; i<allTweets.length; i++){
      currentTweet = (allTweets[i]);
      console.log("inside the getLocation for loop current Tweet ", currentTweet);

      noPuncTweet = removePunctuation(currentTweet);
      location = atFromSubroutine(noPuncTweet);
      if(location){
        module.exports.chosenIndex=i;
        break;
      }  
    }
    results.address = location;
    // resolve(results);

    if (results.poi || results.address) {
      console.log("getLocationFromTweets resolving results", results);
      resolve(results)
    } else {
      console.log("getLocationFromTweets rejecting results", results);
      reject(results);
    };

    function removePunctuation (strTweet) {
      // Removes the punctuation from the current tweet so that it's easier to parse
      let removePunc = currentTweet.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      let noPuncTweet = removePunc.replace(/\s{2,}/g," ");
      return noPuncTweet;
    }

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