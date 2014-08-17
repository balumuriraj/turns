//This controller retrieves data from the multimediaService and associates it with the $scope
//The $scope is ultimately bound to the multimedia view

app.controller('god-Controller', [ '$scope', '$route', '$location', 'authService', '$filter', 'activityService', function ($scope, $route, $location, authService, $filter, activityService) {

    $scope.userloggedin;
    $scope.userdetails = {'name': '', 'email': '', 'friends': '', 'groups': ''};

    /**** Add turn ****/
    var activityId;
    $scope.loading = false;
    $scope.inputerror = false;

    $scope.mainuser = {
        'name': '',
        'email': '',
        'activities': ''
    };

    $scope.turn = {
        'emailId': '',
        'groupId': ''
    };

    function init() {

        if(authService.isLoggedIn())
        {
            $scope.userloggedin = {'value': true};
            authService.getUserDetails()
                .success(function(responseData) {
                    $scope.userdetails.name = responseData.name;
                    $scope.userdetails.email = responseData.email;
                    $scope.userdetails.friends = responseData.friends;
                    $scope.userdetails.groups = responseData.groups;

                    $scope.turn.emailId = responseData.email;
                    $scope.turn.groupId = responseData.groups[0].id;

                    $scope.mainuser.name = responseData.name;
                    $scope.mainuser.email = responseData.email;
                    $scope.mainuser.activities = responseData.groups;

                    activityId = $scope.userdetails.groups[0].id;
                    $scope.currentactivity = $filter('filter')($scope.mainuser.activities, {id: activityId})[0];
                });
        }
        else{
            $scope.userloggedin = {'value': false};
            $scope.userdetails = {'name': '', 'email': '', 'friends': '', 'groups': ''};
        };
    };

    $scope.selectmember = function(member) {
        $scope.mainuser.name = member.name;
        $scope.mainuser.email = member.emailId;
        $scope.turn.emailId = member.emailId;
        closememberlist();
    };

    $scope.selectactivity = function(activity) {
        $scope.currentactivity = $filter('filter')($scope.mainuser.activities, {id: activity.id})[0];
        $scope.mainuser.name = $scope.userdetails.name;
        $scope.mainuser.email = $scope.userdetails.email;
        $scope.turn.emailId = $scope.userdetails.email;
        $scope.turn.groupId = activity.id;
        activityId = activity.id;
        closeactivitylist();
    };

    $scope.submitturn = function () {
        $scope.loading = true;
        console.log("Adding turn...");
        activityService.addTurn($scope)
            .success(function(responseData) {
                console.log("Add turn Success.............................");
                closeaddturn();
                console.log("Calling Group id: " + activityId);
                $location.path('/activities/'+activityId);
                $route.reload();
            });

    };

    $scope.addturn = function() {
        init();
        openaddturn();
    };

    $scope.signout = function() {
        authService.logoutUser();
        $scope.userloggedin.value = false;
        $scope.userdetails = {'name': '', 'email': '', 'friends': '', 'groups': ''};
        $location.path('/login');
    };

    init();

}]);

app.controller('main-Controller', [ '$scope', function ($scope) {

    $scope.activities = [
        {
            'objectID': '123',
            'name': 'Roomies'
        },
        {
            'objectID': '234',
            'name': 'Dinner'
        },
        {
            'objectID': '345',
            'name': 'Lunch'
        },
        {
            'objectID': '456',
            'name': 'Washing'
        }
    ];

    $scope.friends = ['Robin Van Persie', 'Shinjin Kagawa', 'Juan Mata', 'Ander Herera'];

}]);



