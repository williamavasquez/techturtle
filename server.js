var cookieParser = require('cookie-parser');
var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var app = express();

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 60000 }}));
app.use(cookieParser());

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


var shop_controller = require('./controllers/shop_controller.js');
var users_controller = require('./controllers/users_controller.js');

app.use('/', shop_controller);
app.use('/shops', shop_controller);
app.use('/users', users_controller);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('listening on PORT',port);
});
