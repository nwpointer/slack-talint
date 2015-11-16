'use strict';

var DBHOST = 'localhost'
var DBNAME = 'mongooseTest'

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+DBHOST+'/'+DBNAME);
var db = mongoose.connection;

var {Skills, User, Organization, list, dump, newSkill, learnSkill, listSkills} = require('./Models.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
	console.log('db opened')
	console.log('...')

	// var status = (err,res)=>{
	// 	console.log(err,res)
	// }

	// function list(model, cb){
	// 	cb = cb || status;
	// 	model.find({}, cb)
	// }

	// function dump(model, cb){
	// 	cb = cb || status;
	// 	model.remove({}, cb);
	// }



	// function newSkill(slackGroup, name){
	// 	var skill = new Skills({slackGroup, name})
	// 	skill.save((err,res)=>{
	// 		if(err){
	// 			if(err.code == 11000){
	// 				console.log(name + ' has allready been added');
	// 			}
	// 		}else{
	// 			console.log(name + ' added successfully');
	// 		}
	// 	})
	// }

	// function learnSkill(slackGroup, slackUser, name){
	// 	Skills.findOne({slackGroup, name}, (err, res)=>{
	// 		if(err){
	// 			console.log('something weird has happend')
	// 		}else{
	// 			if(!res){
	// 				console.log(res);
	// 				console.log('that skill has not been added to the list of skills yet')
	// 				// would you like me to add it?
	// 			}else{
	// 				console.log('ok found it');
	// 				// add skill to users[]
	// 				if (res.users.indexOf(slackUser) > -1){
	// 					console.log("user allready knows this skill")
	// 				}else{
	// 					res.users.push(slackUser);
	// 					res.save(status);
	// 					console.log('user has learned' + name);
	// 				}
	// 			}
	// 		}
	// 	})
	// }

	// function listSkills(slackGroup, users){
	// 	users = users || null;
	// 	Skills.find({slackGroup, users}, (err, res)=>{
	// 		if(err){
	// 			console.log('something weird has happend')
	// 		}else{
	// 			if(res.length == 0){
	// 				console.log('no skills found');
	// 			}else{
	// 				console.log(res.map((v)=>{
	// 					return v.name
	// 				}).join(", "));	
	// 			}
				
	// 		}
	// 	});
	// }



	// function rememberUser(slackGroup, slackUser){
	// 	Organization.findOne({slackGroup}, (err, res)=>{
	// 		if(err){
	// 			console.log(err);
	// 		}else{
	// 			console.log('creating user...');
	// 		}
	// 	})
	// }


	// list(Skills);
	// dump(Skills);


	// listSkills("RSgTe74N34s07U8HWZk4CYeF", false, console.log);
	// listSkills("RSgTe74N34s07U8HWZk4CYeF", '4');

	// learnSkill("RSgTe74N34s07U8HWZk4CYeF", '4', 'art', console.log)

	// list(Skills);

	// newSkill("RSgTe74N34s07U8HWZk4CYeF", "SCIENCE", console.log)

	// var team = new Organization({
	// 	slackGroup: "RSgTe74N34s07U8HWZk4CYeF",
	// })

	// team.save(function(err,res){
	// 	console.log(err, res);
	// })

	// Organization.find((err,res)=>{
	// 	console.log(err, res);
	// })

	// create
	// skill.save(function(err, spice){
	// 	if(err) return log(err);
	// 	console.log(spice);
	// })


	// Skills.remove({}, function(err) { 
	//    console.log('collection removed') 
	//    // list
	//    Skills.find(function (err, kittens) {
	//      if (err) return console.error(err);
	//      console.log(kittens);
	//    })
	// });

});
