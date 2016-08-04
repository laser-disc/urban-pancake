'use strict'

const db = require('../db/config');
const mongoose = require('mongoose');
let secretKeys = null;
const https = require('https')
const Truck = require('../db/truckSchema');
const updateTruckInfo = require('./updateTruckInfo');

if(!process.env['MONGOOSE_URI']) {
secretKeys = require('../env/config');
}

updateTruckInfo.foodTrucks.forEach( (foodTruck) => {
  updateTruckInfo.createTruckWithTwitterInfo(foodTruck)
  .then(function(truck) {
    updateTruckInfo.createOrUpdateDB(truck);
  });
});

module.exports = function(app) {
  app.get("/API/fetchAll", function(req,res){
    Truck.find(function(err, trucks){
      res.status(200).send(trucks);
    });
  });
  app.get("/API/fetch", function(req,res){
    //handle must be different for test and client
    let handle = req.body.params ? req.body.params.handle : req.query.handle;

    Truck.findOne({handle: handle}, function(err, truck){
        res.status(200).send(truck);
    })
  })
  app.get("/API/geocoder", function(req,res){
    var intersection = encodeURIComponent(req.query.intersection)
    let gMapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + intersection +"&key=" + GMAP_API_KEY;
    https.get(gMapUrl, function(response){
      let data = '';
      response.on('data', (chunk)=> data+=chunk)
      response.on('end', ()=> res.send(JSON.parse(data).results[0].geometry.location))
    })
  })
}