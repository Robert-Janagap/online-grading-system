app.controller('teacherCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){

//dynamic
 var teacher_id = $rootScope.currentUser.userId;
 var teacher_name = $rootScope.currentUser.name;
 var term ="prelim"
// static id (dev) = 1990551
    //var teacher_id = 1990551;
    //var teacher_name = 'Robert Janagap';
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
    newClass.teacher_name = teacher_name;
    newClass.class_id = newClass.class_name + '-' + Math.floor((Math.random()*9000000 ) + 999999);

    $http.post('/teacher/newClass', newClass).success(function(data){
       $scope.viewTeacherClass(teacher_id);
    });
    $scope.openOverlay = false;
    $scope.gradingScale = false;
    $scope.newClass = "";
}

$scope.viewTeacherClass = function(teacher_id){
    $http.get('/teacher/studentList/' + teacher_id).success(function(data){
        $scope.studentList = data;
    });

    $http.get('/teacher/viewClass/' + teacher_id).success(function(data){
        $scope.classList = data;

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

$scope.selectClass = function(classInfo){ // class
    $scope.teacherClass = true;
    $scope.classInfo = classInfo; //class info
    $scope.classList = false;

    $http.get('/teacher/classStudents/' + classInfo.class_id).success(function(data){
        $scope.studentClassList = data;
    });

}

$scope.saveAttendance = function(entryData , dateToday){
    var act_id = dateToday +'-' +Math.floor(Math.random()*1000000 + 2000000);


    entryData.activity_id = act_id;
    entryData.activity_name = dateToday;
    entryData.activity_date= dateToday;
    entryData.term = term;
    

    if(entryData.checkAttendance){
        entryData.score = 1;
        $http.put('/teacher/newAttendance', entryData).success(function(data){
            console.log(data)
        });
    }else{
        entryData.score = 0;
        $http.put('/teacher/newAttendance', entryData).success(function(data){
            console.log(data)
        });
    }
}

$scope.saveQuiz = function(newQuiz){
    var act_id = dateToday +'-' +Math.floor(Math.random()*1000000 + 2000000);


    newQuiz.activity_id = act_id;
    newQuiz.activity_date= dateToday;
    newQuiz.term = term;

    $http.put('/teacher/newQuiz', newQuiz).success(function(data){
        console.log(data)
    });
}
$scope.closeQuiz = function(){
    $scope.viewQuizConfig = false;
}


//navigation
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
$scope.showQuizConfig = function(){
    $scope.viewQuizConfig = true;
}

$scope.closeAttendance = function(){
    $scope.studentAttendance = false;
    $http.get('/teacher/classStudents/' + $scope.classInfo.class_id).success(function(data){
        $scope.studentClassList = data;
    });
}
$scope.openAttendance = function(){
    $scope.studentAttendance = true;
}
function dateToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yy = today.getFullYear();
    
    if(dd<10) {
    dd='0'+dd
    } 

    if(mm<10) {
        mm='0'+mm
    } 

    today = mm + '/' + dd + '/' + yy;

    return $scope.dateToday = today;
}
function dayToday(){
       var d = new Date();
    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var n = weekday[d.getDay()]; 
    return $scope.dayToday = n;
}
dateToday();
dayToday();
$scope.newAttendance = function(){
    $scope.studentAttendance = true;
    
    dateToday();
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