DBHOST = 'localhost'
DBNAME = 'mongooseTest'

var mongoose = require('mongoose');
mongoose.connect('mongodb://'+DBHOST+'/'+DBNAME);

module.exports.mongoose = mongoose

var db = mongoose.connection;

module.exports.db = db