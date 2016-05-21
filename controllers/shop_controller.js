var express = require('express');
var _ = require('underscore');
var router = express.Router();
var shop = require('../model/shop.js');

router.get('/', function(req,res) {
		res.render('index');
});

router.get('/shop', function(req,res) {
	shop.all(function(data){
		var n = 4;
		var lists = _.groupBy(data, function(element, index){
		  return Math.floor(index/n);
		});
		lists = _.toArray(lists); //Added this to convert the returned object to an array.
		//console.log(lists);
		var hbsObject = {inventory : lists}
		//console.log(hbsObject)
		res.render('shop', hbsObject);
	});
});

router.get('/product/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;
	console.log('condition', condition);
});

router.get('/inventory', function(req,res) {
	shop.all(function(data){
		var hbsObject = {inventory : data}
		console.log(hbsObject)
		res.render('inventory', hbsObject);
	});
});

router.get('/products', function(req,res) {
		res.render('products');
});

router.get('/sign_in', function(req,res) {
		res.render('sign_in');
});

router.get('/orders', function(req,res) {
	shop.allOrders(function(data){
		var hbsObject = {orders : data}
		console.log(hbsObject)
		res.render('orders', hbsObject);
	});
});

router.post('/cart', function(req,res) {
	// res.send(req.body);
	console.log(req.body);
		res.render('cart');
});

// router.post('/cart/createCart', function(req,res) {
// 	console.log(req.body.barcode, req.body.quantityPurchased)
// 	shop.createCart(['barcode', 'quantityPurchased'], [req.body.barcode, req.body.quantityPurchased], function(data){
// 		res.redirect('/cart')
// 	});
// });

router.post('/inventory/create', function(req,res) {
	shop.create(['productName', 'productDescription', 'sku', 'category', 'productImage', 'quantity', 'price', 'supplier', 'barcode'], [req.body.productName, req.body.productDescription, req.body.sku, req.body.category, req.body.productImage, req.body.quantity, req.body.price, req.body.supplier, req.body.barcode], function(data){
		res.redirect('/inventory')
	});
});

router.delete('/inventory/delete/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;
	console.log('condition', condition);
	shop.delete(condition, function(data){
		res.redirect('/inventory')
	});
});

router.put('/inventory/update/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;
	console.log('condition', condition);
	shop.update({'productName ' : req.body.productName, ', productDescription ' : req.body.productDescription, ', sku ' : req.body.sku, ', category ' : req.body.category, ', quantity ' : req.body.quantity, ', price ' : req.body.price, ', supplier ' : req.body.supplier}, condition, function(data){
		res.redirect('/inventory');
	});
});

router.delete('/orders/delete/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;
	console.log('condition', condition);
	shop.deleteOrders(condition, function(data){
		res.redirect('/orders')
	});
});

module.exports = router;