/**
 * Created by MohanRaj on 7/27/2014.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.

"use strict";

app.factory('friendService', ['$http', '$cookieStore', function ($http, $cookieStore) {

    var baseUrl = 'http://turnsapi.herokuapp.com';

    return {

        addFriend: function(friend, $scope){

            var encodedcreds = $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/addFriend',
                method: "POST",
                data: friend
            })
                .success(function(responseData) {
                    console.log("Friend added : " + responseData.Status);
                    $scope.loading = false;
                })
                .error(function(data) {
                    console.log("Add friend failed : " + data);
                    $scope.inputerror = true;
                    $scope.loading = false;
                });
        },

        deleteFriend: function($scope){

            var encodedcreds = $cookieStore.get('creds');

            $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedcreds;

            return $http({
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                url: baseUrl + '/rest/friend/deleteFriend',
                method: "POST",
                data: $scope.delfriend
            })
                .success(function(responseData) {
                    console.log("Friend deleted : " + responseData.status);
                    $scope.friendloading = false;
                })
                .error(function(data) {
                    console.log("Delete friend failed : " + data);
                    $scope.friendloading = false;
                });
        }
    };

}]);
