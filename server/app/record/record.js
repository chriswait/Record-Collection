// Record
angular.module("recordApp")
.directive("record", function() {
    return {
        replace: true,
        templateUrl: "record/record.html",
        link: function(scope, element) {
        },
    };
})
.controller("RecordController", ['$scope','panel', function($scope, panel) {
    $scope.record.artist_names = $scope.record.artists.map(function(item) {
        return item.name;
    }).join(', ');

    $scope.panel = function(event) {
        event.stopPropagation();
        panel.open_item($scope);
    };
}]);
