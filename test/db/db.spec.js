const db = require('../../db/config');
const mongoose = require('mongoose');
const Truck = require('../../db/truckSchema');
const app = require('../../server/server');
const express = require('express')
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const secretKeys = require('../../env/config');
const createTruckWithTwitterInfo = require('../../server/updateTruckInfo').createTruckWithTwitterInfo;
const createOrUpdateDB = require('../../server/updateTruckInfo').createOrUpdateDB;
const allTweets = require('../../server/updateTruckInfo').allTweets;
const getLocationFromTweets = require('../../server/getLocationFromTweets');
const clearDB = require('mocha-mongoose')(secretKeys.MONGOOSE_URI);

// General DataBase Functionality
let testDoc = mongoose.model('Test Document', new mongoose.Schema({text: String, number: Number }))
describe("DB Documents", function() { 
  it("can be saved without error", function(done) {
    new testDoc({a: 1}).save();
    done();
  });
  it("can be queried", function(done) {
    new testDoc({text: "Query", number: 1}).save(function(){
      testDoc.findOne({text: "Query"}, function(err, doc){
        expect(doc.text).to.not.equal(null);
        expect(doc.text).to.equal("Query")
        doc.remove(done);
      });
    });
  });
});

describe("Truck Collection", function() { 
  it('Should store many different trucks', function(done){
    new Truck({handle: '@foodTruck'}).save(function(){
      new Truck({handle: '@foodTruck2'}).save(function(){
        Truck.find({}, function(err, trucks){
          expect(trucks).to.have.length(2);
          done();
        });
      });
    });
  });
  it('Should only store one tweet per truck', function(done){
    createTruckWithTwitterInfo('kogibbq').then(function(truck){
      createOrUpdateDB(truck).then(function(trucks){
        createTruckWithTwitterInfo('kogibbq').then(function(truck){
          createOrUpdateDB(truck).then(function(truck){
            Truck.find({handle: '@kogibbq'}, function(err, trucks){
              expect(trucks).to.have.length(1);
              done();
            });
          });
        });
      });
    });
  });
});

describe("getLocationFromTwitter", function(){
  it("should accept an array as the argument", function(done){
    expect(Array.isArray(allTweets)).to.equal(true);
    done();
  });
  it("should return an object", function(done){
    let temp = getLocationFromTweets(["foo","bar","baz"]);
    expect(typeof temp).to.equal("object");
    done();
  });
  it("should return an object with a foundLocation property", function(done){
    let temp = getLocationFromTweets(["foo","bar","baz"]);
    let keys = Object.keys(temp);
    expect(keys.includes('foundLocation')).to.equal(true);
    done();
  });
  it("should return an object with a chosenTweet property", function(done){
    let temp = getLocationFromTweets(["foo","bar","baz"]);
    let keys = Object.keys(temp);
    expect(keys.includes('chosenTweet')).to.equal(true);
    done();
  });
});
describe("the getLocationFromTwitter foundLocation property", function(){
  it("should be a string", function(done){
    let temp = getLocationFromTweets(["foo","bar","baz"]);
    expect(typeof temp.foundLocation).to.equal('string');
    done();
  });
});
describe("the getLocationFromTwitter chosenTweet property", function(){
  it("should be an object", function(done){
    let temp = getLocationFromTweets(["foo","bar","baz"]);
    expect(typeof temp.chosenTweet).to.equal('object');
    done();
  });
});

xdescribe("fullAddressGiven sub-function", function(){
  it("should return a street address", function(done){
    let fakeTweet1 = "come by for lunch at 2 Mission st bring your dog";
    let fakeTweet2 = "come by for lunch at 2 Mission street bring your dog";
    let fakeTweet3 = "come by for lunch at 2 Mission Ave bring your dog";
    let fakeTweet4 = "come by for lunch at 2 Mission Avenue bring your dog";
    let fakeTweet5 = "come by for lunch at 2 Mission Road bring your dog";
    let fakeTweet6 = "come by for lunch at 2 Mission rd bring your dog";
    let fakeTweet7 = "come by for lunch at 2 Mission court bring your dog"; 
    let fakeTweet8 = "come by for lunch at 2 Mission ct bring your dog";
    let fakeTweet9 = "come by for lunch at 2 Mission aly bring your dog";
    let fakeTweet10 = "come by for lunch at 2 Mission alley bring your dog"; 
    let fakeTweet11 = "come by for lunch at 2 Mission ter bring your dog"; 
    let fakeTweet12 = "come by for lunch at 2 Mission terrace bring your dog"; 
  });

});
  // addressGiven
  // intersectionGiven





