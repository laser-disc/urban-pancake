
const axios = require('axios');

<<<<<<< d8add4079ce6014fa148358437297c81f7de42b9
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
=======
module.exports = function(locQuery){
  if(locQuery.poi){
    return axios.get("/API/poi", {
      params: {
        poi: locQuery.poi
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
  }
  if(locQuery.address){
    return axios.get("/API/address", {
      params: {
        intersection: locQuery.address
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
  }
};
>>>>>>> refactor[utils] remove console logs
