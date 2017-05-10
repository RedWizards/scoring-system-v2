var app = angular.module('judgeIndex', ['ngRoute']);

app.controller('mainController', ($scope, $http) => {
		var socket;

		$scope.init = function() {
			socket = io.connect('http://localhost:3000');

	    	socket.on('connect', function() {
				socket.emit('judge-connection', 'This is judge client requesting to connect to server');
			});

			socket.on('disconnect', function(){
				alert('Server Connection Lost');
			});

			//Judging opened
			socket.on('judging-opened', function(){

			});
		}
	});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/judge-landing.html'
		})
		.otherwise({
			templateUrl: '/views/judge-landing.html'
		});
});