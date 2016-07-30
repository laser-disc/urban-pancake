// const mongoose = require('mongoose');
//
// console.log('******************** FROM DB FILE **********************');
// // username: georgejweiler@gmail.com
// // password: 246810Aa!
//
// mongoose.connect('mongodb://georgejweiler@gmail.com:246810Aa!
//   @ds031925.mlab.com:31925/urbanpancake
// ')
//
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('in DB');
// })
//
// const kittySchema = mongoose.schema({
//   name: String
// });
//
//
// let Kitten = mongoose.model('Kitten', kittySchema);
//
// let silence = new Kitten({name: 'Silence'});
// console.log(silence.name);
//
//
//
// module.exports = mongoose;
