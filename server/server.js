const express = require('express'),
  app = express(),
  router = express.Router(),
  http = require('http').Server(app),
  request = require('request'),
  bodyParser = require('body-parser'),
  path = require('path');

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

app.listen(process.env.PORT || 8000, function(){
  console.log('App listening on port 8000');
});

module.exports = app;
