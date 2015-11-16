var mongoose = require('mongoose');

var skillsSchema = mongoose.Schema({
	name: {type: String, unique : true, dropDups: true},
	slackGroup: String,
	users:[],
	tags:[],
})

// var userSchema = mongoose.Schema({
// 	name: String,
// 	slackGroups: [],
// 	slackUser: String,
// 	skills:[]
// })

var organizationSchema = mongoose.Schema({
	slackGroup: String,
	admins: [],
	skills:[],
	users:[ {type: String, unique : true, dropDups: true} ]
}) 



Skills = mongoose.model('Skills', skillsSchema)
// User = mongoose.model('User', userSchema)
Organization = mongoose.model('Organization', organizationSchema)

module.exports = {
	Skills,
	// User,
	Organization,

}


// METHODS

var status = (err,req)=>{
	console.log(err,req)
}

function list(model, cb){
	cb = cb || status;
	model.find({}, cb)
}
module.exports.list = list;

function dump(model, cb){
	cb = cb || status;
	model.remove({}, cb);
}
module.exports.dump = dump;

function newSkill(slackGroup, name, cb){
	var skill = new Skills({slackGroup, name})
	skill.save((err,skill)=>{
		if(err){
			if(err.code == 11000){
				cb(name + ' has allready been added');
			}
		}else{
			cb(skill.name + ' added successfully');
		}
	})
}

module.exports.newSkill = newSkill;

function learnSkill(slackGroup, slackUser, name, cb){
	Skills.findOne({slackGroup, name}, (err, skill)=>{
		if(err){
			cb('something weird has happend')
		}else{
			if(!skill){
				cb('that skill has not been added to the list of skills yet')
				// would you like me to add it?
			}else{
				// cb('ok found it');
				// add skill to users[]
				if (skill.users.indexOf(slackUser) > -1){
					cb("user allready knows this skill")
				}else{
					skill.users.push(slackUser);
					skill.save(status);
					cb('user has learned ' + name);
				}
			}
		}
	})
}
module.exports.learnSkill = learnSkill;

function listSkills(slackGroup, users, cb){
	users = users || null;
	var query = users ? {slackGroup, users} : {slackGroup} 
	Skills.find(query, (err, skills)=>{
		if(err){
			cb('something weird has happend')
		}else{
			if(skills.length == 0){
				cb('no skills found');
			}else{
				cb("Skills: " + skills.map((v)=>{
					return v.name
				}).join(", "));	
			}
			
		}
	});
}

module.exports.listSkills = listSkills;

function findUsersBySkill (slackGroup, name, cb) {
	if(!name){
		cb('please enter a skill');
	}else{
		Skills.find({slackGroup, name}, (err, skills)=>{
			cb("the following users match that skill profile: "+skills.map(v=>{
				return v.users.map(u=>"@"+u).join(", ")
			}).join(""))
		})
	}
	
}
module.exports.findUsersBySkill = findUsersBySkill;





























