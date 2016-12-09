var mysql1= require('./mysql');

exports.signin = function(req, res){
	console.log("Inside signin");
	var message="";
	res.render('business_signin', { title: 'Sign in', message:message});
};

exports.home = function(req, res){
	console.log("Inside home dashboard");
	res.render('business_dashboard', { title: 'Dashboard',first:req.session.first,last:req.session.last});
};

exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/business');
};

exports.analysis = function(req,res){
	console.log("Inside analysis");
	var flag=0;
	
	res.render('business_query',{title:'Analysis',first:req.session.first,last:req.session.last,flag:flag,message:"",display:""});

	};


exports.query = function(req,res){
	var q=req.param("query");
	console.log("Sensor query:"+q);
	var query= q;
	var arr=q.split(" ");
	if(arr[0]=="select")
	{
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
			else
				{
				var flag=1;
				var id=records[0].sensor_id;
				var name=records[0].sensor_name;
				var x=records[0].sensor_x;
				var y=records[0].sensor_y;
				var location=records[0].sensor_location;
				var active=records[0].sensor_active;
				console.log("active:"+active);
				var type=records[0].sensor_type;
				console.log("Inside else update");
				res.render('business_query_answers', { title: 'Analysis',rec:records,flag:flag,name:name,id:id,x:x,y:y,location:location,active:active,type:type,first:req.session.first,last:req.session.last});
			
				}
		
	},query);
}
	else
	{
		res.render('business_query', { title: 'Analysis',message: "Enter only SELECT query",display:"Tables present are sensor_register and testtable"});
	}

};

exports.dashboard = function(req, res){
	var username=req.param("username");
	var password=req.param("password");

	console.log(username);
	console.log(password);
	var first,message,last;
	var query= "SELECT * FROM business WHERE username='"+username+"' and password='"+password+"';";
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
		else{
			if(records.length<=0){
				  message="Email and Passwords do not match.";
				  console.log(message);
				  res.render('business_signin', { title: 'Sign in', message:message});
			  }
			else
				{

					req.session.username=username;
				first = records[0].first;
				last = records[0].last;
				req.session.first=first;
				req.session.last=last;
				console.log("last_name:"+last);
				res.render('business_dashboard', { title: 'Dashboard',first:first,last:last});
			
				}
		}
	},query);

};


exports.active = function(req, res){
	console.log("inside active");
	var sensor_name,latitude,longitude,sensor_location,timestamp,sensor_type;
	var flag="Yes";
	var query= "SELECT * FROM sensor_register WHERE sensor_active='"+flag+"';";
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
			else
				{
				console.log("Inside else active");
				res.render('business_active', { title: 'Active',first:req.session.first,last:req.session.last,rec:records});
			
				}
		
	},query);

};


exports.search = function(req, res){
	console.log("inside search");
	var search=req.param("search");
	var sensor_name,latitude,longitude,sensor_location,timestamp,sensor_type,active;
	var query= "SELECT * FROM sensor_register WHERE sensor_location like '%"+search+"%';";
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
			else
				{
				console.log("Inside else search");
				res.render('business_search', { title: 'Search',first:req.session.first,last:req.session.last,rec:records});
			
				}
		
	},query);

};

exports.validation= function (req,res) {

	res.render('business_validation');
};

exports.location= function (req,res) {
	console.log("in business location");
	var get_sensor= "Select * from sensor_register;";
	mysql1.get(function (err, records) {

		console.log("records=");
		console.dir(records[0]);
		res.render('business_location',{myresult:records});
	},get_sensor);
};

exports.signup= function (req,res) {
	var username=req.param('username');
	var email=req.param('email');
	var password=req.param('password');
	var create_business= "INSERT INTO business (username,email,password,dashboard,actve_sensors,extensive_analysis,sensor_details) VALUES ('"+username+"','"+email+"','"+password+"','0','0','0','0');";
	mysql1.add(function (err,result) {
		if(err){
			throw err;
		}
		else{
			res.redirect('/business_validation');
		}
	},create_business);
};

exports.live=function (req,res) {
	var query="select live.timestamp,live.temperature, live.humidity, live.city from live,latestentry where live.timestamp=latestentry.latest order by timestamp asc;";

	mysql1.get(function (err,rows) {
		if(err){
			console.error(err)
		}
		else{
			res.send(rows);
		}
	},query);

}

exports.average=function (req,res) {
	var query="select *,((min+max)/2) as avg from citywise;";
	mysql1.get(function (err,rows) {
		if(err){
			console.error(err)
		}
		else{
			res.send(rows);
		}
	},query);
}

exports.avgHumid=function (req,res) {
	var query="select *,(minhumid+maxhumimd)/2 as avghumid from citywisehumid;";
	mysql1.get(function (err,rows) {
		if(err){
			console.error(err)
		}
		else{
			res.send(rows);
		}
	},query);
}

exports.bill=function (req,res) {
	query="Select * from business where username = '"+req.session.username+"';";

	mysql1.get(function (err,results) {
		console.log("Billing results :"+JSON.stringify(results));
		res.render('business_bill',{services:results[0]});
	},query);

}

exports.signup_page= function (req,res) {
	res.render('business_signup');
};

exports.business_check_validate= function (req,res) {
	
	console.log("req.param.dashboard"+req.param('dashboard'));
	console.log("req.param.dashboard"+req.param('active_sensors'));

	var dash=req.param('dashboard');
	var active=req.param('active_sensors');
	var extensive=req.param('extensive_analysis');
	var search=req.param('search_details');


	query="UPDATE business as set dashboard=?,actve_sensors=?,extensive_analysis=?,sensor_details=? where email=?"
	mysql1.add(function (err,result) {
		if(err){
			throw err;
		}
		else{
			res.redirect('/business_validation');
		}
	},create_business);

	res.redirect('/business_home');
};

exports.create= function (req,res) {
	res.render('business_create');
};
