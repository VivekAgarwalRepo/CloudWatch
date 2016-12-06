var ejs= require('ejs');
var mysql = require('mysql');
var pool= require('./pool');
	
var pooler= pool.onGetConnection();

exports.add=function add(callback,query){
	console.log("\n Query:"+query);
		  pooler.query( query,  function(err, rows){
		  	if(err)	{
		  		console.log("ERROR: " + err.message);
		  	}
		  	else 
		{	
			console.log("Results:"+rows);
			callback(err, rows);
		}
		  });
		  pool.onReturnConnection(pooler);
};



exports.get=function get(callback,query){
	console.log("\n Query:"+query);
	pooler.query(query, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	
			console.log("Results:"+rows);
			callback(err, rows);
		}
	});
	console.log("\nClose connection");
	pool.onReturnConnection(pooler);
};