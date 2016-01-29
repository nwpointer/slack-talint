'use strict'; 
//dependencies 
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey = fs.readFileSync('/root/cert/talintslack.key');
var certificate = fs.readFileSync('/root/cert/talintslack.com.crt');

var {db,mongoose} = require('./db.js');
var {Skills, User, Organization, list, dump, newSkill, removeSkill, learnSkill, forgetSkill, listSkills, findUsersBySkill} = require('./Models.js');

//Initilization
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var commands = {
	add: (context, skill, res)=>{
		newSkill(context.team_id, skill, (msg)=>{ res.send(msg)})
	},
	remove: (context, skill, res)=>{
		removeSkill(context.team_id, skill, (msg)=>{ res.send(msg)})
	},
	learn:(context, skill, res)=>{
		learnSkill(context.team_id, context.user_name, skill, (msg)=>{ res.send(msg)})
	},
	forget:(context, skill, res)=>{
		forgetSkill(context.team_id, context.user_name, skill, (msg)=>{ res.send(msg)})
	},
	list: (context, skill, res)=>{
		listSkills(context.team_id, false, (msg)=>{ res.send(msg)})
	},
	// alias for list
	skills: (context, skill, res)=>{
		listSkills(context.team_id, false, (msg)=>{ res.send(msg)})
	},
	me: (context, args, res)=>{
		listSkills(context.team_id, context.user_name, (msg)=>{ res.send(msg)})
	},
	// alias for me
	profile: (context, args, res)=>{
		listSkills(context.team_id, context.user_name, (msg)=>{ res.send(msg)})
	},
	find: (context, skill, res)=>{
		findUsersBySkill(context.team_id, skill, (msg)=>{ res.send(msg) });
	}
}

app.get('/',(req,res)=>{
	res.sendFile('/root/slack-talint/index.html')
})

app.get('/register/:code',(req,res)=>{
	var args = req.params;
	// console.log();	
	res.send(JSON.stringify(args));
})

app.get('/9C98A45F7C2BD1A34431E1BDADEDE98D.txt', (req,res)=>{
	res.sendFile('/root/slack-talint/9C98A45F7C2BD1A34431E1BDADEDE98D.txt')
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

var certification = {
	key: privateKey, 
	cert: certificate, 
	ca:[
		fs.readFileSync('/root/cert/talintslack.com.ca1'),
		fs.readFileSync('/root/cert/talintslack.com.ca2'),
		fs.readFileSync('/root/cert/talintslack.com.ca3') 
	]
};
var httpServer = http.createServer(app);
var httpsServer = https.createServer(certification, app);


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
	console.log('listening on port 80')
	// app.listen(80);
	httpServer.listen(80);
	httpsServer.listen(443);
});
