// Record
angular.module("recordApp")
.directive("record", function() {
    return {
        templateUrl: "record/record.html",
    };
})
.controller("RecordController", function($scope) {
  $scope.is_expanded=false;
});