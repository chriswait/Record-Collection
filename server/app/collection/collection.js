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

    // Sorting
    $scope.sort_order = "";
    $scope.sort_title = function() { $scope.sort_order = "title"; };
    $scope.sort_rating = function() { $scope.sort_order = "rating"; };
    $scope.sort_year = function() { $scope.sort_order = "year"; };

    $scope.filter_text = "";
    $scope.filters = {
        to_download: false,
        unrated: false,
    };
    $scope.filter_records = function(record, index, array) {

        if ($scope.filters.to_download && (!record.to_download || record.downloaded)) return false;
        if ($scope.filters.unrated && record.rating != undefined) return false;

        if ($scope.filter_text) {
            var search = $scope.filter_text;
            var search_terms = search.split(" ");
            for (var i=0; i<search_terms.length; i++) {
                var search_term = search_terms[i].toUpperCase();
                var artist_match = false;
                for (var artistIndex=0; artistIndex<record.artists.length; artistIndex++) {
                    if (record.artists[artistIndex].name.toUpperCase().indexOf(search_term)!=-1) {
                        artist_match = true;
                        break;
                    }
                }
                return (
                    (record.title.toUpperCase().indexOf(search_term)!=-1) ||
                    (record.year.toString().toUpperCase().indexOf(search_term)!=-1) ||
                    artist_match
                );
            }
        }
        return true;
    };


}]);
