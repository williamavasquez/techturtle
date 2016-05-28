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
console.log('this is the user log for after findone', user);
console.log("this is a test for user[0].id after findONE", user[0].userId);
		if (user){
			bcrypt.compare(req.body.password, user[0].password, function(err, result) {

					if (result == true){
				console.log('this is the user log for after if statement', user);
						req.session.logged_in = true;
						req.session.user_id = user[0].userId;
						// req.session.user_id = user.insertId;
						req.session.user_email = user.email;
<<<<<<< HEAD
						// console.log('test login for insertId', user.user.id);
						console.log('test login for user_ID', req.session.user_id);
						console.log('test login for user.id', user[0].userId);
						// checking to see if the below code works
						// =============
						req.body.heIsAUser = 'user';
						req.body.heIsAAdmin = 'admin';
						// console.log('this is an admin', req.body.heIsAAdmin);
						console.log('this is an user', req.body.heIsAUser);
						console.log('this is a ', req.body.role);
						// console.log('this is a ', req.body.heIsAAdmin);
						// ========53-58 is currently being tested
=======
						
						if (user[0].role == 'admin') {
							req.session.isAdmin = true;
							debugger;
							console.log('This is admin - ', req.session.isAdmin);
						} else if (user[0].role == 'user') {
							req.session.isUser = true;
							debugger;
							console.log('This is user - ', req.session.isUser);
						}
>>>>>>> origin/jasons_branch

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
	connection.query(queryString, function(err, users) {
			if (err) throw err;
			if (users.length > 0){
				res.send('we already have an email or username for this account');

			}else{
				bcrypt.genSalt(10, function(err, salt) {
					// var name = req.body.firstname + ' ' + req.b
					// var role = 'user';

					// console.log('this is my fucking naem', name);
						bcrypt.hash(req.body.password, salt, function(err, hash) {
              user.createUser(['name','userName', 'emailAddress', 'password', 'role'], [req.body.name, req.body.username, req.body.emailAddress, hash, req.body.role], function(user){

                req.session.username = req.body.username;//we need to grab the username from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
                req.session.user_email = req.body.emailAddress; //we need to grab the email from the form because we don't get it back from MySQL. If we wanted to grab it, then we'd have to do another sql query but it's unnecessary since we already have it here.
                req.session.logged_in = true;
                req.session.user_id = user.insertId;
                sessionStorage.setItem('userId',req.session.user_id)
                 //the MySQL npm package returns the id of the record inserted with a key of insertId.
								// console.log('this is the connection.query for users', users);
								// console.log('this is the user_id', user_id);
								console.log('test create for insertId', user.insertId);
								console.log('test create for user_ID', req.session.user_id);
								req.body.heIsAUser = 'user';
								req.body.heIsAAdmin = 'admin';
								// console.log('this is an admin', req.body.heIsAAdmin);
								console.log('this is an user', req.body.heIsAUser);
								console.log('this is a ', req.body.role);
								// console.log('this is a ', req.body.heIsAAdmin);

								//the below log is when you create a new user it will show the insertId
								console.log('this is my user log', user);
                res.redirect('/shop')

            	});
						});
				});
			}
	});
});

module.exports = router;
