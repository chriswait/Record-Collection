// Panel
angular.module("recordApp")
.directive("panel", function() {
    return {
        templateUrl: "panel/panel.html",
    };
})
.service("panel", function($mdSidenav) {
    var selected_item;

    // Called from record or track controllers
    var open_item = function(scope_object) {
        // store the selected panel item
        if (scope_object.track) {
            selected_item = scope_object.track;
            selected_item.type = "track";
        } else if (scope_object.record) {
            selected_item = scope_object.record;
            selected_item.type = "record";
        }

        // open the panel
        $mdSidenav('right').open();
    };

    var add_item = function() {
        $mdSidenav('right').open();
        selected_item = null;
    };

    return {
        selected_item: function () {
            return selected_item;
        },
        open_item: open_item,
        add_item: add_item,
    };
})

.controller("PanelController", function($scope, $http, panel) {
    $scope.search = "";
    $scope.add = function() {
        var url;
        url = '/add_item';
        var data = {
            discogs_id: $scope.selected_item.id,
        };
        $http({
            url: url,
            method: "GET",
            params: data,
        });
    };

    // Watch for changes to the selected item
    $scope.$watch(function() {
        return panel.selected_item();
    }, function(value) {
        $scope.selected_item = value;
    });

    $scope.save = function() {
        var url;
        url = '/add_item';
        url = '/update_item';
        var data = {
            type: $scope.selected_item.type,
            id: $scope.selected_item.id,
            listening_notes: $scope.selected_item.listening_notes,
            rating: $scope.selected_item.rating,
        };
        $http({
            url: url,
            method: "GET",
            params: data,
        });
    };

});
