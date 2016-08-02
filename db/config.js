'use strict'
let secretKeys = null;
if(!process.env['MONGOOSE_URI']) {
  secretKeys = require('../env/config');
}
const mongoose = require('mongoose');

mongoose.connect(process.env['MONGOOSE_URI'] || secretKeys.MONGOOSE_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('in DB');
});


module.exports = db;
