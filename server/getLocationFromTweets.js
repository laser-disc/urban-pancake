let allTweets = require('./updateTruckInfo').allTweets;
let addressValidator = require('address-validator');
let Address = addressValidator.Address;
let geoCoder = require('../client/utils/utils')

module.exports = {};
// module.exports.chosenIndex = undefined;

module.exports.getLocation = function (newTruckObj){
  let allTweets = newTruckObj.allTweetMessages;
  console.log("inside getLocation, just received "+allTweets.length+" tweets");
  return new Promise((resolve, reject) => {
    let location, currentTweet, noPuncTweet;
    
    for(var i=0; i<allTweets.length; i++){
      currentTweet = (allTweets[i]);
      noPuncTweet = removePunctuation(currentTweet);
      location = atFromSubroutine(noPuncTweet);
      if(location){
        newTruckObj.chosenIndex = i;
        newTruckObj.getLocationResults.address = location;
        break;
      }  
    }

    if (newTruckObj.getLocationResults.poi || newTruckObj.getLocationResults.address) {
      resolve(newTruckObj)
    } else {
      reject(newTruckObj);
    }

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