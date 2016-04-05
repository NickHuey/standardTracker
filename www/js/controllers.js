angular.module('starter.controllers',['angular.filter'])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Students) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.students = Students.all();
  $scope.remove = function(student) {
    Students.remove(student);
  };
})

.controller('groupStudentCtrl', function($scope, $stateParams, $log, Students) {
 
 var getStudents = Students.all($stateParams.groupID);
 
 getStudents.then(function(feed){
                    $scope.students = feed;
                    });
})
 
.controller('StudentDetailCtrl', function($scope, $stateParams, Students){
    var studentDetail = Students.studentdetail($stateParams.studentID);
    
    studentDetail.then(function(feed){
        $scope.studentdetail = feed;
        $scope.firstName = $scope.studentdetail[0].firstName;
        console.log($scope.firstName);
    })
    
    $scope.showValue = function(model){
        console.log(model);
    }
    
}) 

.controller('groupStandardsController',function($scope, $http, $log, $stateParams){
    $scope.loadStandards = function(){
    $http.get('http://edtechapi.azurewebsites.net/api/edtech/getGroupStandards/', {params:{"id":$stateParams.groupID}})
    .then(function(response){
        $scope.standards = response.data;
    },
    function(response){
        $scope.error = response.data;
    })
    };
 $scope.loadStandards();
})

.controller('studentController1', function($scope,$http,$log,$stateParams,$cordovaToast){
    
    $scope.showToast = function(message, duration, location) {
        $cordovaToast.show(message, duration, location).then(function(success) {
            console.log("The toast was shown");
        }, function (error) {
            console.log("The toast was not shown due to " + error);
        });
    }     
    
    //get the data
    $scope.loadDetail=function(){
        $http.get('http://edtechapi.azurewebsites.net/api/edtech/getstudenttracking/', {params:{"id":$stateParams.studentID}})
        .then(function(response){
            $scope.studentdetail = response.data;
            $scope.firstName = $scope.studentdetail[0].firstName
        },
        function(response){
            $scope.error = response.data;
        })
        }
        
        //load the data
        $scope.loadDetail();
        
        //save rating changes
        $scope.saveRating = function(students){
            console.log("Updating Students");
            console.log(students);
            $http.put('http://edtechapi.azurewebsites.net/api/edtech/putstudent',students)
            .then(function(data,status,headers,config){
            $scope.message = data;
            console.log(data);
            $scope.showToast('Saved','short','bottom');
                });
        }
        
          
            
    }) 


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller("studentController",function($scope, $http, $log) {
            
            //search() function
            //get students for ownerid
            
            var successCallBack = function(response){
                     $scope.students = response.data;
                 };
                 
            var errCallBack = function(response){
                    $scope.error = response.data;
                    $log.info(response);
                 };
            //$scope.ownerid=1;
            
            //$scope.search=function(){
            $http.get('http://edtechapi.azurewebsites.net/api/edtech/getstudents/', {params:{"id":$scope.ownerid}})
                 .then(successCallBack,errCallBack)
                 
            
            })
 
 .controller("classController",function($scope, $http, $log) {
            
            
            var successCallBack = function(response){
                     $scope.students = response.data;
                 };
                 
            var errCallBack = function(response){
                    $scope.error = response.data;
                    $log.info(response);
                 };
            
            $http.get('http://edtechapi.azurewebsites.net/api/edtech/getclassinfo/', {params:{"id":$scope.ownerid}})
                 .then(successCallBack,errCallBack)
                 
            
            })
            
 .controller("groupstudentController",function($scope, $http, $log, $stateParams) {
            
            //search() function
            //get students for ownerid
            
            var successCallBack = function(response){
                     $scope.students = response.data;
                 };
                 
            var errCallBack = function(response){
                    $scope.error = response.data;
                    $log.info(response);
                 };
            //$scope.groupID=100;
            
            //$scope.search=function(){
            $http.get('http://edtechapi.azurewebsites.net/api/edtech/getgroupstudents/', {params:{"id":$stateParams.groupID}})
                 .then(successCallBack,errCallBack)
                 
            
            })           
            
.controller("groupController",function($scope, $http, $log) {
             //search() function
            //get students for ownerid
            
            var successCallBack = function(response){
                     $scope.groups = response.data;
                 };
                 
            var errCallBack = function(response){
                    $scope.error = response.data;
                    $log.info(response);
                 };
            $scope.userid=1;
            
            $http.get('http://edtechapi.azurewebsites.net/api/edtech/getGroups/', {params:{"id":$scope.userid}})
                 .then(successCallBack,errCallBack)
                 
            
            });


