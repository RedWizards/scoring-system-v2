var app = angular.module('adminIndex', ['ngRoute']);
var socket;

app.controller('mainController', ($scope, $http) => {
		$scope.init = function() {
			socket = io.connect('http://localhost:3000/admins');

	    	socket.on('connect', function() {
				// alert('Connected to Server');	
			});

			socket.on('disconnect', function(){
				// alert('Server Connection Lost');
			});

			//Judge Client request
			socket.on('judging-request', function(){
				
			});
		}

		$scope.startJudging = function(){
			socket.emit('judging-opened')
		}
	});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/views/admin-scoring.html'
		})
		.otherwise({
			templateUrl: '/views/admin-scoring.html'
		});
});