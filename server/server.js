const express = require('express'),
  webpack = require("webpack"),
  webpackDevMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require("webpack-hot-middleware")
  app = express(),
  router = express.Router(),
  http = require('http').Server(app),
  request = require('request'),
  bodyParser = require('body-parser'),
  path = require('path'),
  config = require('./../webpack.dev.config'),
  compiler = webpack(config);

app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json());
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))
app.use(router);
app.use(webpackHotMiddleware(compiler, {log: console.log}));

router.get('/',function(req, res){
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
  console.log("connecting to root...");
});

http.listen(process.env.PORT || 8000, function(){
  console.log('App listening on port 8000');
});
