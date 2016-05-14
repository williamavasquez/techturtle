var express = require('express');
var router = express.Router();
var burgers = require('../model/burger.js');

router.get('/', function(req,res) {
	res.redirect('/burger')
});

router.get('/burger', function(req,res) {
	burgers.all(function(data){
		var hbsObject = {burgers : data}
		console.log(hbsObject)
		res.render('index', hbsObject);
	});
});

router.post('/burger/create', function(req,res) {
	burgers.create(['burger_name'], [req.body.name], function(data){
		res.redirect('/burger')
	});
});

router.put('/burger/update/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	console.log(req.body.devoured);

	burgers.update({'devoured' : req.body.devoured}, condition, function(data){
		res.redirect('/burger');
	});
});

router.delete('/burger/delete/:id', function(req,res) {
	var condition = 'id = ' + req.params.id;

	burgers.delete(condition, function(data){
		console.log(data);
		res.redirect('/burger');
	});
});
module.exports = router;
