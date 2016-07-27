const express = require('express'),
  webpack = require("webpack"),
  webpackDevMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require("webpack-hot-middleware")
  app = express(),
  router = express.Router(),
  http = require('http').Server(app),
  request = require('request'),
  bodyParser = require('body-parser'),
  path = require('path');

  app.use(express.static(__dirname + '/../dist'));
  app.use(bodyParser.json());


// app.get('/', function(req, res){
//  res.sendFile(__dirname +'/../dist/index.html');
//  console.log("connecting to root...");
// });

const config = require('./../webpack.dev.config');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {colors: true}
}))

app.use(webpackHotMiddleware(compiler, {log: console.log}));


router.get('/',function(req, res){
  res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
  console.log("connecting to root...");
});

app.use(router);

http.listen(process.env.PORT || 8000, function(){
  console.log('App listening on port 8000');
});