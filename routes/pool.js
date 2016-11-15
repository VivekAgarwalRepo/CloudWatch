var mysql= require('mysql');

var connection=[];

for(var j=0;j<500;j++){
	connection.push(mysql.createConnection({
		host: 'cloudwatch.ciiizn4qz0fr.us-east-1.rds.amazonaws.com',
		user: 'master',
		password: 'masteruser',
		database: 'cloudwatch'
	}));
}

exports.onGetConnection=function() { //pop the connection
	if(connection){
		return connection.pop();
	}	
	
};


exports.onReturnConnection=function(connect) { //return connection
	
	connection.push(connect);

};