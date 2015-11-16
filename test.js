'use strict';

var DBHOST = 'localhost'
var DBNAME = 'mongooseTest'

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+DBHOST+'/'+DBNAME);
var db = mongoose.connection;

var {Skills, User, Organization} = require('./Models.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
	console.log('db opened')
	console.log('...')

	var skill = new Skills({name:'Spice'});
	

	// create
	// skill.save(function(err, spice){
	// 	if(err) return log(err);
	// 	console.log(spice);
	// })


	Skills.remove({}, function(err) { 
	   console.log('collection removed') 
	   // list
	   Skills.find(function (err, kittens) {
	     if (err) return console.error(err);
	     console.log(kittens);
	   })
	});

});
