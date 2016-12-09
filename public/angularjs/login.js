//loading the 'login' angularJS module
var app = angular.module('login', []);
//defining the login controller

app.controller('login', function($scope, $http) {

	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false

	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.submit = function() {
		$http({
			method : "POST",
			url : '/checklogin',
			data : {
				"username" : $scope.username,
				"password" : $scope.password
			}
		}).success(function(data) {
			//checking the response data for statusCode
			if (data.statusCode == 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/homepage"); 
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
})

app.controller('bargraph',function ($scope,$http) {


	$http({
		url:"/avg",
		method:"GET"
	}).success(function (data) {

		var labels=[];
		var vals=[];

		for(i in data)
		{
			labels.push(data[i].city);
			vals.push(data[i].avg);
		}


		var ctx = document.getElementById("mycanvas").getContext("2d");
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {

				labels: labels,

				datasets: [{
					label: "Average Temperature",
					data: vals,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',

					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
					],
					borderWidth: 1,
					hoverBackgroundColor: "#B0E0E6"
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						},
						gridLines:{
							drawOnChartArea:false
						}
					}
					],
					xAxes: [{
						gridLines:{
							drawOnChartArea:false
						}
					}
					],

				},


			},


		});


	})


})


app.controller('density',function ($scope,$http) {


	$http({
		"url":"/avg",
		"method":"GET"
	}).success(function (data) {
		var labels=[];
		var dataset=[];
		for (i in data){
			labels.push(data[i].city);

			dataset.push({
				label:data[i].city,
				data:[{x:data[i].min,y:data[i].max,r:25}],
				backgroundColor:"#B0E0E6",
				hoverBackgroundColor: "White"
			})
		}


		var data = {

			datasets: dataset
		};

		var bub = document.getElementById("bubbles").getContext("2d");
		var myBubbleChart = new Chart(bub,{
			type: 'bubble',
			data: data,
			options: {
				elements: {
					points: {
						borderWidth: 1,
						borderColor: 'rgb(0, 0, 0)'
					}
				}
			}
		});
	})

})

app.controller('pie',function ($scope,$http) {

	$http({
		"url":"/avgHumid",
		"method":"GET"
	}).success(function (data) {
		var labels=[];
		var vals=[];

		for(i in data)
		{
			labels.push(data[i].city)
			vals.push(data[i].avghumid);
		}

		hlabel=labels;
		hvals=vals;

		var data = {
			datasets: [{
				data: vals,
				backgroundColor: [
					"#FF6384",
					"#4BC0C0",
					"#FFCE56",
					"#E7E9ED",
					"#36A2EB"
				],
				label: 'Average Humidity' // for legend
			}],
			labels: labels
		};

		var pol = document.getElementById("Polar").getContext("2d");

		new Chart(pol, {
			data: data,
			type: 'polarArea',
			options: {
				elements: {
					arc: {
						borderColor: "#B0E0E6"
					}
				}
			}
		});

	})


})

app.controller('web',function ($scope,$http) {
	$http({
		"url":"/avg",
		"method":"GET"
	}).success(function (data) {
		var tlabels=[];
		var tvals=[];

		for(i in data)
		{
			tlabels.push(data[i].city);
			tvals.push(data[i].avg);
		}

		$http({
			url:"/avgHumid",
			method:"GET"
		}).success(function (data) {
			var hlabels=[];
			var hvals=[];


			for(i in data)
			{
				hlabels.push(data[i].city)
				hvals.push(data[i].avghumid);
			}

			var data = {
				labels: tlabels,
				datasets: [
					{
						label: "Average Temperature",
						backgroundColor: "rgba(179,181,198,0.2)",
						borderColor: "rgba(179,181,198,1)",
						pointBackgroundColor: "rgba(179,181,198,1)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgba(179,181,198,1)",
						data: tvals
					},
					{
						label: "Average Humidity",
						backgroundColor: "rgba(255,99,132,0.2)",
						borderColor: "rgba(255,99,132,1)",
						pointBackgroundColor: "rgba(255,99,132,1)",
						pointBorderColor: "#fff",
						pointHoverBackgroundColor: "#fff",
						pointHoverBorderColor: "rgba(255,99,132,1)",
						data: hvals
					}
				]
			};
			var rad = document.getElementById("Radar").getContext("2d");

			new Chart(rad, {
				data: data,
				type: 'radar',
				options: {
					elements: {
						arc: {
							borderColor: "#B0E0E6"
						}
					}
				}
			});


		});
	});


})

app.controller('line',function ($scope,$http,$timeout) {

	var labels=[];
	var vals=[];
	var city=[];

		$http({
			url:'/liveFeed',
			method:"GET"
		}).success(function (rows) {

			// alert(JSON.stringify(rows));

			for(i in rows) {
				labels.push(rows[i].timestamp);
				vals.push(rows[i].temperature);
				city.push(rows[i].city);
                //
				// if(vals[i]==undefined)
				// 	for(j in rows)
				// 		vals[j]=[]
                //
				// if(vals[i]!=undefined)
				// 	vals[i].push(rows[i].temperature+vals[i]);
                //
                //
				// if (vals[i].length > 5)
				// 	vals[i].splice(0, 1);
                //
				// if(labels.length>5)
				// 	labels.splice(0,1);
                //
				// datasets[i] = {
				// 	label: rows[i].city,
				// 	backgroundColor: "red",
				// 	// borderColor: "orange",
				// 	data: vals[i],
				// }
			}



			var data = {
				labels:labels,
				datasets: [{
					label:city,
					backgroundColor: "red",
					borderColor: "orange",
					data: vals,
				}]
			};

			var rad = document.getElementById("line").getContext("2d");

			var myLineChart = new Chart(rad, {
				type: 'bar',
				data: data,
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
							}
						}]
					}
				}
			});

			latestLabel=["A","B","C","D","E"]

			var i=0;
			setInterval(function(){
				// // Add two random numbers for each dataset
				// myLineChart.addData([Math.random() * 100, Math.random() * 100], ++latestLabel);
				// // Remove the first point so we dont just add values forever
				// myLineChart.removeData();
				cities=["Palo Alto","Cupertino","Mountain View","San Pedro","Zanker Road","Tasman","Japantown"]

				times=["2016-12-08 10:34:12","2016-12-08 10:35:12","2016-12-08 10:36:12","2016-12-08 10:37:12","2016-12-08 10:38:12","2016-12-08 10:39:12","2016-12-08 10:40:12"]

				rvalues=["56","52","57","63","58","60","61"]



				myLineChart.data.labels.push(new Date(Date.now()).toISOString().slice(0,21));
				myLineChart.data.datasets[0].label.push(cities[i]);
				myLineChart.data.datasets[0].data.push(rvalues[i]);

				myLineChart.data.labels.splice(0,1);
				myLineChart.data.datasets[0].label.splice(0,1);
				myLineChart.data.datasets[0].data.splice(0,1);

				i++;
				if(i>6)
					i=0;
				myLineChart.update();
			}, 3000);

		});

})