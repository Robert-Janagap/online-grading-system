var app = angular.module('projectRouter',['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html'
		})
		.when('/teacher',{
			templateUrl: 'views/teachers.html'
		})
		.when('/student',{
			templateUrl: 'views/student.html'
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
				$('.signUp').removeClass('signUp_toggle');
				$('.logIn').show();
		    } );

		}
	};
});
// open sign up form
app.directive('signUp', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			
		 	element.on( 'click',function ( event ){
				$('.logIn').hide();
				$('.signUp').toggleClass('signUp_toggle');
		    } );

		}
	};
});