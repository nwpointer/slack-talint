DBHOST = 'localhost'
DBNAME = 'mongooseTest'

log= console.log

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+DBHOST+'/'+DBNAME);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	var kittyScheme = mongoose.Schema({
		name: String
	})

	var Kitten = mongoose.model('Kitten', kittyScheme);

	var spice = new Kitten({name:'Spice'});
	

	// create
	// spice.save(function(err, spice){
	// 	if(err) return log(err);
	// 	log(spice);
	// })


	// read all
	// Kitten.find(function (err, kittens) {
	//   if (err) return console.error(err);
	//   console.log(kittens);
	// })


	
});

