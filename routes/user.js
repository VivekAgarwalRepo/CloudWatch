var mysql= require('./mysql');

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.setcurrentlocation= function (req,res) {
		var latitude= req.param('latitude');
		var longitude= req.param('longitude');
		console.log(latitude+","+longitude);
		req.session.cur_latitude= latitude;
		req.session.cur_longitude= longitude;
		res.send(200);
};

exports.getweather= function(req,res){
	console.log("Reached Getweather");
	res.set('Access-Control-Allow-Origin', '*');
	var latitude= req.param('latitude');
		var longitude= req.param('longitude');

		console.log(latitude+","+longitude);
		req.session.cur_latitude= latitude;
		req.session.cur_longitude= longitude;
	console.log(req.session.cur_latitude);
	var latitude= req.session.cur_latitude;
	var longitude= req.session.cur_longitude;
	var lowerlat= parseFloat(latitude)-0.01449275362;
	var lowerlong= parseFloat(longitude)-0.01449275362;
	var upperlat= parseFloat(latitude)+0.01449275362;
	var dist=0;
	var mindist=null;
	var minpos=0;
	var temp=0;
	var humidity=0;
	console.log(upperlat);
	var upperlong= parseFloat(longitude)+0.01449275362;
	var query= "SELECT * FROM sensor_register WHERE sensor_x between '"+lowerlat+"' AND '"+upperlat+"' OR sensor_y between '"+lowerlong+"' AND '"+ upperlong+"' ;";
	var items;
	console.log(query);
	mysql.get(function(err,result){
		if(err){
			throw err;
		}
		else{
			console.log("result= "+result);
			items=result;
			for(var i=0; i<items.length;i++){
				dist= Math.sqrt(((parseFloat(latitude)-parseFloat(items[i].sensor_x))*(parseFloat(latitude)-parseFloat(items[i].sensor_x))+(parseFloat(longitude)-parseFloat(items[i].sensor_y))*(parseFloat(longitude)-parseFloat(items[i].sensor_y))));
				console.log(dist);
				if(mindist==null){
					mindist=dist;
					minpos=i;
				}
				else if(mindist>dist){
					mindist=dist;
					minpos=i;
				}
			}
			console.log("min"+mindist);
			console.log("sensor id="+items[minpos].sensor_location);
			console.log("minpos :"+minpos);
			var response={};
			var location= items[minpos].sensor_location;
			response.location= location;
			var query1= "SELECT * FROM testtable WHERE sensor_id= '"+items[minpos].sensor_id+"';";
			console.log(query);
			mysql.get(function (err,result) {
				if(err){
					console.error(err);
				}
				else{
					console.dir(result);
					var size= result.length;
					size=size-1;
					console.log("size="+size);
					temp= result[size].sensor_temp;
					humidity= result[size].sensor_humidity;
					response.temp= temp;
					response.humidity= humidity;
					console.log(response);
					res.send(response);
				}
			},query1);
			}
	},query);
};

exports.showweather= function (req,res) {
	var weather = req.param('weather');
	res.render('weather_disp',{weather:weather});
};

exports.getweatherbyloc= function (req,res) {
	res.set('Access-Control-Allow-Origin', '*');
	var response={};
	var location = req.param('location');
	console.log("location="+location);
	var query= "SELECT * FROM sensor_register WHERE sensor_location like '%"+location+"%';"
	var items;
	console.log(query);
	mysql.get(function(err,result){
		if(err){
			console.log("MySQL error as "+err);
		}
		else{
			console.log("result= "+result);
			items= result;

			response.location= location;
			console.log(items[items.length-1].sensor_id);
			var query1= "SELECT * FROM testtable WHERE sensor_id= '"+items[items.length-1].sensor_id+"';";
			console.log(query1);
			mysql.get(function (err,result) {
				if(err){
					throw err;
				}
				else{
					console.dir(result);
					var size= result.length;
					size=size-1;
					console.log("size="+size);
					temp= result[size].sensor_temp;
					humidity= result[size].sensor_humidity;
					response.temp= temp;
					response.humidity= humidity;
					console.log(response);
					res.send(response);
				}
			},query1);
			}
	},query);

};