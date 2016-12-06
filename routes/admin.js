var mysql = require('mysql');
var mysql1= require('./mysql');
var NodeGeocoder = require('node-geocoder');
// var dbconn =  mysql.createConnection({
// 	host     : '127.0.0.1',
//     user     : 'root',
//     password : 'Canam@001',
//     database : 'cloud_watch',
//     port	 : 3306
//   });
// dbconn.connect(function(err){
// 	  if(err){
// 	    console.log('Database connection error');
// 	  }else{
// 	    console.log('Database connection successful');
// 	  }
// 	});

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

// exports.createSensor = function(req,res)
// {
// 	var sensor_name=req.param("sensor_name");
// 	var latitude=req.param("latitude");
// 	var longitude=req.param("longitude");
// 	var location=req.param("location");
// 	var active=req.param("active");
// 	var type=req.param("type");
// 	var city=req.param("city");
// 	var currentdate = new Date(); 
// 	var datetime = currentdate.getDate() + "/"
// 	                + (currentdate.getMonth()+1)  + "/" 
// 	                + currentdate.getFullYear() + " @ "  
// 	                + currentdate.getHours() + ":"  
// 	                + currentdate.getMinutes();

// 	    console.log("Timestamp:"+datetime);
// 	var query= "insert into sensor_register (sensor_name,sensor_x,sensor_y,sensor_location,sensor_active,sensor_timestamp,sensor_type,city) VALUES ('"+sensor_name+"','"+latitude+"','"+longitude+"','"+location+"','"+active+"','"+datetime+"','"+type+"','"+city+"');";
// 	mysql1.add(function(err,res){
// 		if(err){
// 			throw err;
// 		}
// 		else{
// 			console.log("Sensor Data Inserted.");
			
// 		}
// 	},query);
// 	res.render('success', { title: 'Success',first:req.session.first,last:req.session.last});
// };

exports.delete_sensor = function(req,res){
var id=req.param("sensor_id");
console.log("Sensor ID:"+id);
var query= "UPDATE sensor_register SET sensor_active='No' WHERE sensor_id='"+id+"';";
mysql1.add(function(err,result){
	if(err){
		throw err;
	}
	else{
		console.log("hogaya kaam");
	}
},query);
res.redirect('/active');

};

exports.analysis = function(req,res){
	console.log("Inside analysis");
	var flag=0;
	
	res.render('query',{title:'Analysis',first:req.session.first,last:req.session.last,flag:flag,message:"",display:""});

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
				res.render('query_answers', { title: 'Analysis',rec:records,flag:flag,name:name,id:id,x:x,y:y,location:location,active:active,type:type,first:req.session.first,last:req.session.last});
			
				}
		
	},query);
}
else
{
	res.render('query', { title: 'Analysis',message: "Enter only SELECT query",display:"Tables present are sensor_register and testtable"});
}


	};

exports.update_sen = function(req,res){
	var id=req.param("id");
	var name=req.param("sensor_name");
	var latitude=req.param("latitude");
	var longitude=req.param("longitude");
	var location=req.param("location");
	var active=req.param("active");
	var type=req.param("type");
	
	var query= "UPDATE sensor_register SET sensor_name='"+name+"',sensor_x='"+latitude+"',sensor_y='"+longitude+"',sensor_location='"+location+"',sensor_active='"+active+"',sensor_type='"+type+"' WHERE sensor_id='"+id+"';";
	mysql1.add(function(err,result){
		if(err){
			throw err;
		}
		else{
			console.log("hogaya kaam");
		}
	},query);
	res.render('success',{first:req.session.first,last:req.session.last});

	};

