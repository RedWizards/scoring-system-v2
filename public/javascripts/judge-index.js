var app = angular.module('judgeIndex', ['ngRoute']);
var socket;

app.controller('mainController', ($scope, $http) => {
		$scope.init = function() {
			socket = io.connect('http://192.168.1.100:3000');

	    	socket.on('connect', function() {
				socket.emit('judge-connection');
			});

			socket.on('disconnect', function(){
				alert('Server Connection Lost');
			});

			//Judging opened
			socket.on('judging-opened', function(){
				alert('Judging was just opened');
			});
		}
	});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/judge-landing.html'
		})
		.when('/judging-opened', {
			templateUrl: '/views/judge-opened.html'
		})
		.otherwise({
			templateUrl: '/views/judge-landing.html'
		});
});