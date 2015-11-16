// Track
angular.module("recordApp")
.directive("track", function() {
    return {
        replace: true,
        templateUrl: 'track/track.html',
    };
})
.controller("TrackController", ['$scope','panel', function($scope, panel) {
    $scope.is_expanded = false;
    $scope.panel = function(event) {
        event.stopPropagation();
        panel.open_item($scope);
    };
}]);
