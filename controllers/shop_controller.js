var express = require('express');
var router = express.Router();
var shop = require('../model/shop.js');

router.get('/', function(req,res) {
		res.render('index');
});

router.get('/shop', function(req,res) {
	shop.all(function(data){
		var hbsObject = {inventory : data}
		console.log(hbsObject)
		res.render('shop', hbsObject);
	});
});

router.get('/product', function(req,res) {
	shop.all(function(data){
		var hbsObject = {inventory : data}
		console.log(hbsObject)
		res.render('product', hbsObject);
	});
});

router.get('/inventory', function(req,res) {
	shop.all(function(data){
		var hbsObject = {inventory : data}
		console.log(hbsObject)
		res.render('inventory', hbsObject);
	});
});

router.put('/inventory/update/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;

	console.log('condition', condition);

	shop.update({'productName' : req.body.productName}, condition, function(data){
		res.redirect('/inventory');
	});
});

router.get('/products', function(req,res) {
		res.render('products');
});

router.get('/sign_in', function(req,res) {
		res.render('sign_in');
});

module.exports = router;
