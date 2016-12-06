
var mysql1= require('./mysql');

exports.signin = function(req, res){
	console.log("Inside signin");
	var message="";
	res.render('signin', { title: 'Sign in', message:message});
};

exports.home = function(req, res){
	console.log("Inside home dashboard");
	res.render('dashboard', { title: 'Dashboard',first:req.session.first,last:req.session.last});
};

exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/admin');
};

exports.createSensor = function(req,res)
{
	var sensor_name=req.param("sensor_name");
	var latitude=req.param("latitude");
	var longitude=req.param("longitude");
	var location=req.param("location");
	var active=req.param("active");
	var type=req.param("type");
	var currentdate = new Date();
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth()+1)  + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes();

	new Date(Date.now)
	    console.log("Timestamp:"+datetime);
	var query= "insert into sensor_register (sensor_name,sensor_x,sensor_y,sensor_location,sensor_active,sensor_timestamp,sensor_type) VALUES ('"+sensor_name+"','"+latitude+"','"+longitude+"','"+location+"','"+active+"','"+datetime+"','"+type+"');";
	mysql1.add(function(err,res){
		if(err){
			throw err;
		}
		else{
			console.log("Sensor Data Inserted.");
			
		}
	},query);
	res.render('success', { title: 'Success',first:req.session.first,last:req.session.last});
};

exports.dashboard = function(req, res){
	var username=req.param("username");
	var password=req.param("password");
	console.log(username);
	console.log(password);
	var first,message,last;
	var query= "SELECT first,last FROM admin WHERE username='"+username+"' and password='"+password+"';";
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
		else{
			if(records.length<=0){
				  message="Email and Passwords do not match.";
				  console.log(message);
				  res.render('signin', { title: 'Sign in', message:message});
			  }
			else
				{
				
				first = records[0].first;
				last = records[0].last;
				req.session.first=first;
				req.session.last=last;
				console.log("last_name:"+last);
				res.render('dashboard', { title: 'Dashboard',first:first,last:last});
			
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
				res.render('active', { title: 'Active',first:req.session.first,last:req.session.last,rec:records});
			
				}
		
	},query);

};

exports.enterVals=function (req,res) {
	var id=req.param("sensor_id");
	var temp=req.param("sensor_temp");
	var humid=req.param("sensor_humidity");

	console.log("id :"+id+" temp :"+temp+" humidity :"+humid);

	var query= "Insert into testtable(sensor_id,sensor_temp,sensor_humidity) values ("+id+","+temp+","+humid+");";
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
		else
		{
			res.send(records);

		}

	},query);

}

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
				res.render('search', { title: 'Search',first:req.session.first,last:req.session.last,rec:records});
			
				}
		
	},query);

};