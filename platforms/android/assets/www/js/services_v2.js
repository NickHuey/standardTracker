(function(){
    'use strict';
    
    angular.module('starter')
    .factory('trackerApi',['$http','$ionicLoading','$q','DSCacheFactory',trackerApi]);
    
    function trackerApi($http,$ionicLoading, $q, DSCacheFactory){
        self.groupCache = DSCacheFactory.get("groupCache");
        
    }
    
    function getGroups(id){
        var deferred = $q.defer(),
        cacheKey = 'groups',
        groupData = self.groupCache.get(cacheKey);
        
        if(groupData){
            console.log("Found data inside cache",groupData);
            deferred.resolve(groupData);
        }
        else {
            $http.get('http://edtechapi.azurewebsites.net/api/edtech/getgroupstudents/', {params:{"id":id}})
            .success(function(data) {
                console.log("Receieved data via HTTP");
                self.groupCache.put(cacheKey, data);
                deferred.resolve(data);
            })
            .error(function() {
                console.log("Error while making HTTP call.");
                deferred.reject();
            });
            }
            return deferred.promise;
        }
    
    
})();