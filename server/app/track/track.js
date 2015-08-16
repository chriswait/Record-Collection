// Track
angular.module("recordApp")
.directive("track", function() {
    return {
        templateUrl: 'track/track.html',
    };
})
.controller("TrackController", ['$scope','panel', function($scope, panel) {
    $scope.panel = function(event) {
        event.stopPropagation();
        panel.open_item($scope);
    };
}]);
