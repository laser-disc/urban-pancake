var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/../dist'));
app.use(bodyParser.json());

app.get('/', function(req, res){
 res.sendFile(__dirname +'/../dist/index.html');
 console.log("connecting to root...");
});

http.listen(process.env.PORT || 8000, function(){
  console.log('App listening on port 8000');
});