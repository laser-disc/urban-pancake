const axios = require('axios');
let secretKeys = null;
if(!process.env['MONGOOSE_URI']) {
  secretKeys = require('../../env/config');
}
const GMAP_API_KEY = secretKeys.GMAP_API_KEY || process.env['GMAP_API_KEY'];

module.exports = function(locQuery){
  let query = locQuery.address || locQuery.poi;
  let gMapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + query +"&key=" + GMAP_API_KEY;
  return axios.get(gMapUrl)
  .then(function(response){
    return response.data.results[0].geometry.location;
  })
  .catch(function(error){
    if(error){
      console.log(error)
    }
  }); 
};

