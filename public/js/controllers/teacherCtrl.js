app.controller('teacherCtrl', ['$scope', '$http', '$location','$rootScope','$routeParams', function($scope, $http, $location, $rootScope, $routeParams){

//dynamic
 var teacher_id = $rootScope.currentUser.userId;
 var teacher_name = $rootScope.currentUser.name;
 var term ="prelim";
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

        //assignments
        for (var i = 0; i < data.length; i++) {
            var totalAssignments = 0;
            var totalScore = 0;
            var labPercent = data[i].assignments;
            var equal = 0;
            for (var a = data[i].assignments_record.length - 1;a >=0; a--) {
                totalAssignments += data[i].assignments_record[a].score;
                totalScore += data[i].assignments_record[a].totalScore;


                equal = (totalAssignments / totalScore) * labPercent;
                data[i].totalAssignments = equal.toFixed(2);
                data[i].equals = equal;

            }

        }
        //lab
        for (var i = 0; i < data.length; i++) {
            var total = 0;
            var totalScores = 0;
            var percent = data[i].laboratory;
            var equal = 0;
            
            for (var a = data[i].laboratory_record.length - 1;a >=0; a--) {
                total += data[i].laboratory_record[a].score;
                totalScores += data[i].laboratory_record[a].totalScore;


                equal = (total / totalScores) * percent;
                data[i].totalLab= equal.toFixed(2);
                data[i].equals = equal;
            }

        }
        //quiz
        for (var i = 0; i < data.length; i++) {
            var total = 0;
            var totalScores = 0;
            var percent = data[i].quiz;
            var equal = 0;
            
            for (var a = data[i].quiz_record.length - 1;a >=0; a--) {
                total += data[i].quiz_record[a].score;
                totalScores += data[i].quiz_record[a].totalScore;


                equal = (total / totalScores) * percent;
                data[i].totalQuiz= equal.toFixed(2);
                data[i].equals = equal;
            }
        }
        //exam
        for (var i = 0; i < data.length; i++) {
            var total = 0;
            var totalScores = 0;
            var percent = data[i].exam;
            var equal = 0;
            for (var a = data[i].exam_record.length - 1;a >=0; a--) {
                total += data[i].exam_record[a].score;
                totalScores += data[i].exam_record[a].totalScore;


                equal = (total / totalScores) * percent;
                data[i].totalExam= equal.toFixed(2);
                data[i].equals = equal;
            }
        }
        //attendance
        for (var i = 0; i < data.length; i++) {
            var total = 0;
            var totalScores = 0;
            var percent = data[i].attendance;
            var equal = 0;
            for (var a = data[i].attendance_record.length - 1;a >=0; a--) {
                total += data[i].attendance_record[a].score;
                totalScores = data[i].attendance_record.length;

                equal = (total / totalScores) * percent;
                data[i].totalAttendance= equal.toFixed(2);
                data[i].equals = equal;
            }
        }
        $scope.grade = function(g1, g2, g3, g4, g5){
            var total = parseFloat(g1) + parseFloat(g2) + parseFloat(g3) + parseFloat(g4) + parseFloat(g5);
            return total.toFixed(2);
        }
    });

}
$scope.viewPrelim = function(){
    $scope.term = "prelim";
    var display = [];
    $http.get('/teacher/classStudents/' + $scope.classInfo.class_id).success(function(data){
        $scope.studentClassList = data;

            for (var a = data[1].attendance_record.length - 1;a >=0; a--) {
                if($scope.term === data[1].attendance_record[1].term){
                    display.push(data[1].attendance_record[1]);
                }
            }
            console.log(display);


    });
}
$scope.viewMid = function(){
    $scope.term = "midterm";
    var display = [];   
    $http.get('/teacher/classStudents/' + $scope.classInfo.class_id).success(function(data){
        $scope.studentClassList = data;

        for (var a = data[1].attendance_record.length - 1;a >=0; a--) {
            if($scope.term === data[1].attendance_record[1].term){
                display.push(data[1].attendance_record[1]);
            }
        }
        console.log(display);
            

    });
}
$scope.saveAttendance = function(entryData , dateToday){
    var act_id = dateToday +'-' +Math.floor(Math.random()*1000000 + 2000000);


    entryData.activity_id = act_id;
    entryData.activity_name = dateToday;
    entryData.activity_date= dateToday;
    entryData.term = $scope.term || term;
    

    if(entryData.checkAttendance){
        entryData.score = 1;
        $http.put('/teacher/newAttendance', entryData).success(function(data){
            console.log('present');
        });
    }else{
        entryData.score = 0;
        $http.put('/teacher/newAttendance', entryData).success(function(data){
            console.log('not present');
        });
    }
}

