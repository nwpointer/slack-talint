'use strict';


//dependencies 
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var {db,mongoose} = require('./db.js');
var {Skills, User, Organization} = require('./Models.js');

//Initilization
var app = express();
app.use(bodyParser.urlencoded({extended: true})); // to support URL-encoded bodies


app.get('/', function(req,res){
	console.log('incomming request...')
	res.send("hello world");
})


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	app.listen(8000);
});