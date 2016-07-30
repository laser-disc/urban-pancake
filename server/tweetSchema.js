const db = require('../db/config');
const mongoose = require('mongoose');


const tweetSchema = new mongoose.Schema({
  handle: String,
  message: String
});

let Tweet = mongoose.model('Tweet', tweetSchema);


module.exports = Tweet;
