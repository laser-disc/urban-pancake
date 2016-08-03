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
    new Truck({handle: '@foodTruck'}).save(function(){
      new Truck({handle: '@foodTruck'}).save(function(){
        Truck.find({}, function(err, trucks){
          expect(trucks).to.have.length(1);
          done();
        });
      });
    });
  });
});