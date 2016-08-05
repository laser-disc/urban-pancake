const db = require('./config');
const mongoose = require('mongoose');


const truckSchema = new mongoose.Schema({
  name: String,
  handle: String,
  description: String,
  message: String,
  timeStamp: String,
  imageUrl: String,
  location: {lat: Number, lng: Number}
});

let Truck = mongoose.model('Truck', truckSchema);


module.exports = Truck;
