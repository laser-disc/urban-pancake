const mongoose = require('mongoose');
const app = require('../../server/server');
const express = require('express')
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const db = require('../../db/config');
const Tweet = require('../../db/tweetSchema.js');
 
describe('Creating a new truck document', function(){
  it('should create brand-new truck documents', function(){
    let timestamp = Date.now();
    let truck = new Tweet(
      {
        name: "Test Truck",
        handle: '@testTruck', 
        message: "Test Message Here",
        timestamp:timestamp,
        imageUrl: "http://truckimage.com"
      });
    truck.save();
    Tweet.findOne({name: "Test Truck"}, function(err, truck){
      truck.name.should.equal("Test Truck");
      truck.handle.should.equal('@testTruck');
      truck.message.should.equal('Test Message Here');
      truck.timestamp.should.equal(timestamp);
      truck.imageUrl.should.equal("http://truckimage.com");

    })
  });
  it('should update existing truck documents', function(){});
  it('should only have 1 document per truck', function(){});
  it('should only have 1 location tweet per truck', function(){})

})
describe('Retrieving tweets from DB', function() {
  //  before(function() {
  //   for (var i in mongoose.connection.collections) {
  //     mongoose.connection.collections[i].remove(function() {});
  //   }
  // });

  it('should respond with 200 if given a truck handle', function(done) {
    let url = '/API/fetch';
    let params = {
        params: {
          handle: '@curryupnow'
        }
      };
    request(app)
      .get('/API/fetch')
      .send(params)
      .expect(200, done);
  });

  describe('should respond with a tweet for a given truck handle', function(){
      let url = '/API/fetch';
      let params = {
        params: {
          handle: '@curryupnow'
        }
      };

    it('should have a name', function(done){
       request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let name = JSON.parse(res.text).name;
          should.exist(name);
        })
        .expect(200, done)
    });

    it('Should have the correct handle', function(done){
      request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let handle = JSON.parse(res.text).handle;
          handle.should.equal(params.params.handle);
        })
        .expect(200, done)
    });

    it('should have a message', function(done){
      request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let message = JSON.parse(res.text).message;
          let messageType = typeof message
          should.exist(message);
          messageType.should.equal("string");
        })
        .expect(200, done)
    });

    it('should have a timestamp', function(done){
       request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let timestamp = JSON.parse(res.text).timestamp;
          should.exist(timestamp);
        })
        .expect(200, done)
    });

    it('should have an image', function(done){
         request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let timestamp = JSON.parse(res.text).imageUrl;
          should.exist(imageUrl);
        })
        .expect(200, done)
    });
    
  })
});
