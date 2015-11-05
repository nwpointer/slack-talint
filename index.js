'use strict';

//dependencies 
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Initilization
var app = express();
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies



app.post('/', function(request, response){
	console.log('incomming request...')
  console.log(request.body);      // your JSON
  response.send(request.body);    // echo the result back
});

app.listen(5000);