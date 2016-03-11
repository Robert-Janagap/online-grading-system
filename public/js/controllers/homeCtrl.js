app.controller('homeCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
	$scope.newUsers = function(userData){
		var genNum = Math.floor((Math.random()*9000000 ) + 999999) + Math.floor((Math.random()*9999 ) + 99);
		userData.userId = genNum;

		if(userData.password != userData.confirmPassword){
			$scope.errMsg = "password does not match!";
		}else{
			$http.post('/sign-up', userData).success(function(data){
				if(data === 'exist'){
					$scope.errMsg = "Username already used!";
				}else{
					if(data.role === "teacher"){
						$location.url('/' + "teacher");
					}else if(data.role === "student"){
						$location.url('/' + "student");
					}
					$scope.newUser = "";
					$scope.errMsg =false;
				}
			});
		}
	}
	//login
	$scope.login = function(user){
		$http.post('/login', user).success(function(data){
			if(data.loginErr){
				$scope.logErrMsg = data.loginErr;
			}else{
				$rootScope.currentUser = data;
				$scope.logErrMsg = false;

				$http.post('/login', user).success(function(data){
					$rootScope.currentUser = data;
					$routeParams.page = data.username;
					// console.log($routeParams.page);
					userRoutes = ["administrator","teacher","student"];
						for (var i = userRoutes.length - 1; i >= 0; i--) {
							
							if(data.role == userRoutes[i]){
								$location.url('/' + userRoutes[i]);
							}
						
						}
				});
				// $http.post('/login', user).success(function(data){
				// 	$rootScope.currentUser = data;
				// 	console.log(data);
							
				// 			if(data){
				// 				$location.url('/' + data.username);
				// 				console.log(data.username);
				// 			}
						
				// });
			}
		})
	}
}]);