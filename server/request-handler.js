'use strict'
// TODO NEED TO SCRAPE PARTICIPATING TRUCKS FROM FOODEVENT TWITTER FEEDS
// LOCATIONS ARE NOTED TRUCKSCHEDULES.JS IN UTILS

// ---------------------- EXTREME CAUTION IF LINTING THIS PAGE. APP WILL BREAK --------------------

const db = require('../db/config');
const mongoose = require('mongoose');
const https = require('https')
const Truck = require('../db/truckSchema');
const Event = require('../db/eventsSchema');
const { getLocation } = require('./getLocationFromTweets');
const { createTruckWithGeoInfo } = require('./updateTruckInfo');
const { getTruckTwitterInfo } = require('./updateTruckInfo');
const { createEventRecord, getEventTwitterInfo, createOrUpdateEvent } = require('./updateEventInfo');
const { createOrUpdateDB } = require('./updateTruckInfo');
const { geoCoder } = require('../utils/utils');
const { getYelpInfo } = require('./updateTruckInfo');
const { getFiveTweets } = require('./updateTruckInfo');
const { updateDBwithYelpInfo } = require('./updateTruckInfo');


// make sure to add the exact Twitter handle minus the @
const foodTrucks = ['JapaCurry', 'CurryUpNow', 'chairmantruck', 'slidershacksf', 'KokioRepublic'];
const foodEvents = ['gloungesf', 'SPARKsocialSF', 'SoMaStrEatFood'];
// Don't try to get Twitter info from these trucks - you will FAIL
// badFoodTrucks equalz ['senorsisig'];

const foodTrucksObj = {
  JapaCurry: { twitterHandle: 'JapaCurry', yelpBizID: 'japacurry-truck-san-francisco'},
  CurryUpNow: { twitterHandle: 'CurryUpNow', yelpBizID: 'curry-up-now-san-francisco'},
  chairmantruck: { twitterHandle: 'chairmantruck', yelpBizID: 'the-chairman-truck-san-francisco'},
  slidershacksf: { twitterHandle: 'slidershacksf', yelpBizID: 'slider-shack-san-francisco'},
  KokioRepublic: { twitterHandle: 'KokioRepublic', yelpBizID: 'kokio-republic-san-francisco'},
};

// iterates over an array of food truck event Twitter handles
foodEvents.forEach(event => {
  getEventTwitterInfo(event)
  // from the most recent tweet, we compile the info for our DB record
  .then(eventObj => createEventRecord(eventObj))
  // either adds the info from createEventRecord to the DB or updates this existing info
  .then(eventObj => createOrUpdateEvent(eventObj))
  .catch(err => console.log("ERRRR", err));
});

foodTrucks.forEach(foodTruck => {
  return getTruckTwitterInfo(foodTruck)
  .then(newTruckObj => getLocation(newTruckObj))
  .then(newTruckObj => geoCoder(newTruckObj))
  .then(newTruckObj => createTruckWithGeoInfo(newTruckObj))
  .then(newTruckObj => {
    newTruckObj.yelpBizID = foodTrucksObj[foodTruck].yelpBizID;
    return getYelpInfo(newTruckObj);
  })
  .then(newTruckObj => createOrUpdateDB(newTruckObj))
  .catch(err => res.status(400).send(err));
});

module.exports = (app) => {
  app.get('/API/fetchAll', (req, res) => {
    Truck.find((err, trucks) => res.status(200).send(trucks));
  });
  app.get('/API/fetchAll', (req, res) => {
    Event.find((err, allEvents) => res.status(200).send(allEvents));
  });

  app.get('/API/fetch', (req, res) => {
    // handle must be different for test and client
    const handle = req.body.params ? req.body.params.handle : req.query.handle;
    Truck.findOne({ handle }, (err, truck) => res.status(200).send(truck));
  });

  app.get("/API/yelp", (req,res) => {
    let handle = '@' + req.query.truckName;
    Truck.findOne({ handle }, (err, truck) => res.status(200).send(truck))
    .catch( err => res.status(400).send(err))
  });
  app.get("/API/fiveTweets", (req,res) => {
   getTruckTwitterInfo(req.query.truckName)
   .then( newTruckObj => {
     newTruckObj.fiveTweetObjs = [];
     return getFiveTweets(newTruckObj, newTruckObj.allTweetObjs[0].id_str)
   })
   .then( newTruckObj => getFiveTweets(newTruckObj, newTruckObj.allTweetObjs[1].id_str))
   .then( newTruckObj => getFiveTweets(newTruckObj, newTruckObj.allTweetObjs[2].id_str))
   .then( newTruckObj => getFiveTweets(newTruckObj, newTruckObj.allTweetObjs[3].id_str))
   .then( newTruckObj => getFiveTweets(newTruckObj, newTruckObj.allTweetObjs[4].id_str))
   .then(truckInfo => res.status(200).send(truckInfo))
   .catch(err => {
     console.log("request-handler API/fiveTweets unsuccessful");
     res.status(400).send(err);
   })
 });
};
