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

// toggle log in modal
app.directive('toggleModal', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			
		 	element.on( 'click',function ( event ){
				$('.modal').toggleClass('show');
		    } );

		}
	};
});
