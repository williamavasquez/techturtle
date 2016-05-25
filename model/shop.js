var orm = require('../config/orm.js');

var shop = {
	all: function(cb) {
		orm.all('inventory', function(res){
			cb(res);
		});
	},

	allOrders: function(cb) {
		orm.all('orders', function(res){
			cb(res);
		});
	},

	create: function(cols, vals, cb) {
		orm.create('inventory', cols, vals, function(res){
			cb(res);
		});
	},

	createCart: function(cols, vals, cb) {
		orm.createCart('orders', cols, vals, function(res){
			cb(res);
		});
	},

	update: function(objColVals, condition, cb) {
		orm.update('inventory', objColVals, condition, function(res){
			cb(res);
		});
	},

	delete: function(condition, cb) {
		orm.delete('inventory', condition, function(res){
			cb(res);
		});
	},

	deleteOrders: function(condition, cb) {
		orm.delete('orders', condition, function(res){
			cb(res);
		});
	}

};

module.exports = shop;