var app = angular.module('projectRouter',['ngRoute']);


app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'homeCtrl'
		})
		.when('/teacher',{
			templateUrl: 'views/teachers.html',
			controller: 'teacherCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/student',{
			templateUrl: 'views/student.html',
			controller: 'studentCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.otherwise({
			redirectTo: '/'
		});
});

// check if the user login
var checkLogin = function($q, $timeout, $http, $location, $rootScope){
	var deferred = $q.defer();
	$http.get('/loggedin').success(function(data){
		$rootScope.errorMessage = null;
		//user is authenticated
		if(data !=='0'){
			$rootScope.currentUser = data;
			deferred.resolve();
		}else{ //user is not authenticated
			$rootScope.errorMessage = "can't find the username or password";
			$location.url('/');
			deferred.reject();
		}
	});
	return deferred.promise;
};

app.controller('navCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	$scope.logOut = function(){
		$http.post('/logout').success(function(data){
			$location.url('/');
			console.log('logout');
		});
	}
}]);

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
// open sign up form
app.directive('tabselect', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
		 	$('.content_view_tabs li').on('click', function(){
		 		$(this).parent().children('li').removeClass('active');
		 		$(this).addClass('active');
		 	});
		}
	};
});