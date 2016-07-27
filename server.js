var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var bodyParser = require('body-parser');
// var io = require('socket.io')(http);


app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/', function(req, res){
 res.sendFile(__dirname +'/index.html');
 console.log("connected");
});



// io.on('connection', function(socket){
//   console.log("We are connected");
// });

//Initializing http on io makes it so its listening on this port
http.listen(process.env.PORT || 8000, function(){
  console.log('App listening on port 8000');
});