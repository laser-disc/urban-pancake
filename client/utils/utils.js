
const axios = require('axios');

module.exports.geocoder = function(intersection){
  return axios.get("/API/geocoder", {
    params: {
      intersection: intersection
    }
  })
  .then(function(response){
    return response.data
  })
  .catch(function(error){
    if(error){
      console.log(error)
    }
  }); 
};