'use strict'

const db = require('../db/config');
const mongoose = require('mongoose');
const https = require('https')
const Truck = require('../db/truckSchema');
const updateTruckInfo = require('./updateTruckInfo');
const getLocationFromTweets = require('./getLocationFromTweets');
const getLocation = require('./getLocationFromTweets').getLocation;
const createTruckWithGeoInfo = require('./updateTruckInfo').createTruckWithGeoInfo;
const getTruckTwitterInfo = require('./updateTruckInfo').getTruckTwitterInfo;
const createOrUpdateDB = require('./updateTruckInfo').createOrUpdateDB;
const getYelpInfo = require('./updateTruckInfo').getYelpInfo;

// make sure to add the exact Twitter handle minus the @
const foodTrucks = ['JapaCurry', 'CurryUpNow', 'chairmantruck', 'slidershacksf', 'KokioRepublic','finsonthehoof', 'chowdermobile'];
const foodEvents = ['gloungesf', 'otgsf', 'SPARKsocialSF']; //TruckStopSF
// Don't try to get Twitter info from these trucks - you will FAIL
// badFoodTrucks equalz ['senorsisig'];

const foodTrucksObj = {
  JapaCurry: { twitterHandle: 'JapaCurry', yelpBizID: 'japacurry-truck-san-francisco'},
  CurryUpNow: { twitterHandle: 'CurryUpNow', yelpBizID: 'curry-up-now-san-francisco'},
  chairmantruck: { twitterHandle: 'chairmantruck', yelpBizID: 'the-chairman-truck-san-francisco'},
  slidershacksf: { twitterHandle: 'slidershacksf', yelpBizID: 'slider-shack-san-francisco'},
  KokioRepublic: { twitterHandle: 'KokioRepublic', yelpBizID: 'kokio-republic-san-francisco'} 
};

let geoCoder = require('../utils/utils').geoCoder;

foodTrucks.forEach((foodTruck) => {
  getTruckTwitterInfo(foodTruck)
  .then((newTruckObj) => {
    console.log("inside request-handler about to send "+ newTruckObj.allTweetMessages.length + " tweets to getLocation");
    return getLocation(newTruckObj);
  })
  .then((newTruckObj) => {
    console.log("inside request-handler about to send "+ JSON.stringify(newTruckObj.getLocationResults) + " to geoCoder");
    return geoCoder(newTruckObj);
  })
  .then((newTruckObj) => {
    console.log("inside request-handler about to send "+ JSON.stringify(newTruckObj.geoInfo) + " to createTruckWithGeoInfo");
    return createTruckWithGeoInfo(newTruckObj);
  })
  .then((newTruckObj) => {
    console.log("inside request-handler about to send "+ newTruckObj.name + "s info to createOrUpdateDB");
    return createOrUpdateDB(newTruckObj);
  })
  .catch((e) => {
    console.log('Truck ', e.name, " could not be located, so new info for this truck was not stored in the database");
  });
});

module.exports = (app) => {
  app.get("/API/fetchAll", (req,res) => {
    Truck.find(function(err, trucks) {
      res.status(200).send(trucks);
    });
  });
  app.get("/API/fetch", (req,res) => {
    //handle must be different for test and client
    let handle = req.body.params ? req.body.params.handle : req.query.handle;
    Truck.findOne({handle: handle}, (err, truck) => {
      res.status(200).send(truck);
    })
  });
  app.get("/API/yelp", (req,res) =>{
    let truckName = req.query.truckName;
    getYelpInfo(foodTrucksObj[truckName].yelpBizID)
    .then((truckInfo) => {
      console.log("request-handler API/yelp truckInfo", truckInfo);
      res.status(200).send(truckInfo);
    })
    .catch((e) =>{
      console.log('yelp info could not be updated');
    });
  });
};
