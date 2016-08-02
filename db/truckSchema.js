const db = require('./config');
const mongoose = require('mongoose');


const truckSchema = new mongoose.Schema({
  handle: String,
  message: String
});

let Truck = mongoose.model('Truck', truckSchema);


module.exports = Truck;
