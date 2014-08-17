var app = angular.module('turns',['ngRoute', 'ngCookies', 'filters', 'LocalStorageModule']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    
        .when('/',
            {
                controller: 'god-Controller',
                templateUrl: 'js/partials/home/home.html',
                access: true
            })
        .when('/login',
            {
                controller: 'login-Controller',
                templateUrl: 'js/partials/home/login.html',
                access: true
            })
        .when('/dashboard',
            {
                controller: 'dashboard-Controller',
                templateUrl: 'js/partials/dashboard/dashboard.html',
                access: false
            })
        .when('/activities',
            {
                controller: 'activities-Controller',
                templateUrl: 'js/partials/activities/activities.html',
                access: false
            })
        .when('/activities/allActivities',
        {
            controller: 'all-activities-Controller',
            templateUrl: 'js/partials/activities/allactivities.html',
            access: false
        })
        .when('/activities/addActivity',
        {
            controller: 'add-activity-Controller',
            templateUrl: 'js/partials/activities/addactivity.html',
            access: false
        })
        .when('/activities/:activityId',
            {
                controller: 'activity-Controller',
                templateUrl: 'js/partials/activities/activity.html',
                access: false
            })
        .when('/friends',
            {
                controller: 'friends-Controller',
                templateUrl: 'js/partials/friends/friends.html',
                access: false
            })
        .when('/friends/:friendId',
        {
            controller: 'friend-Controller',
            templateUrl: 'js/partials/friends/friend.html',
            access: false
        })
        .when('/settings',
            {
                controller: 'settings-Controller',
                templateUrl: 'js/partials/settings/settings.html',
                access: false
            })
        .when('/profile',
        {
            controller: 'profile-Controller',
            templateUrl: 'js/partials/profile/profile.html',
            access: false
        })
        .otherwise({ redirectTo: '/dashboard' });
})

.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService){
    // register listener to watch route changes
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        //alert(next.access + " " + authService.isLoggedIn());
        if(!next.access)
        {
            if(!authService.isLoggedIn())
            {
                $location.path('/login');
            }
        }
        else if(authService.isLoggedIn()) {
            $location.path('/dashboard');
        }
    });
}]);