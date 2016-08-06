const axios = require('axios');
let secretKeys = null;
if(!process.env['MONGOOSE_URI']) {
  secretKeys = require('../../env/config');
}
const GMAP_API_KEY = secretKeys.GMAP_API_KEY || process.env['GMAP_API_KEY'];

////// old code before I started to refactor into a regular ES6 Promise
module.exports = function(newTruckObj){

  return new Promise((resolve, reject) => {
    console.log("inside the GeoCoder, just received " + JSON.stringify(newTruckObj.getLocationResults));
    let query = newTruckObj.getLocationResults.address || newTruckObj.getLocationResults.poi;
    let gMapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + query +"&key=" + GMAP_API_KEY;
    axios.get(gMapUrl)
    .then(function(response){
      console.log("Inside GeoCoder response.data.results", response.data.results[0].geometry.location);
      newTruckObj.geoInfo = response.data.results[0].geometry.location;
      resolve(newTruckObj);
    })
    .catch(function(error){
      if(error){
        console.log("Inside GeoCoder .catch(error)", error);
        reject(error);
      }
    }); 
  });
};

// module.exports = function(locQuery){
//   return new Promise((resolve, reject) => {
//     console.log("inside the GeoCoder, just received " + JSON.stringify(locQuery));
//     let query = locQuery.address || locQuery.poi;
//     let gMapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + query +"&key=" + GMAP_API_KEY;
//     axios.get(gMapUrl)
//     .then(function(response){
//       console.log("Inside GeoCoder response.data.results", response.data.results);
//       resolve(response.data.results[0].geometry.location);
//     })
//     .catch(function(error){
//       if(error){
//         console.log("Inside GeoCoder .catch(error)", error);
//         reject(error);
//       }
//     }); 
//   });
// };


