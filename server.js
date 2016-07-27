var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', function(req, res){
 res.sendFile(__dirname +'/index.html');
 console.log("connected");
});

http.listen(process.env.PORT || 8000, function(){
  console.log('App listening on port 8000');
});