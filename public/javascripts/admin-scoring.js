var app = angular.module('adminIndex', ['ngRoute']);
var socket;

app.controller('mainController', ($scope, $http) => {
		$scope.init = function() {
			socket = io.connect('http://192.168.1.100:3000');

	    	socket.on('connect', function() {
				socket.emit('admin-connection', 'This is admin requesting to gain access to server');
			});

			socket.on('disconnect', function(){
				alert('Server Connection Lost');
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