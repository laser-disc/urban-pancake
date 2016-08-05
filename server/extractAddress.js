// let allTweets = require('./updateTruckInfo').allTweets;
// let addressValidator = require('address-validator');
// let Address = addressValidator.Address;
// const geocoder = require('../client/utils/utils');
// const atFromSubroutine = require('../client/utils/locationSubroutines').atFromSubroutine;

// /* extractAddress takes an array of messages from a particular truck and searches through them to find the most recent tweet with location data.
// It returns an object containing a location string (such as "2nd and Mission") and the index number of the tweet.
// */

// const extractAddress = function(truckMessagesArray) {
//   let finalTweetObj = {loc: undefined, currentTweetIdx: undefined};
	
// 	for (var i = 0; i < truckMessagesArray.length; i++) {
// 		let currentTweet = truckMessagesArray[i];
//     // Removes the punctuation from the current tweet so that it's easier to parse
//     let removePunc = currentTweet.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
//     let noPuncTweet = removePunc.replace(/\s{2,}/g," ");
// 		let location, algorithmTest;

//     // All of these subroutines are either returning a location or 'unknown'
//     // Each case should check if that subroutine produces a value. if yes, it should run it through geocoder

// 		algorithmTest = atFromSubroutine(noPuncTweet);
// 		if (algorithmTest !== 'unknown') {
// 			location = geocoder({poi: null, address: algorithmTest});
// 			if (location !== null) {
// 				finalTweetObj.loc = location;
//       	finalTweetObj.currentTweetIdx = i;
// 				break;
// 			};
// 		} else {
// 			continue;
// 		};
// 	};

// // After it looks through the entire array of tweets (worst case scenario), it returns finalTweetObj if the search was successful and 'Not found' if none of the tweets were found to be "location tweets"
// 	if (finalTweetObj.loc !== undefined) {
// 		return finalTweetObj;
// 	} else {
// 		return 'Not found';
// 	};
// };

// module.exports = extractAddress;