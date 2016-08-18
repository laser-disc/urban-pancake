'use strict';
// TODO NEED TO SCRAPE PARTICIPATING TRUCKS FROM FOODEVENT TWITTER FEEDS
// LOCATIONS ARE NOTED TRUCKSCHEDULES.JS IN UTILS

// ---------------------- EXTREME CAUTION IF LINTING THIS PAGE. APP WILL BREAK --------------------

const db = require('../db/config');
const mongoose = require('mongoose');
const https = require('https');
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
const { getTenImages } = require('./updateTruckInfo');


// make sure to add the exact Twitter handle minus the @
const foodTrucks = ['JapaCurry', 'CurryUpNow', 'chairmantruck', 'slidershacksf', 'KokioRepublic',
  'WannaESF', 'eatmobowl', 'lcfoodtruck', /* 'redsauceballs', */ 'TacosElTuca', 'donpablotruck',
  'FiretrailPizza', 'torrakuramen', 'GyrosonWheels1', /* 'HongryKong', */ 'PhatThaiSF', 'KabobTrolley',
  'adamsgrubtruck', 'bowldacai', /* 'seoulonwheels',*/ 'RedRidingTruck', 'odangudon', 'nonoburger',
  /* 'NakedChorizo1', */ 'Mannajpt', 'SunriseDeli', 'bobchasf', /* 'nuchaempanadas', */ 'RockoSez',
  /* 'gojojosmojo', */ 'sporkandstix', 'LadySaigonSF',/* 'SaborSM',*/ 'Elcalamarsf', 'Jeepney_Guy',
  '_traderjims_', 'PainaSF', 'MarleysTreats4u', 'BaconBaconSF'];

const foodEvents = ['gloungesf', 'SPARKsocialSF', 'SoMaStrEatFood'];
// Don't try to get Twitter info from these trucks - you will FAIL
// badFoodTrucks equalz ['senorsisig'];

const allEventsObj = {
  gloungesf: { twitterHandle: 'gloungesf', yelpBizID: 'g-food-truck-lounge-san-francisco-4' },
  SPARKsocialSF: { twitterHandle: 'SPARKsocialSF', yelpBizID: 'spark-social-sf-san-francisco' },
  SoMaStrEatFood: { twitterHandle: 'SoMaStrEatFood', yelpBizID: 'soma-streat-food-park-san-francisco' }
};

