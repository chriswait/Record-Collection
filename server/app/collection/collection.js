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
.controller("CollectionController", ['$scope', '$http', '$filter', 'CollectionService', 'FilterService', function($scope, $http, $filter, CollectionService, FilterService) {
    $scope.all_records = [];
    $scope.records = [];

    function update_records(new_records) {
        if (new_records != null) {
            $scope.all_records = new_records;
        }
        $scope.records = $filter('orderBy')($scope.all_records, FilterService.filter_options.sort_order);
        $scope.records = $filter('filterRecords')($scope.records);
    }

    // Watch for collection changes
    $scope.$watch(function() {
        return CollectionService.collection.records;
    }, function(newValue, oldValue, scope) {
        if (newValue != oldValue) {
            update_records(newValue);
        }
    }, true);
    
    // Watch for filter changes
    $scope.$watch(function() {
        return FilterService.filter_options;
    }, function(newValue, oldValue, scope) {
        if (newValue != oldValue) {
            update_records();
        }
    }, true);
}]);
