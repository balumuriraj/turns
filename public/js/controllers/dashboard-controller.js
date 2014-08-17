/**
 * Created by MohanRaj on 7/27/2014.
 */

app.controller('dashboard-Controller', [ '$scope', function ($scope) {

    var today = new Date();
    $scope.currentdate = today.getTime();

    $scope.notifications = { 'results': [
        {
            'activity': 'Roomies',
            'icon': 'rocket3',
            'color': 'fbc73b'
        },
        {
            'activity': 'Dinner',
            'icon': 'rocket3',
            'color': '47a3da'
        },
        {
            'activity': 'Lunch',
            'icon': 'rocket3',
            'color': '7ea568'
        },
        {
            'activity': 'Washing',
            'icon': 'rocket3',
            'color': 'f06060'
        }

    ]}
}]);