/**
 * Created by MohanRaj on 7/27/2014.
 */

app.controller('login-Controller', [ '$scope', '$location', 'authService', function ($scope, $location, authService) {
    $scope.loading = false;
    $scope.loginerror = false;
    $scope.user = {email: '', password: ''};
    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            authService.loginUser($scope.user, $scope)
                .success(function(responseData) {

                    $scope.userloggedin.value = true;
                    $scope.userdetails.name = responseData.name;
                    $scope.userdetails.email = responseData.email;
                    $scope.userdetails.friends = responseData.friends;
                    $scope.userdetails.groups = responseData.groups;
                    $location.path('/dashboard');
                    $scope.user = {email: '', password: ''};
                    closesignin();
                });
            $scope.loading = true;
            $scope.loginerror = false;
        }

    };
}]);

app.controller('signup-Controller', [ '$scope', 'authService', function ($scope, authService) {
    $scope.loading = false;
    $scope.success = false;
    $scope.user = {name: '', email: '', password: ''};
    // function to submit the form after all validation has occurred
    $scope.submitForm = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
            authService.createUser($scope.user, $scope);
            $scope.loading = true;
        }

    };
}]);