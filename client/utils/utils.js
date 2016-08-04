
const axios = require('axios');

module.exports = function(locQuery){
  if(locQuery.poi){
    return axios.get("/API/poi", {
      params: {
        poi: locQuery.poi
      }
    })
    .then(function(response){
      console.log(response.data.name)
      console.log(response.data.geometry.location)
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
      console.log(response.data)
      return response.data
    })
    .catch(function(error){
      if(error){
        console.log(error)
      }
    }); 
  }
};
