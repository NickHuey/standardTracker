(function() {
    'use strict';
    
angular.module('starter.services',[])
.factory('trackerAPI', function($http) {
  // Might use a resource here that returns a JSON array
  
  var groups = [];
  var successCallBack = function(response){
                     groups = response.data;
                 };
                 
            var errCallBack = function(response){
                    $scope.error = response.data;
                    $log.info(response);
                 };
            
            
           
        $http.get('http://edtechapi.azurewebsites.net/api/edtech/getgroups/', {params:{"id":1}})
                 .then(successCallBack,errCallBack);
                 
                 
 

  return {
    all: function() {
      return groups;
    },
    remove: function(chat) {
      groups.splice(groups.indexOf(chat), 1);
    },
    get: function(id) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].id === parseInt(id)) {
          return groups[i];
        }
      }
      return null;
    }
  };
})


.factory('Students',function($http, $log){
        var students = [];
        
        var successCallBack = function(response){
                    students = response.data;
                    return students;
                    };
                 
        var errCallBack = function(response){
                     $log.info(response);
                    };
        
  return {
    all: function(id) {
         return $http.get('http://edtechapi.azurewebsites.net/api/edtech/getgroupstudents/', {params:{"id":id}})
                 .then(successCallBack,errCallBack); 
    },
    
    remove: function(id) {
      students.splice(students.indexOf(id), 1);
    },
    
    get: function(id) {
      for (var i = 0; i < students.length; i++) {
        if (students[i].studentid === parseInt(id)) {
          return students[i];
        }
      }
      return null;
    },
   
    studentdetail: function(id) {
        return $http.get('http://edtechapi.azurewebsites.net/api/edtech/getstudenttracking/', {params:{"id":id}})
                 .then(successCallBack,errCallBack); 
    }
  };
});

})();
