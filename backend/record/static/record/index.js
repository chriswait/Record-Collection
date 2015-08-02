(function () {
    var app = angular.module("recordApp", []);

    // Ensure django and angular templating doesn"t clash
    app.config(function($interpolateProvider) {
        $interpolateProvider.startSymbol("{[{");
        $interpolateProvider.endSymbol("}]}");
    });

    app.controller("MainController", function($scope) {
    });

    // Collection
    angular.module("recordApp")
    .directive("collection", function() {
        return {
            template:"\
<div ng-controller='CollectionController'>\
    <record ng-repeat='record in records'></record>\
</div>",
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

    // Record
    angular.module("recordApp")
    .directive("record", function() {
        return {
            template: "\
<div ng-controller='RecordController'>\
    Thumb: <img ng-src='{{record.thumb}}' /><br />\
    Title: {{record.title}}<br />\
    Year: {{record.year}}<br />\
    Artists: <artist ng-repeat='artist in record.artists'></artist><br />\
    Tracks: <track ng-repeat='track in record.tracklist'></track><br />\
    Notes: {{record.notes}}<br /><br /><br />\
</div>",
        };
    })
    .controller("RecordController", function($scope) {
    });

    // Artist
    angular.module("recordApp")
    .directive("artist", function() {
        return {
            template: "\
<div>\
    {{artist.name}}\
</div>",
        };
    });
    // Track
    angular.module("recordApp")
    .directive("track", function() {
        return {
            template: "\
<div>\
    {{track.position}} {{track.duration}} {{track.title}}\
</div>",
        };
    });

})();
