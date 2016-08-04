'use strict'

const db = require('../db/config');
const mongoose = require('mongoose');
let secretKeys = null;
if(!process.env['MONGOOSE_URI']) {
  secretKeys = require('../env/config');
}
const GMAP_API_KEY = secretKeys.GMAP_API_KEY || process.env['GMAP_API_KEY']
const https = require('https')
const Truck = require('../db/truckSchema');
const updateTruckInfo = require('./updateTruckInfo');


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
  app.get("/API/address", function(req,res){
    var intersection = encodeURIComponent(req.query.intersection)
    let gMapUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + intersection +"&key=" + GMAP_API_KEY;
    https.get(gMapUrl, function(response){
      let data = '';
      response.on('data', (chunk)=> data+=chunk)
      response.on('end', ()=> res.send(JSON.parse(data).results[0].geometry.location))
    })
  })
  app.get("/API/poi", function(req,res){
    var poi = encodeURIComponent(req.query.poi)
    let gMapUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.7756, -122.4193&radius=5000&name=" + poi + "&key=" + GMAP_API_KEY;
    https.get(gMapUrl, function(response){
      let data = '';
      response.on('data', (chunk)=> data+=chunk)
      response.on('end', ()=> res.send(JSON.parse(data).results[0].geometry.location))
    })
  })
}