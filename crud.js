'use strict';

//dependencies 
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var {db,mongoose} = require('./db.js');
var {Skills, User, Organization} = require('./Models.js');

//Initilization
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var commands = {
	add: (skills)=>{
		return skills.join(", ")
	},
	skills: ()=>{
		return 'none'
	}
}


app.get('/',(req,res)=>{
	res.sendFile('/root/slack-talint/index.html')
})


app.post('/', (req,res)=>{
	console.log('incomming request...')
	var [cmd, ...args]  = req.body.text.split(" ");
	if(commands[cmd]){
		res.send(commands[cmd](args));
	}else{
		res.send('100 years of errors');
	}
})


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
	console.log('listening on port 80')
	app.listen(80);
});