exports.update_sensor = function(req,res){
	var id=req.param("sensor_id");
	console.log("Sensor ID:"+id);
	var query= "select * from sensor_register WHERE sensor_id='"+id+"';";
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
			else
				{
				var id=records[0].sensor_id;
				var name=records[0].sensor_name;
				var x=records[0].sensor_x;
				var y=records[0].sensor_y;
				var location=records[0].sensor_location;
				var active=records[0].sensor_active;
				console.log("active:"+active);
				var type=records[0].sensor_type;
				console.log("Inside else update");
				res.render('update', { title: 'Update Sensor',name:name,id:id,x:x,y:y,location:location,active:active,type:type,first:req.session.first,last:req.session.last});
			
				}
		
	},query);

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
					res.redirect('/dash');
		// 			first = records[0].first;
		// 		last = records[0].last;
		// 		req.session.first=first;
		// 		req.session.last=last;
		// 			var graph1="SELECT count(sensor_type) as tot,sensor_type from sensor_register group by sensor_type;";
		// 			mysql1.get(function(err,records1){
		// 			if(err){
		// 			throw err;
		// 				}
		// 				else
		// 				{
		// 					var graph2="select count(sensor_active) as active, sensor_active from sensor_register group by sensor_active;";
		// 					mysql1.get(function(err,records2){
		// 					if(err){
		// 						throw err;
		// 					}
		// 					else{

		// 					console.log("last_name:"+last);
		// 					res.render('dashboard', { title: 'Dashboard',first:first,last:last,records1:records1,records2:records2});

		// 	}
		// },graph2);
		// 				}
		// },graph1);
			
				}
		}
	},query);

};


exports.dash=function(req,res){



	var graph1="SELECT count(sensor_type) as tot,sensor_type from sensor_register group by sensor_type;";
					mysql1.get(function(err,records1){
					if(err){
					throw err;
						}
						else
						{
							var graph2="select count(sensor_active) as active, sensor_active from sensor_register group by sensor_active;";
							mysql1.get(function(err,records2){
							if(err){
								throw err;
							}
							else{
								var graph3="select count(city) as city_count, city from sensor_register group by city;";
								mysql1.get(function(err,records3){
							if(err){
								throw err;
							}
							else{

								var graph4="select *,((min+max)/2) as avg from citywise;";
								mysql1.get(function(err,records4){
							if(err){
								throw err;
							}
							else{


							res.render('dashboard', { title: 'Dashboard',first:req.session.first,last:req.session.last,records1:records1,records2:records2,records3:records3,records4:records4});

			}
		},graph4);
							}

		},graph3);
							}
		},graph2);
						}
		},graph1);
			
				

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



exports.location= function (req,res) {
	console.log("in admin location");
	var get_sensor= "Select * from sensor_register;";
	mysql1.get(function (err, records) {

		console.log("records=");
		console.dir(records[0]);
		res.render('location',{myresult:records});
	},get_sensor);
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
	var datetime = currentdate.getDate() + "/"
	                + (currentdate.getMonth()+1)  + "/" 
	                + currentdate.getFullYear() + " @ "  
	                + currentdate.getHours() + ":"  
	                + currentdate.getMinutes();

	    console.log("Timestamp:"+datetime);

	var xcoord="";
			var ycoord="";
			var options = {
		  provider: 'google',
		 
		  // Optional depending on the providers 
		  httpAdapter: 'https', // Default 
		  apiKey: 'AIzaSyB-7U6qTUfJE-_NBItfrn81VTRM3ZPrLKA', // for Mapquest, OpenCage, Google Premier 
		  formatter: null         // 'gpx', 'string', ... 
		};
		 
		var geocoder = NodeGeocoder(options);
		 
		// Using callback 
		console.log("before googlemaps");
		geocoder.geocode(location, function(err, result) {
			if(err){
		console.log("in error googlemaps");
				throw err;
			}
			else{
		console.log("in googlemaps");
		  // console.log("res"+res[0]);
		  xcoord= result[0].latitude;
		  ycoord= result[0].longitude;
		  console.log("xcoord="+xcoord);
	var query= "insert into sensor_register (sensor_name,sensor_x,sensor_y,sensor_location,sensor_active,sensor_timestamp,sensor_type,city) VALUES ('"+sensor_name+"','"+xcoord+"','"+ycoord+"','"+location+"','"+active+"','"+datetime+"','"+type+"','"+req.param('city')+"');";
	mysql1.add(function(err,result){
		if(err){
			throw err;
		}
		else{
			console.log("Sensor Data Inserted.");
			res.render('success', { title: 'Success',first:req.session.first,last:req.session.last});
		}
	},query);
}
});
};



exports.business=function(req,res){
console.log("inside business");
	var sensor_name,latitude,longitude,sensor_location,timestamp,sensor_type;
	var flag="Yes";
	var query= "SELECT * FROM business;";
	mysql1.get(function(err,records){
		if(err){
			throw err;
		}
			else
				{
				console.log("Inside else active");
				res.render('business', { title: 'Business',rec:records});
			
				}
		
	},query);



}