'use strict'

const db = require('../db/config');
const mongoose = require('mongoose');
const https = require('https')
const Truck = require('../db/truckSchema');
const updateTruckInfo = require('./updateTruckInfo');
const getLocationFromTweets = require('./getLocationFromTweets');
const getLocation = require('./getLocationFromTweets').getLocation;
const createTruckWithGeoInfo = require('./updateTruckInfo').createTruckWithGeoInfo;
const createOrUpdateDB = require('./updateTruckInfo').createOrUpdateDB;

let geoCoder = require('../client/utils/utils');

updateTruckInfo.foodTrucks.forEach( (foodTruck) => {
  updateTruckInfo.createTruckWithTwitterInfo(foodTruck)
  .then(function(allTweets){
    console.log("inside request-handler about to send "+ allTweets.length + " tweets to getLocation");
    return getLocation(allTweets);
  })
  .then(function(results){
    console.log("inside request-handler about to send "+ JSON.stringify(results) + " to geoCoder");
    return geoCoder(results);
  })
  .then(function(geoInfo){
    console.log("inside request-handler about to send "+ JSON.stringify(geoInfo) + " to createTruckWithGeoInfo");
    return createTruckWithGeoInfo(geoInfo);
  })
  .then(function(truck) {
    console.log("inside request-handler about to send "+ truck.name + "s info to createOrUpdateDB");
    return createOrUpdateDB(truck);
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
  });
};
