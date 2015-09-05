// Collection
angular.module("recordApp")
.directive("collection", function() {
    return {
        templateUrl: 'collection/collection.html',
    };
})
.factory('CollectionService', function($http) {
    var collectionServiceInstance;

    var collection = {
        records: [],
    };

    var load_collection = function() {
        $http.get("/api/records")
        .then(function(success_response) {
            collection.records = success_response.data;
        }, function(failure_response) {
            console.log(failure_response);
        });
    };

    var remove_item_from_collection = function(item) {
        var index = collection.records.indexOf(item);
        if (index > -1) {
            collection.records.splice(index, 1);
        }

    };

    var add_item_to_collection = function(item) {
        collection.records.push(item);
    };

    collectionServiceInstance = {
        collection: collection,
        load_collection: load_collection,
        add_item_to_collection: add_item_to_collection,
        remove_item_from_collection: remove_item_from_collection,
    };
    return collectionServiceInstance;

})
.controller("CollectionController", ['$scope', '$http', 'CollectionService', function($scope, $http, CollectionService) {
    $scope.records = [];

    $scope.$watch(function() {
        return CollectionService.collection.records;
    }, function(newValue, oldValue, scope) {
        if (newValue != oldValue) {
            $scope.records = newValue;
        }
    }, true);

}]);
