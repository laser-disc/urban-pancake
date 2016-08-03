const chai = require('chai');
const request = require('supertest');
const express = require('express');
const app = require('../../server/server');
const expect = chai.expect;
const should = chai.should();


describe('Server requests', function(){
  it('should send 200 for a successful request', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  });
  it('should throw an error when a requested URL does not exist', function(done){
    request(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});


describe('Retrieving a Truck from DB', function() {
    let url = '/API/fetch';
    let params = {
        params: {
          handle: '@curryupnow'
        }
      };
    it('should respond with 200 if given a truck handle', function(done) {
      request(app)
        .get(url)
        .send(params)
        .expect(200, done);
    });

    xit('should have a name', function(done){
       request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let name = JSON.parse(res.text).name;
          should.exist(name);
        })
        .expect(200, done)
    });

    xit('Should have the correct handle', function(done){
      request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let handle = JSON.parse(res.text).handle;
          handle.should.equal(params.params.handle);
        })
        .expect(200, done)
    });

    xit('should have a message', function(done){
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

    xit('should have a timestamp', function(done){
       request(app)
        .get(url)
        .send(params)
        .expect(function(res){
          let timestamp = JSON.parse(res.text).timestamp;
          should.exist(timestamp);
        })
        .expect(200, done)
    });

    xit('should have an image', function(done){
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

describe('Retrieving all trucks from DB', function() {
  it('should send back 200 when requesting all trucks', function(done){
    request(app)
    .get('/API/fetchAll')
    .expect(200, done);
  })
  it('should send back an array', function(done){
    request(app)
    .get('/API/fetchAll')
    .expect(function(res){
      res.body.should.be.a('array')
    })
    .expect(200, done)
  })

})
