app.controller('teacherCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){
// console.log($rootScope.currentUser.userId);
// static id (dev) = 1990551
    var teacher_id = 1990551;
//create class
$scope.openCreateClass = function(){
    $scope.openOverlay = true;
    $scope.creatingClass = true;
}
$scope.closeCreateClass = function(){
    $scope.openOverlay = false;
}
$scope.openGradingScale = function(){
    $scope.gradingScale = true;
    $scope.creatingClass = false;
}
$scope.closeGradingScale = function(){
    $scope.gradingScale = false;
    $scope.creatingClass = true;
}
$scope.createNewClass = function(newClass){
    newClass.teacher_id = teacher_id;
    newClass.class_id = newClass.class_name + '-' + Math.floor((Math.random()*9000000 ) + 999999);

    $http.post('/teacher/newClass', newClass).success(function(data){
       $scope.viewTeacherClass(teacher_id);
    });
    $scope.openOverlay = false;
    $scope.gradingScale = false;
    $scope.newClass = "";
}

$scope.viewTeacherClass = function(teacher_id){
    $http.get('/teacher/viewClass/' + teacher_id).success(function(data){
    $scope.classList = data;
    //about sa student count, eh search yeah ang database sang students kag e count base in their class_id
    });
}

$scope.viewTeacherClass(teacher_id); //get teacher class list

$scope.classList = true; //teacher classes view
$scope.teacherClass = false; //teacher class view
$scope.showAttendance = false; //attendace view
$scope.studentsList = false; //students view
$scope.studentQuiz = false; // assignments
$scope.studentsLab = false; // lab
$scope.studentExam = false; //exam
$scope.teacherSettings = false; // settings
$scope.accountSettings = false; // accounts
//navigation
$scope.selectClass = function(classInfo){ // class
    $scope.teacherClass = true;
    $scope.classInfo = classInfo;
    $scope.classList = false;
}
$scope.goToAccountSettings = function(){ //account settings
    $scope.accountSettings = true;

    $scope.classList = false;
    $scope.teacherClass = false;
    $scope.showAttendance = false; 
    $scope.studentsList = false;
    $scope.studentQuiz = false;
    $scope.studentAssignments = false;
    $scope.studentsLab = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
}
$scope.goBackToClassList = function(){ /// classes
    $scope.viewTeacherClass(teacher_id);
    $scope.classList = true;

    $scope.teacherClass = false;
    $scope.showAttendance = false; 
    $scope.studentsList = false;
    $scope.studentQuiz = false;
    $scope.studentAssignments = false;
    $scope.studentsLab = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.goBackToClass = function(){ //class
    $scope.teacherClass = true;

    $scope.showAttendance = false;
    $scope.studentsList = false;
    $scope.studentQuiz = false;
    $scope.studentAssignments = false;
    $scope.studentsLab = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.viewAttendance = function(){ // attendance
    $scope.showAttendance = true;

    $scope.teacherClass = false;
    $scope.classList = false;
    $scope.studentsList = false;
    $scope.studentQuiz = false;
    $scope.studentAssignments = false;
    $scope.studentsLab = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.viewStudents = function(){ //student list

    $scope.studentsList = true;

    $scope.classList = false;
    $scope.showAttendance = false;
    $scope.teacherClass = false;
    $scope.studentQuiz = false;
    $scope.studentAssignments = false;
    $scope.studentsLab = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.viewQuiz = function(){ //view quiz
    $scope.studentQuiz = true;

    $scope.studentAssignments = false;    
    $scope.studentsList = false;
    $scope.classList = false;
    $scope.showAttendance = false;
    $scope.teacherClass = false;
    $scope.studentsLab = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.viewAssignments = function(){ // view assignments
    $scope.studentAssignments = true;

    $scope.studentQuiz = false;
    $scope.studentsList = false;
    $scope.classList = false;
    $scope.showAttendance = false;
    $scope.teacherClass = false;
    $scope.studentsLab = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.viewLab = function(){ //view lab
    $scope.studentsLab = true;

    $scope.studentAssignments = false;
    $scope.studentQuiz = false;
    $scope.studentsList = false;
    $scope.classList = false;
    $scope.showAttendance = false;
    $scope.teacherClass = false;
    $scope.studentExam = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.viewExam = function(){ //view exam
    $scope.studentExam = true;

    $scope.studentsLab = false;
    $scope.studentAssignments = false;
    $scope.studentQuiz = false;
    $scope.studentsList = false;
    $scope.classList = false;
    $scope.showAttendance = false;
    $scope.teacherClass = false;
    $scope.teacherSettings = false;
    $scope.accountSettings = false;
}
$scope.viewSettings = function(){ //view setting
    $scope.teacherSettings = true;

    $scope.studentExam = false;
    $scope.studentsLab = false;
    $scope.studentAssignments = false;
    $scope.studentQuiz = false;
    $scope.studentsList = false;
    $scope.classList = false;
    $scope.showAttendance = false;
    $scope.teacherClass = false;
    $scope.accountSettings = false;
}

//directives
    app.directive('aa', function(){
        return{
            scope:{},
            restrict:"E",
            link: function(scope, element, attrs){
                
            element.on( 'click',function ( event ){
                console.log('ok dokie');
            } );

            }
        };
    });
    app.directive('closeView', function(){
        return{
            scope:{},
            restrict:"E",
            link: function(scope, element, attrs){
                
            element.on( 'click',function ( event ){
                $(this).hide();
                console.log('shiT!');
            } );

            }
        };
    });
}]);