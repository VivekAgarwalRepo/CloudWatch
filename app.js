
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
var business = require('./routes/business');


//Sample
var app = express();

//all environments

app.set('port', process.env.PORT || 3020);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({cookieName: 'session', secret: "fafadsfasfgfsgsa", resave: false, saveUninitialized: true,
    duration: 30 * 60 * 1000, activeDuration: 5 * 60 * 1000}));
app.use(express.cookieParser());
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
	saveUninitialized: true,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000
	
}));

app.use(app.router);


//development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

//GET Requests

app.get('/', function (req,res) {
	res.render('home');
});

app.get('/admin',admin.signin);
app.post('/dashboard',admin.dashboard);
app.get('/dash',admin.dash);
app.get('/home',admin.home);
app.get('/logout',admin.logout);
app.post('/createSensor',admin.createSensor);
app.get('/active',admin.active);
app.post('/search',admin.search);
app.get('/fill',admin.MapToVirtualSensor);
app.get('/location',admin.location);
app.get('/analysis',admin.analysis);
app.post('/query',admin.query);
app.get('/delete_sensor',admin.delete_sensor);
app.get('/a_business',admin.business);

app.get('/update_sensor',admin.update_sensor);
app.post('/update_sen',admin.update_sen);
// nayan start
app.get('/getweather',user.getweather);
app.get('/getweatherbyloc',user.getweatherbyloc);
app.get('/setcurrentlocation',user.setcurrentlocation);
app.get('/showweather',user.showweather);
app.get('/users', user.list);
app.get('/business',business.signin);
app.post('/business_dashboard',business.dashboard);
app.get('/business_home', business.home);
app.get('/business_validation',business.validation);
app.get('/business_logout',business.logout);
app.get('/business_active',business.active);
app.post('/business_search',business.search);
app.get('/business_location',business.location);
app.get('/business_analysis',business.analysis); 
app.post('/business_query',business.query);
app.post('/business_signup',business.signup);
app.get('/business_signup_page',business.signup_page);
app.post('/business_check_validate',business.business_check_validate);
app.get('/business_create',business.create);


app.get('/business_bill',business.bill);

app.get('/liveFeed',business.live);
app.get('/avg',business.average);
app.get('/avgHumid',business.avgHumid);

//nayan end


	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
