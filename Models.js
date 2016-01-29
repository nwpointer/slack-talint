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
	// console.log(name);
	name.map((n)=>{	
		var skill = new Skills({slackGroup, name:n})
		skill.save((err,skill)=>{
			if(err){
				if(err.code == 11000){
					cb(n + ' has allready been added');
				}
			}else{
				cb(skill.name + ' added successfully');
			}
		})
	})

		// var skill = new Skills({slackGroup, n})
		// skill.save((err,skill)=>{
		// 	if(err){
		// 		if(err.code == 11000){
		// 			cb(n + ' has allready been added');
		// 		}
		// 	}else{
		// 		cb(skill.name + ' added successfully');
		// 	}
		//})

	// var skill = new Skills({slackGroup, name})
	// skill.save((err,skill)=>{
	// 	if(err){
	// 		if(err.code == 11000){
	// 			cb(name + ' has allready been added');
	// 		}
	// 	}else{
	// 		cb(skill.name + ' added successfully');
	// 	}
	// })
}
module.exports.newSkill = newSkill;

function removeSkill(slackGroup, name, cb){
	Skills.findOne({slackGroup, name}, (err, skill)=>{
		if(err){
			console.log(err);
			return cb(err)
		}
		skill.remove();
		cb(skill.name + ' removed successfully');
	})
}
module.exports.removeSkill = removeSkill;


function learnSkill(slackGroup, slackUser, name, cb){
	var message = "";
	name.map((n)=>{
		Skills.findOne({slackGroup, name:n}, (err, skill)=>{
			if(err){
				message +='something weird has happend';
			}else{
				if(!skill){
					message+='that skill has not been added to the list of skills yet'
					// would you like me to add it?
				}else{
					// cb('ok found it');
					// add skill to users[]
					if (skill.users.indexOf(slackUser) > -1){
						message += "user allready knows this skill"
					}else{
						skill.users.push(slackUser);
						skill.save(status);
						message += 'user has learned ' + n;
					}
				}
			}
		})
	})
	cb("talint will add " + name + " to your profile");
	
}
module.exports.learnSkill = learnSkill;

function forgetSkill(slackGroup, slackUser, name, cb){
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
					i = skill.users.indexOf(slackUser)
					skill.users.splice(i,1);
					skill.save(status);
					cb('skill removed')
				}else{
					cb("error")
					// skill.users.push(slackUser);
					// skill.save(status);
					// cb('user has learned ' + name);
				}
			}
		}
	})
}
module.exports.forgetSkill = forgetSkill;


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

function findUsersBySkill (slackGroup, skillprofile, cb) {
	// console.log(skillprofile);
	if(!skillprofile){
		cb('please enter a skill');
	}else{
		userSet= new Set([]);
		Skills.find({slackGroup, name: {$in: skillprofile}}, (err, skills)=>{
			skills.forEach((s)=>{
				s.users.forEach((u)=>{
					userSet.add(u)
				})
			})
			cb("the following users match that skill profile: "+ [...userSet].map(u=>"@"+u).join(", "))
		})
	}
	
}
module.exports.findUsersBySkill = findUsersBySkill;





























