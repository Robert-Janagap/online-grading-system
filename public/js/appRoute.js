var app = angular.module('projectRouter',['ngRoute']);
/*
	restart the curriculum
 */
app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'index.html',
			title: 'Bacolod City College'
		})
		.otherwise({
			redirectTo: '/'
		});
});

