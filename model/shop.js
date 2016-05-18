
var orm = require('../config/orm.js');

var shop = {
	all: function(cb) {
		orm.all('shop', function(res){
			cb(res);
		});
	},
	//cols and vals are arrays
	create: function(cols, vals, cb) {
		orm.create('shop', cols, vals, function(res){
			cb(res);
		});
	},

	update: function(objColVals, condition, cb) {
		orm.update('shop', objColVals, condition, function(res){
			cb(res);
		});
	},

	delete: function(condition, cb) {
		orm.delete('shop', condition, function(res){
			cb(res);
		});
	}

};


module.exports = shop;
