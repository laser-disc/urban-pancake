const db = require('../db/config');
const mongoose = require('mongoose');
const Truck = require('../db/truckSchema');
const Twitter = require('twitter');
const secretKeys = require('../env/config');

// PUT ALL THE GET REQUESTS IN HERE FROM SERVER TO TWITTER
module.exports = function(app) {
  const twitterClient = new Twitter(secretKeys.twitterInfo);
  let foodTrucks = ['senorsisig','curryupnow'];


//post tweets to DB
  //perform this function periodically
  foodTrucks.forEach((foodTruck) => {
    twitterClient.get('search/tweets', {q: foodTruck}, function(error, trucks, response){
      if(error) { return error;}
      if (!error) {
        let truck = new Truck({handle: `@${foodTruck}`, message: trucks.statuses[0].text});
        truck.save(function(err, truck) {
          if(err) {
            return console.error(err);
          }
        });
      }
    });
  });

  app.get("/API/fetchAll", function(req,res){
    Truck.find(function(err, trucks){
      res.status(200).send(trucks);
    })
  })

  app.get("/API/fetch", function(req,res){
    //handle must be different for test and client
    let handle = req.body.params ? req.body.params.handle : req.query.handle;

    Truck.findOne({handle: handle}, function(err, truck){
        res.status(200).send(truck);
    })
  })
}
