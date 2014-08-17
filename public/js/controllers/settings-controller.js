/**
 * Created by MohanRaj on 8/9/2014.
 */

app.controller('settings-Controller', [ '$scope', 'authService', 'friendService', 'activityService', function ($scope, authService, friendService, activityService) {

    $scope.currentuser = {'name':'', 'email':'', 'activities':'', 'friends':''};
    $scope.friendloading = false;
    $scope.activityloading = false;

    function init(){
        authService.getUserDetails()
            .success(function(responseData) {
                $scope.currentuser.name = responseData.name;
                $scope.currentuser.email = responseData.email;
                $scope.currentuser.activities = responseData.groups;
                $scope.currentuser.friends = responseData.friends;
            });
    };

    $scope.deletefriend = function(friend) {
        $scope.delfriend = {'name': friend.name, 'email': friend.email};
        $scope.friendloading = true;

        console.log($scope.delfriend)

        friendService.deleteFriend($scope)
            .success(function (responseData) {
                init();
            });
    };

    $scope.deleteactivity = function(activity) {

        $scope.delmember = {'name': '', 'emailId': ''};
        $scope.activityloading = true;

        for(var i=0; i<activity.members.length; i++){
            $scope.delmember = {'name': activity.members[i].name, 'emailId': activity.members[i].emailId};

            console.log("Deleting.. " + $scope.delmember.name + $scope.delmember.emailId + " at " + activity.id)

            activityService.deleteMemberForGroup(activity.id, $scope)
                .success(function (responseData) {
                    init();
                });
        }
    }

    init();

}]);