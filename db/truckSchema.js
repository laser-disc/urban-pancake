const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  name: String,
  handle: String,
  description: String,
  message: String,
  timeStamp: String,
  imageUrl: String,
});

const Truck = mongoose.model('Truck', truckSchema);


module.exports = Truck;
