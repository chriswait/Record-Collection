// Record
angular.module("recordApp")
.directive("record", function() {
    return {
        templateUrl: "record/record.html",
    };
})
.controller("RecordController", ['$scope','panel', function($scope, panel) {
    $scope.is_expanded = false;
    $scope.panel = function(event) {
        event.stopPropagation();
        panel.open_panel($scope);
    };
}]);
