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
    $scope.viewSummary2 = function(){
        $scope.classSummary = true;

        $scope.showAttendance = false;
        $scope.studentClasses = false;
        $scope.gradingReport = false;
        $scope.searchClass = false;
        showGrade($scope.cInfo);
    }
    function showGrade(classInfo){
        $http.get('/student/yourClass/' + classInfo.student_id).success(function(data){
            // $scope.studentClassInfo = data;
            for (var i = 0; i < data.length; i++) {

                if(classInfo.class_id == data[i].class_id){
                    $scope.studentClassInfo = data[i];
                }

            }
            //assignments
            for (var i = 0; i < data.length; i++) {
                var totalAssignments = 0;
                var totalScore = 0;
                var labPercent = $scope.studentClassInfo.assignments;
                var equal = 0;
                for (var a = $scope.studentClassInfo.assignments_record.length - 1;a >=0; a--) {
                    totalAssignments += $scope.studentClassInfo.assignments_record[a].score;
                    totalScore += $scope.studentClassInfo.assignments_record[a].totalScore;


                    equal = (totalAssignments / totalScore) * labPercent;
                    $scope.studentClassInfo.totalAssignments = equal.toFixed(2);
                    $scope.studentClassInfo.equals = equal;

                }

            }
            //lab
            for (var i = 0; i < data.length; i++) {
                var total = 0;
                var totalScores = 0;
                var percent = $scope.studentClassInfo.laboratory;
                var equal = 0;
                
                for (var a = $scope.studentClassInfo.laboratory_record.length - 1;a >=0; a--) {
                    total += $scope.studentClassInfo.laboratory_record[a].score;
                    totalScores += $scope.studentClassInfo.laboratory_record[a].totalScore;


                    equal = (total / totalScores) * percent;
                    $scope.studentClassInfo.totalLab= equal.toFixed(2);
                    $scope.studentClassInfo.equals = equal;
                }

            }
            //quiz
            for (var i = 0; i < data.length; i++) {
                var total = 0;
                var totalScores = 0;
                var percent = $scope.studentClassInfo.quiz;
                var equal = 0;
                
                for (var a = $scope.studentClassInfo.quiz_record.length - 1;a >=0; a--) {
                    total += $scope.studentClassInfo.quiz_record[a].score;
                    totalScores += $scope.studentClassInfo.quiz_record[a].totalScore;


                    equal = (total / totalScores) * percent;
                    $scope.studentClassInfo.totalQuiz= equal.toFixed(2);
                    $scope.studentClassInfo.equals = equal;
                }
            }
            //exam
            for (var i = 0; i < data.length; i++) {
                var total = 0;
                var totalScores = 0;
                var percent = $scope.studentClassInfo.exam;
                var equal = 0;
                for (var a = $scope.studentClassInfo.exam_record.length - 1;a >=0; a--) {
                    total += $scope.studentClassInfo.exam_record[a].score;
                    totalScores += $scope.studentClassInfo.exam_record[a].totalScore;


                    equal = (total / totalScores) * percent;
                    $scope.studentClassInfo.totalExam= equal.toFixed(2);
                    $scope.studentClassInfo.equals = equal;
                }
            }
            //attendance
            for (var i = 0; i < data.length; i++) {
                var total = 0;
                var totalScores = 0;
                var percent = $scope.studentClassInfo.attendance;
                var equal = 0;
                for (var a = $scope.studentClassInfo.attendance_record.length - 1;a >=0; a--) {
                    total += $scope.studentClassInfo.attendance_record[a].score;
                    totalScores = $scope.studentClassInfo.attendance_record.length;

                    equal = (total / totalScores) * percent;
                    $scope.studentClassInfo.totalAttendance= equal.toFixed(2);
                    $scope.studentClassInfo.equals = equal;
                }
            }
            $scope.grade = function(g1, g2, g3, g4, g5){
                var total = parseFloat(g1) + parseFloat(g2) + parseFloat(g3) + parseFloat(g4) + parseFloat(g5);
                return total.toFixed(2);
            }
        });
    }
    $scope.viewSummary = function(classInfo){ // view student class summary
        $scope.cInfo= classInfo;
        $scope.classSummary = true;

        $scope.studentClasses = false;
        $scope.gradingReport = false;
        $scope.searchClass = false;
        showGrade(classInfo);
    }
    $scope.showGradingReportAssign = function(){ // view student class grading report
        $scope.class_name = "Assignments";
        $scope.gradingReport = true;

        $http.get('/student/yourClass/' + $scope.cInfo.student_id).success(function(data){
            // $scope.studentClassInfo = data;
            for (var i = 0; i < data.length; i++) {

                if($scope.cInfo.class_id == data[i].class_id){
                    $scope.student_name = data[i].student_name;
                    $scope.studentClassInfo = data[i].assignments_record;
                }

            }
        });

        $scope.studentClasses = false;
        $scope.classSummary = false;
        $scope.searchClass = false;
    }
     $scope.showGradingReportAtt = function(){ // view student class grading report
        $scope.class_name = "Attendance";
        $scope.gradingReport = true;

        $http.get('/student/yourClass/' + $scope.cInfo.student_id).success(function(data){
            // $scope.studentClassInfo = data;
            for (var i = 0; i < data.length; i++) {

                if($scope.cInfo.class_id == data[i].class_id){
                    $scope.student_name = data[i].student_name;
                    $scope.studentClassInfo = data[i].attendance_record;
                }

            }
        });

        $scope.showAttendance = true;

        $scope.studentClasses = false;
        $scope.classSummary = false;
        $scope.searchClass = false;
    }
     $scope.showGradingReportLab = function(){ // view student class grading report
        $scope.class_name = "Laboratory";
        $scope.gradingReport = true;

        $http.get('/student/yourClass/' + $scope.cInfo.student_id).success(function(data){
            // $scope.studentClassInfo = data;
            for (var i = 0; i < data.length; i++) {

                if($scope.cInfo.class_id == data[i].class_id){
                    $scope.student_name = data[i].student_name;
                    $scope.studentClassInfo = data[i].laboratory_record;
                }

            }
        });

        $scope.studentClasses = false;
        $scope.classSummary = false;
        $scope.searchClass = false;
    }
     $scope.showGradingReportQuiz = function(){ // view student class grading report
        $scope.class_name = "Quiz";
        $scope.gradingReport = true;

        $http.get('/student/yourClass/' + $scope.cInfo.student_id).success(function(data){
            // $scope.studentClassInfo = data;
            for (var i = 0; i < data.length; i++) {

                if($scope.cInfo.class_id == data[i].class_id){
                    $scope.student_name = data[i].student_name;
                    $scope.studentClassInfo = data[i].quiz_record;
                }

            }
        });

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
        $http.post('/student/joinClass', classInfo).success(function(data){
            $scope.getClassList();

            $scope.searchClass = false;
            $scope.studentClasses = true;
        });
    }
    $scope.getClassList = function(){ // get student classes
        $http.get('/student/classList/' + user_id).success(function(data){
            $scope.studentClass = data;
        });
    }
    $scope.getClassList();
}]);