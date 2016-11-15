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



	var ctx = document.getElementById("mycanvas").getContext("2d");
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: ["San Fransisco", "San Jose", "Vegas", "Los Angeles", "San Diego"],

			datasets: [{
				label: 'Average Temperature (Fahrenheit)',
				data: [12, 19, 3, 5, 2],
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


app.controller('density',function ($scope,$http) {
	var data = {

		datasets: [
			{
				label: 'San Fransisco',

				data: [
					{
						x: 20,
						y: 30,
						r: 15
					}

				],
				backgroundColor:"#B0E0E6",
				hoverBackgroundColor: "White",
			},
			{
				label: 'San Jose',
				data: [
					{
						x: 40,
						y: 40,
						r: 25
					}

				],
				backgroundColor:"#7851A9",
				hoverBackgroundColor: "White",
			},
			{
				label: 'Vegas',
				data: [
					{
						x: 30,
						y: 50,
						r: 15
					}

				],
				backgroundColor:"#4169E1",
				hoverBackgroundColor: "White",
			},
			{
				label: 'Los Angeles',
				data: [
					{
						x: 45,
						y: 47,
						r: 13
					}

				],
				backgroundColor:"#2B60DE",
				hoverBackgroundColor: "White",
			},
			{
				label: 'San Diego',
				data: [
					{
						x: 55,
						y: 60,
						r: 15
					}

				],
				backgroundColor:"#002366",
				hoverBackgroundColor: "White",
			}]
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

app.controller('pie',function ($scope,$http) {
	var data = {
		datasets: [{
			data: [
				11,
				16,
				7,
				3,
				14
			],
			backgroundColor: [
				"#FF6384",
				"#4BC0C0",
				"#FFCE56",
				"#E7E9ED",
				"#36A2EB"
			],
			label: 'My dataset' // for legend
		}],
		labels: [
			"San Fransisco",
			"San Jose",
			"Vegas",
			"Los Angeles",
			"San Diego"
		]
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

app.controller('web',function ($scope,$http) {
	var data = {
		labels: ["San Fransisco", "San Jose", "Vegas", "San Diego", "Los Angeles"],
		datasets: [
			{
				label: "This Week",
				backgroundColor: "rgba(179,181,198,0.2)",
				borderColor: "rgba(179,181,198,1)",
				pointBackgroundColor: "rgba(179,181,198,1)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(179,181,198,1)",
				data: [12, 19, 12, 5, 21]
			},
			{
				label: "Last Week",
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "rgba(255,99,132,1)",
				pointBackgroundColor: "rgba(255,99,132,1)",
				pointBorderColor: "#fff",
				pointHoverBackgroundColor: "#fff",
				pointHoverBorderColor: "rgba(255,99,132,1)",
				data: [15, 14,15, 9, 24]
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

})

app.controller('line',function ($scope,$http) {
	var data = {
		labels: ["1:00", "1:01", "1:02", "1:03", "1:04", "1:05", "1:06"],
		datasets: [
			{
				label: "San Fransisco",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "orange",
				borderColor: "orange",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [65, 66, 63, 67, 64, 65, 66],
				spanGaps: false,
			},
			{
				label: "San Jose",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "grey",
				borderColor: "dark grey",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [75,76, 74, 71, 73, 72, 75],
				spanGaps: false,
			},
			{
				label: "Vegas",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "Blue",
				borderColor: "Blue",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [55,54, 57, 56, 53, 55, 57],
				spanGaps: false,
			},
			{
				label: "Los Angeles",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "Brown",
				borderColor: "Brown",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [87,85, 84, 86, 83, 79, 80],
				spanGaps: false,
			},
			{
				label: "San Diego",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "Blue",
				borderColor: "Light Blue",
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [60,62, 64, 57, 59, 58, 61],
				spanGaps: false,
			},

		]
	};

	var rad = document.getElementById("line").getContext("2d");

	var myLineChart = new Chart(rad, {
		type: 'line',
		data: data
	});

})