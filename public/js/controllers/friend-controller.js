/**
 * Created by MohanRaj on 7/27/2014.
 */

app.controller('friends-Controller', [ '$scope', '$location', 'authService', 'friendService', function ($scope, $location, authService, friendService) {

    $scope.userfriends;

    $scope.addfriend = function(){
        openaddfriend();
        $scope.inputerror = false;
        $scope.loading = false;
        $scope.friend = {name: '', emailId: ''};
        $scope.addfriendForm.$setPristine();
    };

    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            friendService.addFriend($scope.friend, $scope)
                .success(function() {
                    $scope.friend = {name: '', emailId: ''};
                    $scope.addfriendForm.$setPristine();
                    authService.getUserDetails()
                        .success(function(responseData) {
                            $scope.userfriends = responseData.friends;
                            closeaddfriend();
                        });
                });
            $scope.loading = true;
            $scope.inputerror = false;
        }

    };

    $scope.gotofriend = function(email) {
       $location.path('/friends/'+email);
    };

    init = function () {
        authService.getUserDetails()
            .success(function(responseData) {
                $scope.userfriends = responseData.friends;
            });
    };

    init();

}]);

app.controller('friend-Controller', [ '$scope', '$routeParams', 'authService', 'friendService', function ($scope, $routeParams, authService, friendService) {

    var currentfriendId = $routeParams.friendId;

    $scope.userfriend;
    $scope.useractivities;
    $scope.turncounter = 0;
    $scope.friendactivities = [];

    init = function () {
        authService.getUserDetails()
            .success(function(responseData) {
                $scope.userfriends = responseData.friends;

                for(var i=0; i<$scope.userfriends.length; i++){
                    if($scope.userfriends[i].email == currentfriendId){
                        $scope.userfriend = $scope.userfriends[i];
                        break;
                    }
                }

                $scope.useractivities = responseData.groups;

                for(var i=0; i<$scope.useractivities.length; i++){
                    for(var j=0; j<$scope.useractivities[i].members.length; j++) {
                        if ($scope.useractivities[i].members[j].emailId == currentfriendId) {
                            $scope.turncounter = $scope.turncounter + $scope.useractivities[i].members[j].count;
                            $scope.friendactivities.push($scope.useractivities[i]);
                        }
                    }
                }
            });
    };

    init();
}]);