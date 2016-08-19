const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOOSE_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('in DB');
});


module.exports = db;
