const eventInfo = require('../../server/updateEventInfo.js');
const chai = require('chai');
const request = require('supertest');

//TODO: complete testing

const fakeEventObj = {
  twitterHandle: null,
  fullTweets: null,
  allMessages: null,
  chosenIndex: null,
  info: null,
};

describe('eventInfo', () => {

  describe('getEventTwitterInfo')
    //should take in a string (from an array)
    // should make an api call to twitter and receive back a variable called tweets
    //should return an object that looks like fakeEventObj but has values in it (except info)

  describe('grabHandles')
    // takes in a string (a tweet)
    // returns an array of strings

  describe('grabTodaysTrucks')
    // takes in fakeEventObj
    // confirms that the timestamp on a tweet object (from twitter's API) has the same date as today
    // returns an array
    // returns an empty array if the test fails

  describe('createEventRecord')
    // takes in fakeEventObj
    // creates a new entry in the database with info built from a raw tweet

  describe('createOrUpdateEvent')
    // takes in fakeEventObj
    // if that item is not currently in the db, it creates it
    // if that item already exists, it updates certain properties on it (check record from previous test)

  // delete the information in this collection so that it has 0 entries
  
});
