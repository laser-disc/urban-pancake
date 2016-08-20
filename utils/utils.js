const axios = require('axios');

const GMAP_API_KEY = process.env.GMAP_API_KEY;

module.exports = {};
module.exports.geoCoder = (newTruckObj, day) => {
  return new Promise(function(resolve, reject) {
    let query = newTruckObj.getLocationResults.address || newTruckObj.getLocationResults.poi;
    let gMapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GMAP_API_KEY}`;
    axios.get(gMapUrl)
    .then(function(response) {
      newTruckObj.geoInfo = response.data.results[0].geometry.location;
      resolve(newTruckObj);
    })
    .catch(function(error) {
      if(error){
        reject(error);
      }
    });
  });
};

module.exports.newTruckGeoCoder = (newTruckObj, dayLocation) => {
  return new Promise(function(resolve, reject) {
    if(dayLocation==="closed"){
      newTruckObj.truck.schedule.push({ lat: 0, lng: 0, closed: true });
      resolve(newTruckObj);
    }
    let query = dayLocation;
    let gMapUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GMAP_API_KEY}`;
    axios.get(gMapUrl)
    .then(function(response) {
      // newTruckObj.geoInfo = response.data.results[0].geometry.location;
      let geoResponse = response.data.results[0].geometry.location;
      newTruckObj.truck.schedule.push({ lat: geoResponse.lat, lng: geoResponse.lng, closed: false });
      resolve(newTruckObj);
    })
    .catch(function(error) {
      if(error){
        console.log("newTruckGeoCoder error ", error);
        reject(error); 
      }
    });
  });
};
