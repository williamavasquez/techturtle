var express = require('express');
var router = express.Router();
var burgers = require('../model/burger.js');

router.get('/', function(req,res) {
		res.render('index');
});

router.get('/shop', function(req,res) {
		res.render('shop');
});

router.get('/inventory', function(req,res) {
		res.render('inventory');
});

router.get('/products', function(req,res) {
		res.render('products');
});

router.get('/sign_in', function(req,res) {
		res.render('sign_in');
});

module.exports = router;
