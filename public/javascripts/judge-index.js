var app = angular.module('judgeIndex', ['ngRoute', 'angularCSS']);
var socket;

app.controller('mainController', ($scope, $window) => {
	$scope.init = function() {
		socket = io.connect('http://192.168.110.100:3000/judges');

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

app.controller('registrationController', ($scope, $window) => {
	$scope.judging_request = function(){
		socket.emit('judging-request', {
			name: $('#input-container').val()
		});
	}
});

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			css: '/stylesheets/judge-view.css',
			templateUrl: '/views/judge-landing.html'
		})
		.when('/judging-opened', {
			css: '/stylesheets/judge-view.css',
			templateUrl: '/views/judging-opened.html',
			controller: 'registrationController'
		})
		.otherwise({
			redirectTo: '/'
		});
});