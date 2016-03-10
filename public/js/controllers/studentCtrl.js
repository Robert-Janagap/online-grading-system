app.controller('studentCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
    
    $scope.studentClasses = true; // class list
    //navigation
    $scope.studentClassList = function(){
        $scope.studentClasses = true;

        $scope.gradingReport = false;
        $scope.classSummary = false;
    }
    $scope.viewSummary = function(){
        $scope.classSummary = true;
        $scope.studentClasses = false;
        $scope.gradingReport = false;
    }
    $scope.showGradingReport = function(){
        $scope.gradingReport = true;

        $scope.classSummary = false;
        $scope.studentClasses = false;
    }

}]);