const foodTrucksObj = {
  JapaCurry: { twitterHandle: 'JapaCurry', yelpBizID: 'japacurry-truck-san-francisco' },
  CurryUpNow: { twitterHandle: 'CurryUpNow', yelpBizID: 'curry-up-now-san-francisco' },
  chairmantruck: { twitterHandle: 'chairmantruck', yelpBizID: 'the-chairman-truck-san-francisco' },
  slidershacksf: { twitterHandle: 'slidershacksf', yelpBizID: 'slider-shack-san-francisco' },
  KokioRepublic: { twitterHandle: 'KokioRepublic', yelpBizID: 'kokio-republic-san-francisco' },
  WannaESF: { twitterHandle: 'WannaESF', yelpBizID: 'wanna-e-san-francisco' },
  eatmobowl: { twitterHandle: 'eatmobowl', yelpBizID: 'mobowl-mountain-view' },
  lcfoodtruck: { twitterHandle: 'lcfoodtruck', yelpBizID: 'liberty-cheesesteak-san-francisco' },
  // redsauceballs: { twitterHandle: 'redsauceballs', yelpBizID: 'red-sauce-meatballs-san-francisco-2' },
  TacosElTuca: { twitterHandle: 'TacosElTuca', yelpBizID: 'tacos-el-tuca-san-francisco' },
  donpablotruck: { twitterHandle: 'donpablotruck', yelpBizID: 'don-pablo-san-carlos' },
  FiretrailPizza: { twitterHandle: 'FiretrailPizza', yelpBizID: 'firetrail-pizza-san-francisco' },
  torrakuramen: { twitterHandle: 'torrakuramen', yelpBizID: 'torraku-ramen-san-francisco-2' },
  GyrosonWheels1: { twitterHandle: 'GyrosonWheels1', yelpBizID: 'gyros-on-wheels-san-francisco' },
  //  HongryKong: { twitterHandle: 'HongryKong', yelpBizID: 'hongry-kong-san-ramon-2' },
  PhatThaiSF: { twitterHandle: 'PhatThaiSF', yelpBizID: 'phat-thai-san-francisco-2' },
  KabobTrolley: { twitterHandle: 'KabobTrolley', yelpBizID: 'kaböb-trölley-san-francisco-4' },
  adamsgrubtruck: { twitterHandle: 'adamsgrubtruck', yelpBizID: 'adams-grub-truck-san-francisco-2' },
  bowldacai: { twitterHandle: 'bowldacai', yelpBizID: 'bowld-acai-san-francisco-2' },
  //  seoulonwheels: { twitterHandle: 'seoulonwheels', yelpBizID: 'seoul-on-wheels-san-francisco-4' },
  RedRidingTruck: { twitterHandle: 'RedRidingTruck', yelpBizID: 'little-red-riding-truck-san-francisco' },
  odangudon: { twitterHandle: 'odangudon', yelpBizID: 'odang-udon-san-francisco-3' },
  nonoburger: { twitterHandle: 'nonoburger', yelpBizID: 'no-no-burger-san-francisco' },
  // NakedChorizo1: { twitterHandle: 'NakedChorizo1', yelpBizID: 'naked-chorizo-san-francisco' },
  Mannajpt: { twitterHandle: 'Mannajpt', yelpBizID: 'manna-south-san-francisco' },
  SunriseDeli: { twitterHandle: 'SunriseDeli', yelpBizID: 'sunrise-deli-mobile-truck-san-francisco' },
  bobchasf: { twitterHandle: 'bobchasf', yelpBizID: 'bobcha-south-san-francisco' },
  // nuchaempanadas: { twitterHandle: 'nuchaempanadas', yelpBizID: 'nucha-empanadas-san-francisco' },
  RockoSez: { twitterHandle: 'RockoSez', yelpBizID: 'rockos-ice-cream-tacos-san-francisco' },
  // gojojosmojo: { twitterHandle: 'gojojosmojo', yelpBizID: 'go-jojo-mojo-san-francisco' },
  sporkandstix: { twitterHandle: 'sporkandstix', yelpBizID: 'spork-and-stix-south-san-francisco-ca' },
  LadySaigonSF: { twitterHandle: 'LadySaigonSF', yelpBizID: 'lady-saigon-san-francisco' },
  // SaborSM: { twitterHandle: 'SaborSM', yelpBizID: 'sabor-de-san-miguel-san-francisco' },
  Elcalamarsf: { twitterHandle: 'Elcalamarsf', yelpBizID: 'el-calamar-san-francisco-3' },
  Jeepney_Guy: { twitterHandle: 'Jeepney_Guy', yelpBizID: 'jeepney-guy-san-jose' },
  _traderjims_: { twitterHandle: '_traderjims_', yelpBizID: 'trader-jims-petaluma' },
  PainaSF: { twitterHandle: 'PainaSF', yelpBizID: 'paina-lounge-and-restaurant-san-francisco' },
  MarleysTreats4u: { twitterHandle: 'MarleysTreats4u', yelpBizID: 'marleys-treats-oakland-5' },
  BaconBaconSF: { twitterHandle: 'BaconBaconSF', yelpBizID: 'bacon-bacon-san-francisco-4' },

thetwitterHandleAgainForSomeReason: { twitterHandle: '', yelpBizID: '' },
};

// iterates over an array of food truck event Twitter handles
foodEvents.forEach(event => {
  getEventTwitterInfo(event)
  // from the most recent tweet, we compile the info for our DB record
  .then(eventObj => {
    return createEventRecord(eventObj)
  })
  // either adds the info from createEventRecord to the DB or updates this existing info
  .then(eventObj => {
    eventObj.info.yelpBizID = allEventsObj[event].yelpBizID;
    createOrUpdateEvent(eventObj)
  })
  .catch(err => console.log('ERRRR', err));
});

foodTrucks.forEach(foodTruck => {
  return getTruckTwitterInfo(foodTruck)
  .then(newTruckObj => getLocation(newTruckObj))
  .then(newTruckObj => geoCoder(newTruckObj))
  .then(newTruckObj => createTruckWithGeoInfo(newTruckObj))
  .then(newTruckObj => {
    newTruckObj.yelpBizID = foodTrucksObj[foodTruck].yelpBizID;
    return createOrUpdateDB(newTruckObj);
  })
  .catch(err => {
    console.log("Food truck promise chain error", err);
    res.status(400).send(err)
  });
});


module.exports = (app) => {
  
  app.get('/API/fetchAll', (req, res) => {
    console.log('INSIDE REQHAN', req)
    Truck.find((err, trucks) => res.status(200).send(trucks));
  });
  app.get('/API/fetchEvents', (req, res) => {
    Event.find((err, allEvents) => {
      res.status(200).send(allEvents);
    });
  });
  app.get("/API/fetchOneEvent", (req,res) => {
    let handle = '@' + req.query.name;
    Event.findOne({ handle }, (err, event) => res.status(200).send(event))
    .catch( err => res.status(400).send(err))
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
  app.get("/API/addTruck", (req,res) => {
    createOrUpdateDB(req.query.newTruck);
  });
  app.get("/API/fiveTweets", (req,res) => {
   getTruckTwitterInfo(req.query.truckName)
   .then( newTruckObj => {
     newTruckObj.fiveTweetObjs = [];
     return getFiveTweets(newTruckObj, newTruckObj.allTweetObjs[0].id_str)
   })
   .then(truckInfo => res.status(200).send(truckInfo))
   .catch(err => {
     console.log("request-handler API/fiveTweets unsuccessful");
     res.status(400).send(err);
   })
 });
};
