let allTweets = require('./updateTruckInfo').allTweets;
let addressValidator = require('address-validator');
let Address = addressValidator.Address;

module.exports = {};

// list of street types according to https://data.sfgov.org/Geographic-Locations-and-Boundaries/Street-Names/6d9h-4u5v/data#column-menu
let streetTypes = ['aly','ave','blvd','blvd north','blvd south','cir',
  'ct','dr','expy','hl','hwy','ln','loop','park','path','pl','plz','ramp',
 'rd','row','st','stps','stwy','ter','tunl','walk','way'];

// sample input: "We are serving Lunch at 1st st and Howard st from 11:15-1:45." output: "1st st and Howard st"  
let atFromSubroutine = function(strTweet) {
  let arrTweet = strTweet.split(" ");
  let at = arrTweet.indexOf('at');
  let frm = arrTweet.indexOf('from');
  if ((at === -1) || (frm === -1)) {
    // return null;
    return "notFound";
  } else {
    let location = arrTweet.slice((at+1), frm).join(' ');
    console.log("atFromSubroutine", location);
    return location;
  };
};


let intersection = function(strTweet) {
  let words = strTweet.split(' and ');
  if(words[0]===strTweet) return 'notFound';
  let beforeStr = words[0].trim().split(' ');
  let afterStr = words[1].trim().split(' ');
  let firstStreet = beforeStr[beforeStr.length-1];
  let secondStreet = afterStr[0];
  for(let i=0; i<streetTypes.length; i++){
    if(streetTypes[i]===firstStreet){
      firstSteet = beforeStr[beforeStr.length-2] + ' '+ beforeStr[beforeStr.length-1];
      break;
    }
  }
  for(let i=0; i<streetTypes.length; i++){
    if(streetTypes[i]===secondStreet){
      secondSteet = afterStr[0] + ' '+ afterStr[1];
      break;
    }
  }
  // if(firstSteet ==="us" || firstStreet==="enter" || secondStreet==="us" || secondStreet==="enter"){
  //   return 'notFound';
  // }
  return firstStreet && secondStreet ? (firstStreet + ' and ' + secondStreet) : 'notFound';
};


// this function looks for an exact address. input: "Our trucks will be at 225 Bush" output: "225 Bush" 
let exactAddress = function (strTweet) {
  let wordAfterNum, punc, street, location, num;
  let words = strTweet.split(' ');
  for(let i=0; i<words.length; i++){
    //if we find a word that can be converted into a number
    if(Number(words[i]) > 0){
      num = words[i];
      //grab the word after the found number
      street = words[i+1];
      break;
    }
  }
  location = num + ' ' + street;
  console.log("exactAddress", location);
  return num && street ? location : "notFound";
}

module.exports.getLocation = function(newTruckObj) {
  let allTweets = newTruckObj.allTweetMessages;
  console.log("inside getLocation, just received "+allTweets.length+" tweets");
  return new Promise(function (resolve, reject) {
    let location, currentTweet, noPuncTweet;
    
    for(var i=0; i<allTweets.length; i++){
      currentTweet = (allTweets[i]);
      while(location===undefined){
        //location = intersection(currentTweet);
        location = atFromSubroutine(currentTweet);
      }
      if(location==="notFound"){
        location = exactAddress(currentTweet);
      }
      if(location==="notFound"){
        location = intersection(currentTweet);
      }
      // if location is notFound and we've gone through the entire array, reject the promise
      if(location ==="notFound" && i===allTweets.length-1){
        console.log("We have gone though all the tweets and could not find the current location.  getLocation rejected for ", newTruckObj.name);
        reject(newTruckObj);
      }
      // if location is notFound but there are still tweets left in the array, reassign location to undefined then continue on to the next iteration
      if(location==="notFound") {
        location = undefined;
        continue;
      }
      // if location is found, save the chosenIndex and location in the newTruckObj and then resolve the promise
      if(location !=="notFound"){
        newTruckObj.chosenIndex = i;
        newTruckObj.getLocationResults.address = location + ", San Francisco, CA";
        console.log("getLocation resolved ", newTruckObj.name);
        resolve(newTruckObj);
        break;
      }
    }
  });
};