/**
 * Created by MohanRaj on 7/30/2014.
 */

"use strict";

app.factory('activityService', ['$http', '$cookieStore', function ($http, $cookieStore) {

    var baseUrl = 'http://turnsapi.herokuapp.com';

    return {
        addActivity: function(activity, $scope){

            var encodedcreds = $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/addGroup',
                method: "POST",
                data: activity
            })
                .success(function(responseData) {
                    console.log("Activity added : " + responseData.status);
                    $scope.loading = false;
                })
                .error(function(data) {
                    console.log("Add activity failed : " + data);
                    $scope.inputerror = true;
                    $scope.loading = false;
                });
        },

        addMember: function(activityId, $scope){

            var encodedcreds = $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/group/addMember/'+ activityId,
                method: "POST",
                data: $scope.thismember
            })
                .success(function(responseData) {
                    console.log("Activity member added : " + responseData.status);
                    $scope.memberloading = false;
                })
                .error(function(data) {
                    console.log("Add activity member failed : " + data);
                    $scope.inputerror = true;
                    $scope.memberloading = false;
                });
        },

        deleteMemberForGroup: function(id, $scope){

            var encodedcreds = $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/group/deleteMember/' + id,
                method: "POST",
                data: $scope.delmember
            })
                .success(function(responseData) {
                    console.log("Member deleted : " + responseData.status);
                    $scope.activityloading = false;
                })
                .error(function(data) {
                    console.log("Delete Member failed : " + data);
                    $scope.activityloading = false;
                });
        },

        addTurn: function($scope){

            var encodedcreds = $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/addlog',
                method: "POST",
                data: $scope.turn
            })
                .success(function(responseData) {
                    console.log("Turn added : " + responseData.status);
                    $scope.loading = false;
                })
                .error(function(data) {
                    console.log("Add turn failed : " + data);
                    $scope.inputerror = true;
                    $scope.loading = false;
                });
        },

        deleteTurn: function($scope){

            var encodedcreds = $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/deletelog',
                method: "POST",
                data: $scope.deletelog
            })
                .success(function(responseData) {
                    console.log("Turn deleted : " + responseData.status);
                })
                .error(function(data) {
                    console.log("delete turn failed : " + data);
                });
        },

        getActivityLog: function(activityId){

            var encodedcreds = $cookieStore.get('creds');
            var startdate = new Date();
            var currentdate = new Date();
            startdate.setDate(startdate.getDate()-10);

            var starttime = startdate.getTime();
            var currenttime = currentdate.getTime();

            console.log("calling... "+ activityId+'/'+starttime+'/'+currenttime)
            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/log/'+activityId+'/'+starttime+'/'+currenttime,
                method: "GET"
            })
                .success(function(responseData) {
                    console.log("Activity Log : " + responseData);
                })
                .error(function(data) {
                    console.log("Get activity failed : " + data);
                });
        }
    }
}]);