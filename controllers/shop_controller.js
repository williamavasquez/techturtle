var express = require('express');
var _ = require('underscore');
var router = express.Router();
var shop = require('../model/shop.js');

router.get('/', function(req,res) {
	shop.all(function(data){
		res.render('index');
	});
});

router.get('/shop', function(req,res) {
	shop.all(function(data){
		var n = 4;
		var lists = _.groupBy(data, function(element, index){
		  return Math.floor(index/n);
		});
		lists = _.toArray(lists); //Added this to convert the returned object to an array.
		//console.log(lists);
		var hbsObject = {inventory : lists, logged_in: req.session.logged_in}
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

router.get('/users', function(req,res) {
	shop.allUsers(function(data){
		var hbsObject = {users : data}
		res.render('users', hbsObject);
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
	debugger;
	console.log(req.body);
		res.render('cart');
});

router.post('/inventory/create', function(req,res) {
	shop.create(['productName', 'productDescription', 'sku', 'category', 'productImage', 'quantity', 'price', 'supplier', 'barcode'], [req.body.productName, req.body.productDescription, req.body.sku, req.body.category, req.body.productImage, req.body.quantity, req.body.price, req.body.supplier, req.body.barcode], function(data){
		res.redirect('/inventory')
	});
});


router.post('/users/createNewUser', function(req,res) {
	shop.createUser(['userName', 'name', 'emailAddress', 'password', 'role'], [req.body.username, req.body.name, req.body.emailAddress, req.body.password, req.body.role], function(data){
		res.redirect('/users')
	});
});

router.delete('/inventory/delete/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;
	console.log('condition', condition);
	shop.delete(condition, function(data){
		res.redirect('/inventory')
	});
});

router.delete('/users/delete/:userId', function(req,res) {
	var condition = 'userId = ' + req.params.userId;
	console.log('condition', condition);
	shop.deleteUser(condition, function(data){
		res.redirect('/users')
	});
});

router.delete('/orders/delete/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;
	console.log('condition', condition);
	shop.deleteOrders(condition, function(data){
		res.redirect('/orders')
	});
});

router.put('/inventory/update/:barcode', function(req,res) {
	var condition = 'barcode = ' + req.params.barcode;
	console.log('condition', condition);
	shop.update({
		'productName ' : req.body.productName,
		', productImage ' : req.body.productImage,
		', productDescription ' : req.body.productDescription,
		', sku ' : req.body.sku,
		', category ' : req.body.category,
		', quantity ' : req.body.quantity,
		', price ' : req.body.price,
		', supplier ' : req.body.supplier}, condition, function(data){
		res.redirect('/inventory');
	});
});

router.put('/users/update/:userId', function(req,res) {
	var condition = 'userId = ' + req.params.userId;
	console.log('condition', condition);
	shop.updateUser({'userName ' : req.body.username, ', name ' : req.body.name, ', emailAddress ' : req.body.emailAddress, ', role ' : req.body.role}, condition, function(data){
		res.redirect('/users');
	});
});

router.post('/ocreate', function(req,res) {
    //need to add the user ID where the number 1 is
    var condition = ' ( userId, date) VALUES ('+1+' ,now())';
    shop.orderCreation(condition, function(data){
        res.redirect('/');
    });
});

router.post('/productsfromcart', function(req,res) {
	// we recieve the data from the front end, cut it up and send it to the DB
	console.log('******Controller - cart info **********');
		cartData = JSON.parse(req.body.test)
		console.log(cartData[0]);
	console.log('***********************');
	});

	console.log(res);


module.exports = router;
