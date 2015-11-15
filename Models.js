var mongoose = require('mongoose');

var skillsSchema = mongoose.Schema({
	name: String,
	slackGroup: String,
	users:[],
	tags:[]
})


var userSchema = mongoose.Schema({
	name: String,
	slackGroups: [],
	skills:[]
})

var organizationSchema = mongoose.Schema({
	slackGroup: String,
	admins: [],
	skills:[],
	users:[]
}) 



module.exports.Skills = mongoose.model('Skills', skillsSchema)
module.exports.User = mongoose.model('User', userSchema)
module.exports.Organization = mongoose.model('Organization', organizationSchema)