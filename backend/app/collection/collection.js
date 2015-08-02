// Collection
angular.module("recordApp")
.directive("collection", function() {
    return {
        templateUrl: 'collection/collection.html',
    };
})
.controller("CollectionController", function($scope, $http) {
    $scope.records = [];
    $http.get("/api/records").
        then(function(success_response) {
            $scope.records = success_response.data;
            console.log($scope.records);
        }, function(failure_response) {
            console.log(failure_response);
        });
});
