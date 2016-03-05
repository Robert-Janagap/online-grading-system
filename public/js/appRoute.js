var app = angular.module('projectRouter',['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html'
		})
		.when('/teacher',{
			templateUrl: 'views/teachers.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