$scope.saveQuiz = function(newQuiz, studentInfo, scoreQuiz){
    var act_id = Math.floor(Math.random()*1000000 + 2000000);


    studentInfo.activity_id = act_id;
    studentInfo.activity_date= $scope.dateToday;
    studentInfo.term = term;
    studentInfo.totalScore = newQuiz.totalScore;
    studentInfo.score = scoreQuiz.score;
    studentInfo.activity_name = newQuiz.activity_name;


    $http.put('/teacher/newQuiz', studentInfo).success(function(data){
        console.log(data)
    });

}

$scope.saveAssign = function(newAssign, studentInfo, scoreAssign){
    var act_id = Math.floor(Math.random()*1000000 + 2000000);


    studentInfo.activity_id = act_id;
    studentInfo.activity_date= $scope.dateToday;
    studentInfo.term = term;
    studentInfo.totalScore = newAssign.totalScore;
    studentInfo.score = scoreAssign.score;
    studentInfo.activity_name = newAssign.activity_name;


    $http.put('/teacher/newAssign', studentInfo).success(function(data){
        console.log(data)
    });

}
$scope.saveLab = function(newLab, studentInfo, scoreLab){
    var act_id = Math.floor(Math.random()*1000000 + 2000000);


    studentInfo.activity_id = act_id;
    studentInfo.activity_date= $scope.dateToday;
    studentInfo.term = term;
    studentInfo.totalScore = newLab.totalScore;
    studentInfo.score = scoreLab.score;
    studentInfo.activity_name = newLab.activity_name;


    $http.put('/teacher/newLab', studentInfo).success(function(data){
        console.log(data)
    });

}
$scope.saveExam = function(newExam, studentInfo, scoreExam){
    var act_id = Math.floor(Math.random()*1000000 + 2000000);


    studentInfo.activity_id = act_id;
    studentInfo.activity_date= $scope.dateToday;
    studentInfo.term = term;
    studentInfo.totalScore = newExam.totalScore;
    studentInfo.score = scoreExam.score;
    studentInfo.activity_name = newExam.activity_name;


    $http.put('/teacher/newExam', studentInfo).success(function(data){
        console.log(data)
    });

}

$scope.restartView = function(){
    $http.get('/teacher/classStudents/' + $scope.classInfo.class_id).success(function(data){
        $scope.studentClassList = data;
    });
}
$scope.closeQuiz = function(){
    $scope.viewQuizConfig = false;
    $scope.restartView();
}
$scope.closeAttendance = function(){
    $scope.studentAttendance = false;
    $scope.restartView();
}
$scope.showAssignment = function(){
    $scope.viewAssignConfig = true;
}
$scope.closeAssign = function(){
    $scope.viewAssignConfig = false;
    $scope.restartView();
}
$scope.showLab = function(){
    $scope.viewLabConfig = true;
}
$scope.closeLab = function(){
    $scope.viewLabConfig = false;
    $scope.restartView();
}
$scope.showExam = function(){
    $scope.viewExamConfig = true;
}
$scope.closeExam = function(){
    $scope.viewExamConfig = false;
    $scope.restartView();
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