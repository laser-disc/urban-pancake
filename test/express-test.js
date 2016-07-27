const expect = require('chai').expect;
const supertest = require('supertest');
const express = require('express');
const app = require('../server/server.js');


describe('confirm that the server runs properly', function () {
  
  // done is a Mocha callback that stops the server
  it('should connect to the local server', function (done) {
    // supertest starts server
    supertest(app)
      .get('/')
      .expect(200, done);
  });

  it('should throw an error when a requested URL does not exist', function (done) {
    supertest(app)
      .get('/foo/bar')
      .expect(404, done);
  });

});