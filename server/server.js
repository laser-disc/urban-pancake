const express = require('express'),
  app = express(),
  router = express.Router(),
  http = require('http').Server(app),
  request = require('request'),
  bodyParser = require('body-parser'),
  path = require('path'),
  mongoose = require('mongoose');


  console.log('!!!!!!!!!!!!!!!! inside server.js !!!!!!!!!!!!!!!!!!!!!');

if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    webpack = require("webpack"),
    config = require('./../webpack.dev.config'),
    compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }))
  app.use(webpackHotMiddleware(compiler, {log: console.log}));
} else {
  app.use(express.static(__dirname + '/../dist'));
}

app.use(bodyParser.json());
app.use(router);

router.get('/',function(req, res){
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
  console.log("connecting to root...");
});



console.log('******************** FROM DB FILE **********************');
// username: georgejweiler@gmail.com
// password: 246810Aa!

mongoose.connect('mongodb://laserdisc:urbanpancake1!@ds031925.mlab.com:31925/urbanpancake');

const db = mongoose.connection;
// db.on('error', console.log('There was an error connecting to mongoose'));
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('in DB', db);
});
//
// const kittySchema = new mongoose.Schema({
//   name: String
// });
//
// let Kitten = mongoose.model('Kitten', kittySchema);
//
// let silence = new Kitten({name: 'Silence'});
// console.log(silence.name);
//
// silence.save(function(err, silence) {
//   if(err) {
//     return console.error(err);
//   }
//   console.dir(silence);
// });
//
// let whiskers = new Kitten({name: 'Whiskers'});
// console.log(whiskers.name);
//
// whiskers.save(function(err, whiskers) {
//   if(err) {
//     return console.error(err);
//   }
//   console.dir(whiskers);
// });

const abcSchema = new mongoose.Schema({
  name: String,
  bark: Boolean
});

let QAZXSW = mongoose.model('QAZXSW', abcSchema);

let letters = new QAZXSW({name: 'Barky', bark: true});
console.log(letters.name);

letters.save(function(err, letters) {
  if(err) {
    return console.error(err);
  }
  console.dir(letters);
});

//
// const puppySchema = new mongoose.Schema({
//   name: String,
//   bark: Boolean
// });
//
// let Puppy = mongoose.model('Puppy', puppySchema);
//
// let barky = new Puppy({name: 'Barky', bark: true});
// console.log(barky.name);
//
// barky.save(function(err, barky) {
//   if(err) {
//     return console.error(err);
//   }
//   console.dir(barky);
// });
// console.log("entering find func.....")
// Kitten.find({name: 'Silence'}, function(err, kittens) {
// console.dir("inside the find func")
//   if(err) {
//     return console.error(err);
//   }
//   console.dir(kittens);
// });

app.listen(process.env.PORT || 8000, function(){
  console.log('App listening on port 8000');
});
