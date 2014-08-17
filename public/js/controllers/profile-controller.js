/**
 * Created by MohanRaj on 8/9/2014.
 */

app.controller('profile-Controller', [ '$scope', '$location', 'authService', function ($scope, $location, authService) {

    $scope.currentuser = {'name':'', 'email':'', 'activities':'', 'friends':''};

    authService.getUserDetails()
        .success(function(responseData) {
            $scope.currentuser.name = responseData.name;
            $scope.currentuser.email = responseData.email;
            $scope.currentuser.activities = responseData.groups;
            $scope.currentuser.friends = responseData.friends;
        });

    $scope.gotofriendspage = function(){
        $location.path('/friends');
    };

    $scope.gotoactivitiespage = function(){
        $location.path('/activities/allActivities');
    };
}]);