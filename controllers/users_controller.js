var bcrypt = require('bcryptjs');
var express = require('express');
var router = express.Router();
var shop = require('../model/shop.js');
var user = require('../model/user.js');
var connection = require('../config/connection.js');

//this is the users_controller.js file
router.get('/profile/:id', function(req, res){

  var queryString = "select * from users "
  queryString += "left join orders on orders.user_id = users.id "
  queryString += "where users.id = " + req.params.id;
  console.log(queryString)
  connection.query(queryString, function(err, userAndShops) {
      if (err) throw err;

      //uncomment this to see what the data gets returned like
      //res.send(userAndCats)
      res.render('users/show', {userAndShops: userAndShops})

  });
});

router.get('/', function(req,res) {
	res.render('sign_in');
});

router.get('/', function(req,res) {
	res.render('sign_in');
});

router.get('/sign-out', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/')
  })
});

//if user trys to sign in with the wrong password or email tell them that on the page
router.post('/login', function(req, res) {
	var email = req.body.email;

	var condition = "emailAddress = '" + email + "'";

	user.findOne(condition, function(user){

		if (user){
			bcrypt.compare(req.body.password, user[0].password, function(err, result) {
					if (result == true){

						req.session.logged_in = true;
						req.session.user_id = user[0].userId;
						req.session.user_email = user.email;
						
						if (user[0].role == 'admin') {
							req.session.isAdmin = true;
							debugger;
							console.log('This is admin - ', req.session.isAdmin);
						} else if (user[0].role == 'user') {
							req.session.isUser = true;
							debugger;
							console.log('This is user - ', req.session.isUser);
						}

						res.redirect('/shop');
					}else{
            res.send('You put in the wrong password.')
          }
			});
		}else{
			res.send('an account with this email does not exist - please sign up')
		}
	});
});

router.post('/create', function(req,res) {
	var queryString = "select * from users where emailAddress = '" + req.body.emailAddress + "'";
	console.log(req.body);
	console.log(queryString);
	connection.query(queryString, function(err, users) {
			if (err) throw err;
			console.log(users.length);
			if (users.length > 0){

				res.send('we already have an email or username for this account');

			}else{
console.log('owens');
				bcrypt.genSalt(10, function(err, salt) {
					// var name = req.body.firstname + ' ' + req.b
					// var role = 'user';

					// console.log('this is my fucking naem', name);
						bcrypt.hash(req.body.password, salt, function(err, hash) {
              user.createUser(['name','userName', 'emailAddress', 'password', 'role'], [req.body.name, req.body.username, req.body.emailAddress, hash, req.body.role], function(user){

                req.session.username = req.body.username;//we need to grab the username from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
                req.session.user_email = req.body.email; //we need to grab the email from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
                req.session.logged_in = true;
                req.session.user_id = user.insertId; //the MySQL npm package returns the id of the record inserted with a key of insertId.

                res.redirect('/shop')
								console.log(req.session);
								console.log(req.session.logged_in);
								console.log(req.session.username);
            	});

						});
				});

			}
	});
});

module.exports = router;
