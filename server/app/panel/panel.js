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

    var close = function() {
        $mdSidenav('right').close();
    };

    return {
        selected_item: function () {
            return selected_item;
        },
        open_item: open_item,
        close: close,
    };
})

.controller("PanelController", ["$scope", "$http", "panel", "CollectionService", function($scope, $http, panel, CollectionService) {
    // Watch for changes to the selected item
    $scope.$watch(function() {
        return panel.selected_item();
    }, function(value) {
        $scope.selected_item = value;
    });

    $scope.save = function() {
        var url = '/update_item';
        $http({
            url: url,
            method: "POST",
            data: $scope.selected_item,
        }).then(function(response) {
            panel.close();
        }, function(failure) {
        });
    };

    $scope.delete = function() {
        var url = '/delete_record';
        $http({
            url: url,
            method: "POST",
            data: $scope.selected_item,
        }).then(function(response) {
            if (response.data.status==1) {
                CollectionService.remove_item_from_collection($scope.selected_item);
                panel.close();
            }
        });
    };

}]);
