const register = require('babel-register'),
  expect = require('chai').expect,
  supertest = require('supertest'),
  express = require('express'),
  app = require('../server/server');

register();


describe('confirming that the server is running', function(){
  // done is a Mocha callback that stops the server
  it('should make requests to the server', function(done){
    // this function starts the server
    supertest(app)
      .get('/')
      .expect(200, done);
  });
});

describe('confirming that nonexistent routes throw errors', function(){
  it('should throw an error when a requested URL does not exist', function(done){
    supertest(app)
      .get('/foo/bar')
      .expect(404, done);
  });
});