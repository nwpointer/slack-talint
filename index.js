'use strict';

//dependencies 
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Initilization
var app = express();
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies


function slackResponce('url'){
	var postData = querystring.stringify({
	  'text' :  "It's 80 degrees right now."
	});

	var options = {
	  hostname: 'www.google.com',
	  port: 80,
	  path: '/upload',
	  method: 'POST',
	  headers: {
	    'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': postData.length
	  }
	};

	var req = http.request(options, function(res) {
	  console.log('STATUS: ' + res.statusCode);
	  console.log('HEADERS: ' + JSON.stringify(res.headers));
	  res.setEncoding('utf8');
	  res.on('data', function (chunk) {
	    console.log('BODY: ' + chunk);
	  });
	  res.on('end', function() {
	    console.log('No more data in response.')
	  })
	});

	req.on('error', function(e) {
	  console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(postData);
	req.end();
}


app.post('/', function(request, response){
	console.log('incomming request...')
 	console.log(request.body);      // your JSON

 	console.log(request.response_url);

});

app.listen(5000);