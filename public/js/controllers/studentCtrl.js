app.controller('studentCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
// console.log($rootScope.currentUser.userId);
//dynamic
var user_id = $rootScope.currentUser.userId;
var student_name = $rootScope.currentUser.name;
//static
    //var user_id = 5040486;
    //var student_name = "Robert Janagap";

    $scope.studentClasses = true; // class list
    $scope.searchClass = false; // search class
    $scope.classSummary = false; // class summary
    $scope.gradingReport = false; //grading report
    //navigation
    $scope.studentClassList = function(){ // view student classes
        $scope.studentClasses = true;

        $scope.getClassList();
        $scope.gradingReport = false;
        $scope.classSummary = false;
        $scope.searchClass = false;
    }
    $scope.viewSummary = function(classInfo){ // view student class summary
        $scope.cInfo= classInfo;
        $scope.classSummary = true;

        $scope.studentClasses = false;
        $scope.gradingReport = false;
        $scope.searchClass = false;
    }
    $scope.showGradingReport = function(){ // view student class grading report
        $scope.gradingReport = true;

        $scope.studentClasses = false;
        $scope.classSummary = false;
        $scope.searchClass = false;
    }

    $scope.searchClassId = function(classId){ // seach class
        $scope.searchClass = true;

        $scope.classSummary = false;
        $scope.studentClasses = false;
        $scope.gradingReport = false;
        $http.get('/student/findClass/'+ classId).success(function(data){
            if(!data){
                $scope.noClassMgs = "No Class Id found";
            }else{
                $scope.noClassMgs =false;
                $scope.classInfo = data;
            }
        });
    }
    $scope.studentGetClass = function(classInfo){ //save class
        classInfo.student_id = user_id;
        classInfo.student_name = student_name;
        console.log(classInfo);
        $http.post('/student/joinClass', classInfo).success(function(data){
            $scope.getClassList();

            $scope.searchClass = false;
            $scope.studentClasses = true;
        })
    }
    $scope.getClassList = function(){ // get student classes
        $http.get('/student/classList/' + user_id).success(function(data){
            $scope.studentClass = data;
        });
    }
    $scope.getClassList();
}]);