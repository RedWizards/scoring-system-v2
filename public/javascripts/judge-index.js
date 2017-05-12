var app = angular.module('judgeIndex', ['ngRoute']);
var socket;

app.controller('mainController', ($scope, $window) => {
	$scope.init = function() {
		socket = io.connect('http://localhost:3000/judges');

	   	socket.on('connect', function() {
			// alert('Connected to Server');
		});

		socket.on('disconnect', function(){
			// alert('Server Connection Lost');
		});

		//Judging opened
		socket.on('judging-opened', function(){
			var url = "http://" + $window.location.host + "/#/judging-opened";
	        $window.location.href = url;
		});
	}
});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/judge-landing.html'
		})
		.when('/judging-opened', {
			templateUrl: '/views/judging-opened.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});