
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, session = require('express-session');
var path = require('path');
var admin = require('./routes/admin');

//Sample
var app = express();

//all environments

app.set('port', process.env.PORT || 3002);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
app.use(session({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000
	
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

//GET Requests

app.get('/', function (req,res) {
	res.render('home');
});
app.get('/setcurrentlocation',user.setcurrentlocation);
app.get('/getweather',user.getweather);
app.get('/showweather',user.showweather);
app.get('/users', user.list);
app.get('/admin',admin.signin);
app.post('/dashboard',admin.dashboard);
app.get('/home',admin.home);
app.get('/logout',admin.logout);
app.post('/createSensor',admin.createSensor);
app.get('/active',admin.active);
app.post('/search',admin.search);
app.get('/fill',admin.enterVals);

	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
