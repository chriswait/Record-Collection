// Filter
angular.module("recordApp")
.directive("filter", function() {
    return {
        templateUrl: "filter/filter.html",
    };
})
.factory("FilterService", function() {
    var sort_keys = ["title", "rating", "year"];
    var sort_order = "";
    var filter_text = "";
    var filters = {
        to_download: false,
        unrated: false,
    };
    return {
        filter_options: {
            filter_text: filter_text,
            sort_order: sort_order,
            sort_keys: sort_keys,
            filters: filters,
        },
    };
})
.filter('filterRecords', ['FilterService', function(FilterService) {
    var filters, filter_text;
    var should_include_record = function(record) {
        // Check filters
        if (filters.to_download && (!record.to_download || record.downloaded))
            return false;
        if (filters.unrated && record.rating != null)
            return false;

        if (!filter_text) return true;
        // Break search into words, search title, year and artists
        var search_terms = filter_text.split(" ");
        for (var i=0; i<search_terms.length; i++) {
            var search_term = search_terms[i].toUpperCase();

            // Check title and year
            if (record.title.toUpperCase().indexOf(search_term)!=-1) return true;
            if (record.year.toString().toUpperCase().indexOf(search_term)!=-1) return true;

            // Check artists
            for (var artistIndex=0; artistIndex<record.artists.length; artistIndex++) {
                if (record.artists[artistIndex].name.toUpperCase().indexOf(search_term)!=-1)
                    return true;
            }
            return false;
        }
        return false;
    };
    var filter_records = function(records) {
        filters = FilterService.filter_options.filters;
        filter_text = FilterService.filter_options.filter_text;
        var new_records = [];
        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            if (should_include_record(record))
                new_records.push(record);
        }
        return new_records;
    };
    return filter_records;
}])
.controller("FilterController", ['$scope', 'FilterService', function($scope, FilterService) {
    $scope.show_filters = true;

    $scope.filter_options = FilterService.filter_options;

    // Watch for changes to filters (from elsewhere)
    $scope.$watch(function() {
        return FilterService.filter_options;
    }, function(value) {
        $scope.filter_options = value;
    }, true);
}]);
