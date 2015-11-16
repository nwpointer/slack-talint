'use strict';

//dependencies 
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var {db,mongoose} = require('./db.js');
var {Skills, User, Organization, list, dump, newSkill, learnSkill, listSkills, findUsersBySkill} = require('./Models.js');

//Initilization
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var commands = {
	add: (context, skill, res)=>{
		newSkill(context.team_id, skill, (msg)=>{ res.send(msg)})
	},
	learn:(context, skill, res)=>{
		learnSkill(context.team_id, context.user_name, skill, (msg)=>{ res.send(msg)})
	},
	list: (context, skill, res)=>{
		listSkills(context.team_id, false, (msg)=>{ res.send(msg)})
	},
	me: (context, args, res)=>{
		listSkills(context.team_id, context.user_name, (msg)=>{ res.send(msg)})
	},
	find: (context, skill, res)=>{
		findUsersBySkill(context.team_id, skill, (msg)=>{ res.send(msg) });
	}
}

app.get('/',(req,res)=>{
	res.sendFile('/root/slack-talint/index.html')
})


app.post('/', (req,res)=>{
	console.log('incomming request...')
	var [cmd, ...args]  = req.body.text.split(" ");
	if(commands[cmd]){
		commands[cmd](req.body, args, res)
	}else{
		res.send('100 years of errors');
	}
})


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
	console.log('listening on port 80')
	app.listen(80);
});
